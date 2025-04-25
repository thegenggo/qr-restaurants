import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Image as ImageIcon,
  Save
} from 'lucide-react';
import { MenuItem } from '../../types';
import { supabase } from '../../lib/supabase';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    tags: [],
    available: true,
  });

  useEffect(() => {
    fetchMenus();
  }, [])

  const fetchMenus = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('number');

    if (error) {
      console.error('Error fetching tables:', error);
      return;
    }

    setMenuItems(data || []);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const handleDelete = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const menuData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      tags: formData.tags,
      available: formData.available,
    }

    if (selectedItem) {
      const { error } = await supabase
        .from('menu_items')
        .update(menuData)
        .eq('id', selectedItem.id);

      if (error) {
        console.error('Error updating table:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('menu_items')
        .insert([menuData]);

      if (error) {
        console.error('Error creating table:', error);
        return;
      }
    }

    setIsModalOpen(false);
    setSelectedItem(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      tags: [],
      available: true,
    });
    fetchMenus();
  };

  const handleConfirmDelete = () => {
    if (!selectedItem) return;

    setMenuItems(prevItems =>
      prevItems.filter(item => item.id !== selectedItem.id)
    );
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Menu Items</h1>
        <button className="btn btn-primary flex items-center" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add New Item
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full input"
              />
            </div>
            <button className="btn btn-outline flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-3 text-left">
                  <button
                    className="flex items-center text-sm font-medium text-neutral-600"
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">
                  <button
                    className="flex items-center text-sm font-medium text-neutral-600"
                    onClick={() => handleSort('price')}
                  >
                    Price {getSortIcon('price')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-neutral-200 last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-neutral-800">{item.name}</p>
                        <p className="text-sm text-neutral-600 truncate max-w-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.available
                      ? 'bg-success-50 text-success-700'
                      : 'bg-neutral-100 text-neutral-700'
                      }`}>
                      {item.available ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Available
                        </>
                      ) : (
                        'Unavailable'
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1 text-neutral-600 hover:text-primary-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-1 text-neutral-600 hover:text-error-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-800">Edit Menu Item</h2>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        step="0.01"
                        min="0"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="input"
                      >
                        <option value="starters">Starters</option>
                        <option value="main-courses">Main Courses</option>
                        <option value="sides">Sides</option>
                        <option value="desserts">Desserts</option>
                        <option value="drinks">Drinks</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Image URL
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="input flex-1"
                      />
                      <div className="h-10 w-10 rounded bg-neutral-100 flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-neutral-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="available"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="h-4 w-4 text-primary-600 rounded border-neutral-300"
                    />
                    <label htmlFor="available" className="ml-2 text-sm text-neutral-700">
                      Item is available
                    </label>
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
                  {selectedItem ? 'Save Changes' : 'Add Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Delete Menu Item</h2>
              <p className="text-neutral-600">
                Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.
              </p>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
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

export default MenuItems;