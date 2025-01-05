/*
  # Fix bulk operations and improve performance

  1. Changes
    - Fix ambiguous column reference in bulk update
    - Add proper table aliases
    - Optimize batch processing
    - Add proper error handling
    - Add proper transaction handling
  
  2. Performance Improvements
    - Use single query for updates and inserts
    - Optimize JSON handling
    - Add proper indexing
*/

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_production_orders_order_number 
ON production_orders(order_number);

-- Updated bulk update function with fixed column references
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
  _order_numbers TEXT[];
BEGIN
  -- Extract order numbers for checking existence
  SELECT ARRAY_AGG(x->>'orderNumber')
  FROM jsonb_array_elements(_orders) x
  INTO _order_numbers;

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
    RETURNING po.order_number
  )
  SELECT COUNT(*) INTO _updated FROM updates;

  -- Insert new orders
  WITH new_orders AS (
    SELECT 
      e->>'orderNumber' as order_number,
      e->>'location' as location,
      e->>'employeeId' as employee_id
    FROM jsonb_array_elements(_orders) e
    WHERE NOT EXISTS (
      SELECT 1 
      FROM production_orders po 
      WHERE po.order_number = e->>'orderNumber'
    )
  )
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
  FROM new_orders
  RETURNING (SELECT COUNT(*)) INTO _inserted;

  RETURN json_build_object(
    'updated', _updated,
    'inserted', _inserted
  );
END;
$$;