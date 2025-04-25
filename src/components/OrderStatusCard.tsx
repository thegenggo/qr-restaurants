import React from 'react';
import { Order } from '../types';
import { Clock, Check, ChefHat, Bell } from 'lucide-react';

interface OrderStatusCardProps {
  order: Order;
}

const OrderStatusCard: React.FC<OrderStatusCardProps> = ({ order }) => {
  const statusConfigs = {
    pending: {
      icon: Clock,
      color: 'text-warning-500',
      bgColor: 'bg-warning-100',
      message: 'Your order has been received and is awaiting confirmation.',
    },
    confirmed: {
      icon: Check,
      color: 'text-primary-500',
      bgColor: 'bg-primary-100',
      message: 'Your order has been confirmed and will be prepared soon.',
    },
    preparing: {
      icon: ChefHat,
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-100',
      message: 'Your food is being prepared by our chefs.',
    },
    ready: {
      icon: Bell,
      color: 'text-success-500',
      bgColor: 'bg-success-100',
      message: 'Your order is ready! We\'ll bring it to your table shortly.',
    },
    delivered: {
      icon: Check,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      message: 'Your order has been delivered. Enjoy your meal!',
    },
    cancelled: {
      icon: X,
      color: 'text-error-600',
      bgColor: 'bg-error-100',
      message: 'Your order has been cancelled.',
    },
  };

  const statusConfig = statusConfigs[order.status];
  const StatusIcon = statusConfig.icon;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Order #{order.id.slice(-4)}</h2>
        <span className="text-sm text-neutral-500">
          {formatTime(order.createdAt)}
        </span>
      </div>

      <div className={`${statusConfig.bgColor} ${statusConfig.color} p-3 rounded-lg mb-4 flex items-center`}>
        <StatusIcon className="h-5 w-5 mr-2" />
        <span className="font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
      </div>

      <p className="text-neutral-600 mb-4">{statusConfig.message}</p>

      {order.estimatedReadyTime && order.status !== 'delivered' && order.status !== 'cancelled' && (
        <div className="mb-4">
          <p className="text-sm text-neutral-500">
            Estimated ready time: <span className="font-medium">{formatTime(order.estimatedReadyTime)}</span>
          </p>
        </div>
      )}

      <div className="border-t border-neutral-200 pt-4">
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-neutral-600">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// Add X component for cancelled status
const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

export default OrderStatusCard;