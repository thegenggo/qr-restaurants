import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../contexts/useCart';
import { Order, OrderStatus, Table } from '../types';
import { supabase } from '../lib/supabase';

const CartPage = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [table, setTable] = useState<Table>();

  const fetchTable = async () => {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select('*')
      .eq('id', state.tableId ?? '')
      .single()

    if (error || !data) {
      console.error("Failed to fetch table data");
      throw error;
    }

    setTable({
      id: data.id,
      number: data.number,
      section: data.section,
      seats: data.seats,
      status: data.status,
    });
  }

  useEffect(() => {
    fetchTable();
  }, [table])

  const insertOrder = async (newOrder: Order) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          table_number: table?.number,
          status: newOrder.status,
          total_price: newOrder.totalPrice,
          created_at: newOrder.createdAt,
          estimated_ready_time: newOrder.estimatedReadyTime,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error.message);
      alert('Failed to place order. Please try again.');
      setIsProcessing(false);
      return;
    }

    return data;
  }

  const insertOrderItems = async (newOrder: Order) => {
    const { data, error } = await supabase
      .from('order_items')
      .insert(state.items.map((item) => ({
        menu_item_id: item.id,
        order_id: newOrder.id,
        price: item.price,
        quantity: item.quantity,
        special_instructions: item.specialInstructions
      })))
      .select()

    if (error) {
      console.error('Supabase Insert Error:', error.message);
      alert('Failed to place order. Please try again.');
      setIsProcessing(false);
      return;
    }

    return data;
  }

  const handlePlaceOrder = async () => {
    if (state.items.length === 0) return;

    setIsProcessing(true);

    const newOrder: Order = {
      tableNumber: table?.number,
      status: 'confirmed' as OrderStatus,
      totalPrice: state.totalPrice,
      createdAt: new Date().toISOString(),
      estimatedReadyTime: new Date(Date.now() + 20 * 60000).toISOString(), // 20 minutes from now
    };

    try {
      const order = await insertOrder(newOrder);
      newOrder.id = order?.id;
      await insertOrderItems(newOrder)

      clearCart();
      navigate(`/order/${newOrder.id}`, { state: { order: newOrder } });
    } catch (err) {
      console.error('Unexpected Error:', err);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
        {state.tableId && table && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-6 flex items-center">
            <div className="text-primary-700">
              <p className="font-medium">Table {table.number}</p>
              <p className="text-sm">{table.section} Section</p>
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
                  className={`w-full btn btn-primary py-3 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''
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

export default CartPage;