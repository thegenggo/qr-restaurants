import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ClipboardCheck } from 'lucide-react';
import OrderStatusCard from '../components/OrderStatusCard';
import { Order, OrderStatus } from '../types';

const OrderStatusPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  // In a real app, this would fetch from an API
  // For demo purposes, we'll use the state passed from the cart page
  // or generate mock data if accessed directly
  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else if (orderId) {
      // Mock order data for direct access
      const mockOrder: Order = {
        id: orderId,
        tableId: 'T1',
        items: [
          {
            id: 'item1',
            menuItemId: '3',
            name: 'Grilled Salmon',
            price: 24.99,
            quantity: 1,
          },
          {
            id: 'item2',
            menuItemId: '6',
            name: 'Garlic Mashed Potatoes',
            price: 5.99,
            quantity: 1,
          }
        ],
        status: 'preparing' as OrderStatus,
        totalPrice: 30.98,
        createdAt: new Date().toISOString(),
        estimatedReadyTime: new Date(Date.now() + 10 * 60000).toISOString(), // 10 min from now
      };
      setOrder(mockOrder);
    }
  }, [orderId, location.state]);
  
  // Simulate order status updates for demonstration
  useEffect(() => {
    if (!order) return;
    
    const statusSequence: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
    
    // Don't update if already delivered or cancelled
    if (order.status === 'delivered' || order.status === 'cancelled') return;
    
    const currentIndex = statusSequence.indexOf(order.status);
    if (currentIndex < statusSequence.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = statusSequence[currentIndex + 1];
        setOrder(prevOrder => {
          if (!prevOrder) return null;
          return { ...prevOrder, status: nextStatus };
        });
      }, 30000); // Update every 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [order]);
  
  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="p-6 text-center">
          <p className="text-neutral-600 mb-4">Order not found</p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="text-neutral-600 hover:text-primary-600">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="ml-4 text-xl font-bold text-neutral-800">Order Status</h1>
          </div>
        </div>
      </div>
      
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
        <OrderStatusCard order={order} />
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="btn btn-outline flex-1 flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          
          {order.tableId && (
            <Link 
              to={`/menu/${order.tableId}`}
              className="btn btn-primary flex-1 flex items-center justify-center"
            >
              <ClipboardCheck className="h-5 w-5 mr-2" />
              Order More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;