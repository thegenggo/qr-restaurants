import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../contexts/CartContext';
import { getTableById } from '../data/tablesData';
import { Order, OrderStatus } from '../types';

const CartPage = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const tableInfo = state.tableId ? getTableById(state.tableId) : null;
  
  const handlePlaceOrder = () => {
    if (state.items.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Create order object
      const newOrder: Order = {
        id: `ORD${Math.floor(Math.random() * 10000)}`,
        tableId: state.tableId || 'unknown',
        items: state.items.map(item => ({
          id: `ITEM${Math.floor(Math.random() * 10000)}`,
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions,
        })),
        status: 'confirmed' as OrderStatus,
        totalPrice: state.totalPrice,
        createdAt: new Date().toISOString(),
        estimatedReadyTime: new Date(Date.now() + 20 * 60000).toISOString(), // 20 minutes from now
      };
      
      // In a real app, this would be saved to a database
      // For now, we'll just redirect to the order status page
      setIsProcessing(false);
      clearCart();
      navigate(`/order/${newOrder.id}`, { state: { order: newOrder } });
    }, 2000);
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 pb-16">
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to={state.tableId ? `/menu/${state.tableId}` : '/'} className="text-neutral-600 hover:text-primary-600">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="ml-4 text-xl font-bold text-neutral-800">Your Cart</h1>
            </div>
            
            {state.items.length > 0 && (
              <button 
                onClick={() => clearCart()}
                className="text-neutral-600 hover:text-error-600 flex items-center text-sm"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {state.tableId && tableInfo && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-6 flex items-center">
            <div className="text-primary-700">
              <p className="font-medium">Table {tableInfo.number}</p>
              <p className="text-sm">{tableInfo.section} Section</p>
            </div>
          </div>
        )}
        
        {state.items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <CartItem 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                    specialInstructions={item.specialInstructions}
                  />
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-5 sticky top-32">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(state.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Service Fee</span>
                    <span className="font-medium">{formatPrice(state.totalPrice * 0.10)}</span>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-3 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(state.totalPrice + (state.totalPrice * 0.10))}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || state.items.length === 0}
                  className={`w-full btn btn-primary py-3 ${
                    isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>
                
                <p className="text-xs text-neutral-500 text-center mt-3">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-neutral-100 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-neutral-400" />
              </div>
            </div>
            <h2 className="text-xl font-bold mt-4 mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to={state.tableId ? `/menu/${state.tableId}` : '/scan'} className="btn btn-primary px-6">
              {state.tableId ? 'Back to Menu' : 'Scan Table QR Code'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component for ShoppingCart
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
    <path d="M3 6h18"></path>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export default CartPage;