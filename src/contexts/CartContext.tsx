import { createContext, useReducer, ReactNode } from 'react';
import { MenuItem } from '../types';

interface CartItem extends MenuItem {
  quantity: number;
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  tableId: string | null;
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_INSTRUCTIONS'; payload: { id: string; specialInstructions: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_TABLE'; payload: { tableId: string } };

interface CartContextType {
  state: CartState;
  addItem: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateInstructions: (id: string, specialInstructions: string) => void;
  clearCart: () => void;
  setTable: (tableId: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

const initialState: CartState = {
  items: [],
  tableId: null,
  totalItems: 0,
  totalPrice: 0,
};

function calculateTotals(items: CartItem[]): { totalItems: number; totalPrice: number } {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = [...state.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + action.payload.quantity,
          specialInstructions: action.payload.specialInstructions || newItems[existingItemIndex].specialInstructions,
        };
      } else {
        // New item
        newItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        ...calculateTotals(newItems),
      };
    }

    case 'UPDATE_INSTRUCTIONS': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, specialInstructions: action.payload.specialInstructions }
          : item
      );
      return {
        ...state,
        items: newItems,
      };
    }

    case 'CLEAR_CART':
      return {
        ...initialState,
        tableId: state.tableId,
      };

    case 'SET_TABLE':
      return {
        ...state,
        tableId: action.payload.tableId,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: MenuItem, quantity: number, specialInstructions?: string) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity, specialInstructions },
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateInstructions = (id: string, specialInstructions: string) => {
    dispatch({ type: 'UPDATE_INSTRUCTIONS', payload: { id, specialInstructions } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setTable = (tableId: string) => {
    dispatch({ type: 'SET_TABLE', payload: { tableId } });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        updateInstructions,
        clearCart,
        setTable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}