import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import HomePage from './pages/HomePage';
import ScanPage from './pages/ScanPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderStatusPage from './pages/OrderStatusPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import MenuItems from './pages/admin/MenuItems';
import Orders from './pages/admin/Orders';
import Categories from './pages/admin/Categories';
import Tables from './pages/admin/Tables';

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="scan" element={<ScanPage />} />
          <Route path="menu/:tableId" element={<MenuPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order/:orderId" element={<OrderStatusPage />} />
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="menu-items" element={<MenuItems />} />
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tables" element={<Tables />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;