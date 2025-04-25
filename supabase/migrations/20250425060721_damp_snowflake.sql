/*
  # Add restaurant tables management

  1. New Table
    - `restaurant_tables`
      - `id` (uuid, primary key)
      - `number` (integer)
      - `section` (text)
      - `seats` (integer)
      - `status` (text)
      - `qr_code` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE restaurant_tables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer NOT NULL UNIQUE,
  section text NOT NULL,
  seats integer NOT NULL CHECK (seats > 0),
  status text NOT NULL DEFAULT 'available',
  qr_code text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE restaurant_tables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users" ON restaurant_tables
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE TRIGGER update_restaurant_tables_updated_at
  BEFORE UPDATE ON restaurant_tables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();