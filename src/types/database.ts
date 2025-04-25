export interface Category {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string;
  available: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  table_id: string;
  status: string;
  total_price: number;
  created_at: string;
  estimated_ready_time: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  special_instructions: string | null;
  created_at: string;
}

export interface RestaurantTable {
  id: string;
  number: number;
  section: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  qr_code: string | null;
  created_at: string;
  updated_at: string;
}