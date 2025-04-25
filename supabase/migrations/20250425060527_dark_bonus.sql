/*
  # Initial schema setup for QR Food Ordering System

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `available` (boolean)
      - `tags` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `orders`
      - `id` (uuid, primary key)
      - `table_id` (text)
      - `status` (text)
      - `total_price` (numeric)
      - `created_at` (timestamp)
      - `estimated_ready_time` (timestamp)

    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `menu_item_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (numeric)
      - `special_instructions` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  image_url text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  available boolean DEFAULT true,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  total_price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  estimated_ready_time timestamptz
);

-- Create order_items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE SET NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric NOT NULL CHECK (price >= 0),
  special_instructions text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow full access to authenticated users" ON categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access to authenticated users" ON menu_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access to authenticated users" ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow full access to authenticated users" ON order_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();