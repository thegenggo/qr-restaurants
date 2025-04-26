import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Download
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { supabase } from '../../lib/supabase';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items ( id )
        `)

    if (error || !data) {
      console.error(error);
      return;
    }

    setOrders(data.map((item) => ({
      id: item.id,
      tableNumber: item.table_number,
      items: item.order_items.length,
      status: item.status as OrderStatus,
      totalPrice: item.total_price,
      createdAt: item.created_at ?? '',
      estimatedReadyTime: item.estimated_ready_time ?? '',
    })))
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-50 text-success-700';
      case 'preparing':
        return 'bg-warning-50 text-warning-700';
      case 'pending':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Orders</h1>
        <button className="btn btn-outline flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full input"
              />
            </div>
            <div className="flex gap-4">
              <button className="btn btn-outline flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
              <button className="btn btn-outline flex items-center">
                Status
                <ChevronDown className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Table</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Items</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Date</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-neutral-200 last:border-0">
                  <td className="px-6 py-4 font-medium text-neutral-800">{order.id}</td>
                  <td className="px-6 py-4 text-neutral-600">Table {order.tableNumber}</td>
                  <td className="px-6 py-4 text-neutral-600">{order.items} items</td>
                  <td className="px-6 py-4 font-medium">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {format(order.createdAt, 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="p-1 text-neutral-600 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">20</span> results
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-neutral-200 rounded text-sm text-neutral-600 hover:bg-neutral-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-neutral-200 rounded text-sm text-neutral-600 hover:bg-neutral-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;