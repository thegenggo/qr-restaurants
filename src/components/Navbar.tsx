import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, QrCode, Utensils } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { state } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Utensils className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-neutral-800">QRDine</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/scan"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/scan' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span className="flex items-center">
                <QrCode className="h-4 w-4 mr-1" />
                Scan QR
              </span>
            </Link>
            
            {/* Cart button with item count */}
            <Link
              to="/cart"
              className="relative px-3 py-2 rounded-md text-sm font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
            >
              <span className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Cart
              </span>
              {state.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {state.totalItems > 0 && (
              <Link
                to="/cart"
                className="relative px-3 py-2 mr-2 text-neutral-600"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              </Link>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/scan"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/scan' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
            onClick={closeMenu}
          >
            <span className="flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Scan QR Code
            </span>
          </Link>
          <Link
            to="/cart"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/cart' 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
            }`}
            onClick={closeMenu}
          >
            <span className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart {state.totalItems > 0 && `(${state.totalItems})`}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;