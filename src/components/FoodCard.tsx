import React, { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../contexts/CartContext';

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const { addItem } = useCart();

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(item, quantity, specialInstructions);
    setIsModalOpen(false);
    setQuantity(1);
    setSpecialInstructions('');
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      <div className="food-card group">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.tags.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {item.tags.includes('vegetarian') && (
                <span className="bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                  Vegetarian
                </span>
              )}
              {item.tags.includes('vegan') && (
                <span className="bg-success-600 text-white text-xs px-2 py-1 rounded-full">
                  Vegan
                </span>
              )}
              {item.tags.includes('spicy') && (
                <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">
                  Spicy
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-neutral-600 text-sm mt-1 line-clamp-2">{item.description}</p>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="text-lg font-bold text-primary-600">{formatPrice(item.price)}</span>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="btn btn-primary py-1 px-3"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative h-56">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover rounded-t-lg"
              />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-neutral-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-5">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-neutral-600 mt-2">{item.description}</p>
              
              <div className="mt-4">
                <p className="text-xl font-bold text-primary-600">{formatPrice(item.price)}</p>
              </div>
              
              <div className="mt-4">
                <label htmlFor="special-instructions" className="block text-sm font-medium text-neutral-700 mb-1">
                  Special Instructions (optional)
                </label>
                <textarea
                  id="special-instructions"
                  rows={3}
                  className="input resize-none"
                  placeholder="E.g., No onions, extra sauce, etc."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                />
              </div>
              
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center border border-neutral-300 rounded-md">
                  <button 
                    onClick={handleDecrement}
                    className="px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-1 border-x border-neutral-300">{quantity}</span>
                  <button 
                    onClick={handleIncrement}
                    className="px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                >
                  Add to cart - {formatPrice(item.price * quantity)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Add X import
const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

export default FoodCard;