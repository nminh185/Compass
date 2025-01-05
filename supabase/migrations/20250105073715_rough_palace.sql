/*
  # Add bulk update stored procedure
  
  1. New Functions
    - bulk_update_orders: Efficiently updates multiple orders at once using CASE statements
    
  2. Parameters
    - _orders: JSONB array containing order updates
    - _user_id: UUID of the user performing the update
    
  3. Returns
    - JSON object with counts of updated and inserted records
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
  _order_numbers TEXT[];
  _to_insert JSONB[];
BEGIN
  -- Extract order numbers for checking existence
  SELECT ARRAY_AGG(x->>'orderNumber')
  FROM jsonb_array_elements(_orders) x
  INTO _order_numbers;

  -- Perform bulk update for existing orders
  WITH updates AS (
    UPDATE production_orders
    SET 
      location = CASE order_number 
        WHEN x.order_number THEN x.location
        ELSE location
      END,
      employee_id = CASE order_number
        WHEN x.order_number THEN x.employee_id
        ELSE employee_id
      END,
      timestamp = _timestamp
    FROM (
      SELECT 
        e->>'orderNumber' as order_number,
        e->>'location' as location,
        e->>'employeeId' as employee_id
      FROM jsonb_array_elements(_orders) e
    ) x
    WHERE production_orders.order_number = ANY(_order_numbers)
    RETURNING order_number
  )
  SELECT COUNT(*) INTO _updated FROM updates;

  -- Collect orders that need to be inserted
  WITH existing_orders AS (
    SELECT order_number 
    FROM production_orders 
    WHERE order_number = ANY(_order_numbers)
  )
  SELECT 
    jsonb_agg(
      jsonb_build_object(
        'order_number', e->>'orderNumber',
        'location', e->>'location',
        'employee_id', e->>'employeeId',
        'user_id', _user_id,
        'timestamp', _timestamp
      )
    )
  FROM jsonb_array_elements(_orders) e
  WHERE NOT EXISTS (
    SELECT 1 
    FROM existing_orders eo 
    WHERE eo.order_number = e->>'orderNumber'
  )
  INTO _to_insert;

  -- Perform bulk insert for new orders
  IF _to_insert IS NOT NULL AND jsonb_array_length(_to_insert) > 0 THEN
    WITH insertions AS (
      INSERT INTO production_orders (
        order_number,
        location,
        employee_id,
        user_id,
        timestamp
      )
      SELECT 
        x->>'order_number',
        x->>'location',
        x->>'employee_id',
        (x->>'user_id')::UUID,
        (x->>'timestamp')::TIMESTAMPTZ
      FROM jsonb_array_elements(_to_insert) x
      RETURNING 1
    )
    SELECT COUNT(*) INTO _inserted FROM insertions;
  END IF;

  RETURN json_build_object(
    'updated', _updated,
    'inserted', _inserted
  );
END;
$$;