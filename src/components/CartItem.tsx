import React, { useState } from 'react';
import { Trash2, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/useCart';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
}

const CartItem: React.FC<CartItemProps> = ({ 
  id, 
  name, 
  price, 
  quantity, 
  image, 
  specialInstructions 
}) => {
  const { removeItem, updateQuantity, updateInstructions } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [newInstructions, setNewInstructions] = useState(specialInstructions || '');

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(id);
  };

  const handleSaveInstructions = () => {
    updateInstructions(id, newInstructions);
    setIsEditing(false);
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      <div className="p-4 flex gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between">
            <h3 className="font-medium text-neutral-800">{name}</h3>
            <p className="font-semibold text-primary-600">{formatPrice(price * quantity)}</p>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center border border-neutral-300 rounded">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                disabled={quantity <= 1}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 border-x border-neutral-300 font-medium">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 text-neutral-600 hover:bg-neutral-100"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 rounded"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button 
                onClick={handleRemove}
                className="p-1 text-neutral-600 hover:text-error-600 hover:bg-neutral-100 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {specialInstructions && !isEditing && (
            <div className="mt-2 text-sm text-neutral-600">
              <span className="font-medium">Instructions:</span> {specialInstructions}
            </div>
          )}
          
          {isEditing && (
            <div className="mt-2">
              <textarea
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                className="w-full p-2 text-sm border border-neutral-300 rounded resize-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Special instructions..."
                rows={2}
              />
              <div className="mt-1 flex justify-end">
                <button
                  onClick={handleSaveInstructions}
                  className="text-sm bg-primary-500 text-white px-3 py-1 rounded hover:bg-primary-600"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;