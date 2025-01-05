/*
  # Fix bulk update function JSON handling

  1. Changes
    - Fix JSON data extraction
    - Improve ordinality handling
    - Add better error handling
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
  -- Perform upsert with built-in deduplication
  WITH deduplicated AS (
    SELECT DISTINCT ON (data->>'orderNumber')
      data->>'orderNumber' as order_number,
      data->>'location' as location,
      data->>'employeeId' as employee_id,
      ROW_NUMBER() OVER (ORDER BY data.ordinality DESC) as rn
    FROM jsonb_array_elements(_orders) WITH ORDINALITY as data
    ORDER BY data->>'orderNumber', rn
  ),
  upsert_result AS (
    INSERT INTO production_orders (
      order_number,
      location,
      employee_id,
      user_id,
      timestamp
    )
    SELECT 
      order_number,
      location,
      employee_id,
      _user_id,
      _timestamp
    FROM deduplicated
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
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Bulk update failed: %', SQLERRM;
END;
$$;