import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  GripVertical,
  X,
  Save
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Category } from '../../types';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    description: '',
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [categories])

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at')

    if (error) {
      console.error('Error fetching tables:', error);
      return;
    }

    setCategories(data || []);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData = {
      name: formData.name,
      description: formData.description,
    }
    console.log("selected category: ", selectedCategory);
    if (selectedCategory) {
      const { error } = await supabase
        .from('categories')
        .update(categoryData)
        .eq('id', selectedCategory.id);

      if (error) {
        console.error('Error updating table:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('categories')
        .insert([categoryData]);

      if (error) {
        console.error('Error creating table:', error);
        return;
      }
    }

    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      description: '',
    });
    await fetchCategories();
  }

  const handleDelete = (item: Category) => {
    setSelectedCategory(item);
    setIsDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', selectedCategory.id);

    if (error) {
      console.error('Delete error:', error.message);
    } else {
      console.log('Deleted:', data);
    }
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
    await fetchCategories();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Categories</h1>
        <button className="btn btn-primary flex items-center" onClick={() => setIsModalOpen(true)}>
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
          {categories.map((category) => (
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
                <button
                  onClick={() => handleDelete(category)}
                  className="p-1 text-neutral-600 hover:text-error-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-800">Add Category</h2>
                <button
                  onClick={() => setIsModalOpen(false)}

                  className="p-2 hover:bg-neutral-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-neutral-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="input resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-neutral-200 flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center"
                >
                  <Save className="h-5 w-5 mr-2" />
                  {selectedCategory ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Delete Menu Item</h2>
              <p className="text-neutral-600">
                Are you sure you want to delete "{selectedCategory.name}"? This action cannot be undone.
              </p>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedCategory(null);
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="btn bg-error-500 text-white hover:bg-error-600"
              >
                Delete Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;