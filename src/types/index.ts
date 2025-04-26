export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
  categoryId?: string;
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
  status: string;
}

export interface Order {
  id?: string;
  tableNumber?: number;
  items?: number;
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  estimatedReadyTime?: string;

  table?: Partial<Table>;
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