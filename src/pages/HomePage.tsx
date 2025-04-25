import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, UtensilsCrossed, Clock, ShoppingBag } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 animate-fade-in">
                Order Delicious Food Directly From Your Table
              </h1>
              <p className="text-lg text-primary-100 mb-8 animate-fade-in">
                Scan the QR code at your table, browse the menu, and place your order. No waiting, no hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Link to="/scan" className="btn bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 font-semibold rounded-lg flex items-center justify-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  Scan QR Code
                </Link>
                <a href="#how-it-works" className="btn btn-outline bg-transparent border-white text-white hover:bg-white/10 px-6 py-3 font-semibold rounded-lg flex items-center justify-center">
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center animate-fade-in">
              <img 
                src="https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg" 
                alt="Person scanning QR code at restaurant table" 
                className="rounded-xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">How It Works</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Order your food in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card p-6 flex flex-col items-center text-center animate-fade-in">
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <QrCode className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan QR Code</h3>
              <p className="text-neutral-600">
                Use your phone to scan the QR code placed on your table
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="card p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-16 w-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <UtensilsCrossed className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Order</h3>
              <p className="text-neutral-600">
                Browse the digital menu and add items to your cart
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="card p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="h-16 w-16 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Wait & Enjoy</h3>
              <p className="text-neutral-600">
                Track your order status and enjoy your meal when it arrives
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/scan" className="btn btn-primary px-6 py-3 text-lg font-semibold animate-fade-in">
              Start Ordering Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Featured Menu Items</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Discover our most popular dishes
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Item 1 */}
            <div className="food-card animate-fade-in">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" 
                  alt="Signature Burger" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Signature Burger</h3>
                <p className="text-neutral-600 text-sm mt-1">Premium beef patty, cheddar cheese, caramelized onions, and special sauce.</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-600">$14.99</span>
                  <Link to="/scan" className="btn btn-primary py-1 px-3">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Featured Item 2 */}
            <div className="food-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg" 
                  alt="Mediterranean Salad" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                    Vegetarian
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Mediterranean Salad</h3>
                <p className="text-neutral-600 text-sm mt-1">Fresh greens, feta cheese, olives, tomatoes, and balsamic vinaigrette.</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-600">$12.99</span>
                  <Link to="/scan" className="btn btn-primary py-1 px-3">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Featured Item 3 */}
            <div className="food-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg" 
                  alt="Chocolate Lava Cake" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">Chocolate Lava Cake</h3>
                <p className="text-neutral-600 text-sm mt-1">Warm chocolate cake with a molten center, served with vanilla ice cream.</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-600">$8.99</span>
                  <Link to="/scan" className="btn btn-primary py-1 px-3">
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to Order?</h2>
          <p className="text-xl mb-8 animate-fade-in">
            Scan the QR code at your table and enjoy a seamless dining experience
          </p>
          <Link 
            to="/scan" 
            className="btn bg-white text-secondary-600 hover:bg-secondary-50 px-8 py-3 text-lg font-semibold rounded-lg inline-flex items-center animate-fade-in"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;