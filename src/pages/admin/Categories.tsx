import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2,
  GripVertical
} from 'lucide-react';
import { categories } from '../../data/menuData';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Categories</h1>
        <button className="btn btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full input"
            />
          </div>
        </div>

        <div className="divide-y divide-neutral-200">
          {categories.map((category, index) => (
            <div key={category.id} className="p-4 flex items-center">
              <div className="flex items-center flex-1">
                <button className="p-2 hover:bg-neutral-50 rounded cursor-move">
                  <GripVertical className="h-5 w-5 text-neutral-400" />
                </button>
                <div className="ml-2">
                  <h3 className="font-medium text-neutral-800">{category.name}</h3>
                  <p className="text-sm text-neutral-600">{category.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-neutral-600 hover:text-primary-600">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-1 text-neutral-600 hover:text-error-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;