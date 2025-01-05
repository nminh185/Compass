/*
  # Production Orders Schema

  1. New Tables
    - `production_orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique)
      - `location` (text)
      - `employee_id` (text) 
      - `timestamp` (timestamptz)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Read own orders
      - Insert own orders
      - Delete own orders
*/

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS production_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  location text NOT NULL,
  employee_id text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

-- Enable RLS
ALTER TABLE production_orders ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ 
BEGIN
  -- Check and create select policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'production_orders' 
    AND policyname = 'Users can read own orders'
  ) THEN
    CREATE POLICY "Users can read own orders"
      ON production_orders
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  -- Check and create insert policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'production_orders' 
    AND policyname = 'Users can insert own orders'
  ) THEN
    CREATE POLICY "Users can insert own orders"
      ON production_orders
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Check and create delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'production_orders' 
    AND policyname = 'Users can delete own orders'
  ) THEN
    CREATE POLICY "Users can delete own orders"
      ON production_orders
      FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;