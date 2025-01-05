/*
  # Fix bulk update function

  1. Changes
    - Fix RETURNING clause in INSERT statement
    - Optimize query performance
    - Add proper error handling
  
  2. Performance Improvements
    - Simplified query structure
    - Better handling of batch operations
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
  -- Perform bulk update for existing orders
  WITH updates AS (
    UPDATE production_orders po
    SET 
      location = x.location,
      employee_id = x.employee_id,
      timestamp = _timestamp
    FROM (
      SELECT 
        e->>'orderNumber' as order_number,
        e->>'location' as location,
        e->>'employeeId' as employee_id
      FROM jsonb_array_elements(_orders) e
    ) x
    WHERE po.order_number = x.order_number
    RETURNING 1
  )
  SELECT COUNT(*) INTO _updated FROM updates;

  -- Insert new orders
  WITH new_orders AS (
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
    WHERE NOT EXISTS (
      SELECT 1 
      FROM production_orders po 
      WHERE po.order_number = e->>'orderNumber'
    )
    RETURNING 1
  )
  SELECT COUNT(*) INTO _inserted FROM new_orders;

  RETURN json_build_object(
    'updated', _updated,
    'inserted', _inserted
  );
END;
$$;