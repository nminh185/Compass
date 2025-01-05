/*
  # Update Admin Delete Policy

  1. Changes
    - Modify delete policy to check user metadata for admin role
    - Remove dependency on users table role column
*/

-- Drop existing delete policy
DROP POLICY IF EXISTS "Only admins can delete orders" ON production_orders;

-- Create new policy using user metadata
CREATE POLICY "Only admins can delete orders"
  ON production_orders
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'role' = 'admin'
  );