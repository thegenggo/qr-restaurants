import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ClipboardList, 
  ListOrdered,
  Grid,
  LogOut 
} from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { to: '/admin/menu-items', icon: UtensilsCrossed, label: 'Menu Items' },
    { to: '/admin/categories', icon: ClipboardList, label: 'Categories' },
    { to: '/admin/tables', icon: Grid, label: 'Tables' },
    { to: '/admin/orders', icon: ListOrdered, label: 'Orders' },
  ];

  return (
    <div className="w-64 bg-white border-r border-neutral-200 flex flex-col">
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center">
          <UtensilsCrossed className="h-8 w-8 text-primary-500" />
          <span className="ml-2 text-xl font-bold text-neutral-800">QRDine</span>
        </div>
        <div className="mt-1 text-sm text-neutral-600">Admin Dashboard</div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary-600'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-200">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 rounded-lg transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;