import React, { useState } from 'react';
import { Category, MenuItem } from '../types';
import FoodCard from './FoodCard';

interface CategoryMenuProps {
  categories: Category[];
  menuItems: MenuItem[];
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories, menuItems }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');

  const getItemsByCategory = (categoryId: string) => {
    return menuItems.filter(item => item.category === categoryId && item.available);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Scroll to the category section
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Category navigation */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.id);
          
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category.id} id={`category-${category.id}`} className="scroll-mt-20">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-neutral-800">{category.name}</h2>
                <p className="text-neutral-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryItems.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;