/*
  # Update Admin Policy to use correct metadata path

  1. Changes
    - Update delete policy to check user_metadata for admin role
    - Fix the JWT path to correctly access custom role
*/

-- Drop existing delete policy
DROP POLICY IF EXISTS "Only admins can delete orders" ON production_orders;

-- Create new policy using correct metadata path
CREATE POLICY "Only admins can delete orders"
  ON production_orders
  FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );