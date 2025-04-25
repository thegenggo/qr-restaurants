export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Table {
  id: string;
  number: number;
  section: string;
  seats: number;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  estimatedReadyTime?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';