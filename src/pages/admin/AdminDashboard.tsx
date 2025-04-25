import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingBag,
    },
    {
      title: 'Total Revenue',
      value: '$4,320.50',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Active Tables',
      value: '24',
      change: '-2.4%',
      trend: 'down',
      icon: Users,
    },
    {
      title: 'Avg. Order Value',
      value: '$27.65',
      change: '+5.1%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl border border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-success-600' : 'text-error-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span className="ml-1 text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-neutral-600">{stat.title}</h3>
              <p className="text-2xl font-bold text-neutral-800 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div>
                  <p className="font-medium text-neutral-800">Order #{String(order).padStart(4, '0')}</p>
                  <p className="text-sm text-neutral-600">Table 5 • 2 items</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-neutral-800">$45.80</p>
                  <p className="text-sm text-success-600">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Popular Items</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded bg-neutral-100"></div>
                  <div className="ml-3">
                    <p className="font-medium text-neutral-800">Grilled Salmon</p>
                    <p className="text-sm text-neutral-600">24 orders</p>
                  </div>
                </div>
                <p className="font-medium text-neutral-800">$24.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;