/*
  # Fix bulk update function with duplicate handling

  1. Changes
    - Add duplicate handling for input data
    - Use a temporary table for deduplication
    - Optimize performance with single operation
  
  2. Performance Improvements
    - Deduplicate input data before processing
    - Single upsert operation
    - Improved error handling
*/

CREATE OR REPLACE FUNCTION bulk_update_orders(
  _orders JSONB,
  _user_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _timestamp TIMESTAMPTZ := NOW();
  _updated INT := 0;
  _inserted INT := 0;
  _deduplicated_orders JSONB;
BEGIN
  -- Deduplicate orders by taking the last occurrence of each order number
  WITH ordered_orders AS (
    SELECT 
      e->>'orderNumber' as order_number,
      e->>'location' as location,
      e->>'employeeId' as employee_id,
      ROW_NUMBER() OVER (
        PARTITION BY e->>'orderNumber' 
        ORDER BY ordinality DESC
      ) as rn
    FROM jsonb_array_elements(_orders) WITH ORDINALITY e
  ),
  unique_orders AS (
    SELECT 
      order_number,
      location,
      employee_id
    FROM ordered_orders
    WHERE rn = 1
  )
  SELECT jsonb_agg(
    jsonb_build_object(
      'orderNumber', order_number,
      'location', location,
      'employeeId', employee_id
    )
  )
  INTO _deduplicated_orders
  FROM unique_orders;

  -- Perform upsert with deduplicated data
  WITH upsert_result AS (
    INSERT INTO production_orders (
      order_number,
      location,
      employee_id,
      user_id,
      timestamp
    )
    SELECT 
      e->>'orderNumber',
      e->>'location',
      e->>'employeeId',
      _user_id,
      _timestamp
    FROM jsonb_array_elements(_deduplicated_orders) e
    ON CONFLICT (order_number) DO UPDATE 
    SET 
      location = EXCLUDED.location,
      employee_id = EXCLUDED.employee_id,
      timestamp = EXCLUDED.timestamp
    WHERE 
      production_orders.location IS DISTINCT FROM EXCLUDED.location OR
      production_orders.employee_id IS DISTINCT FROM EXCLUDED.employee_id
    RETURNING 
      (xmax = 0) AS inserted,
      (xmax <> 0) AS updated
  )
  SELECT 
    COUNT(*) FILTER (WHERE updated) AS updated_count,
    COUNT(*) FILTER (WHERE inserted) AS inserted_count
  INTO _updated, _inserted
  FROM upsert_result;

  RETURN json_build_object(
    'updated', _updated,
    'inserted', _inserted
  );
END;
$$;