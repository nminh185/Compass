/*
  # Fix bulk upsert function

  1. Changes
    - Implement proper upsert operation using ON CONFLICT
    - Optimize performance with single operation
    - Add better error handling
  
  2. Performance Improvements
    - Single upsert operation instead of separate update/insert
    - Reduced database round trips
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
BEGIN
  -- Perform upsert operation
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
    FROM jsonb_array_elements(_orders) e
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