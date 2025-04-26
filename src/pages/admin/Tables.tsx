import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2,
  QrCode,
  Save,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Table } from '../../types';
import QRCode from 'react-qr-code';

const Tables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({
    number: '',
    section: '',
    seats: '',
    status: 'available'
  });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const { data, error } = await supabase
      .from('restaurant_tables')
      .select('*')
      .order('number');

    if (error) {
      console.error('Error fetching tables:', error);
      return;
    }

    setTables(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tableData = {
      number: parseInt(formData.number),
      section: formData.section,
      seats: parseInt(formData.seats),
      status: formData.status,
      qr_code: `T${formData.number}`
    };

    if (selectedTable) {
      const { error } = await supabase
        .from('restaurant_tables')
        .update(tableData)
        .eq('id', selectedTable.id);

      if (error) {
        console.error('Error updating table:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('restaurant_tables')
        .insert([tableData]);

      if (error) {
        console.error('Error creating table:', error);
        return;
      }
    }

    setIsModalOpen(false);
    setSelectedTable(null);
    setFormData({ number: '', section: '', seats: '', status: 'available' });
    fetchTables();
  };

  const handleEdit = (table: Table) => {
    setSelectedTable(table);
    setFormData({
      number: table.number.toString(),
      section: table.section,
      seats: table.seats.toString(),
      status: table.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTable) return;

    const { error } = await supabase
      .from('restaurant_tables')
      .delete()
      .eq('id', selectedTable.id);

    if (error) {
      console.error('Error deleting table:', error);
      return;
    }

    setIsDeleteModalOpen(false);
    setSelectedTable(null);
    fetchTables();
  };

  const filteredTables = tables.filter(table => 
    table.number.toString().includes(searchTerm) ||
    table.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Tables</h1>
        <button 
          onClick={() => {
            setSelectedTable(null);
            setFormData({ number: '', section: '', seats: '', status: 'available' });
            setIsModalOpen(true);
          }}
          className="btn btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Table
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search tables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full input"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200">
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Table Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Section</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Seats</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">Status</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTables.map((table) => (
                <tr key={table.id} className="border-b border-neutral-200 last:border-0">
                  <td className="px-6 py-4 font-medium text-neutral-800">
                    Table {table.number}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{table.section}</td>
                  <td className="px-6 py-4 text-neutral-600">{table.seats} seats</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      table.status === 'available' ? 'bg-success-50 text-success-700' :
                      table.status === 'occupied' ? 'bg-error-50 text-error-700' :
                      table.status === 'reserved' ? 'bg-warning-50 text-warning-700' :
                      'bg-neutral-50 text-neutral-700'
                    }`}>
                      {table.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(table)}
                        className="p-1 text-neutral-600 hover:text-primary-600"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedTable(table);
                          setIsDeleteModalOpen(true);
                        }}
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
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-800">
                  {selectedTable ? 'Edit Table' : 'Add New Table'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-neutral-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Table Number
                </label>
                <input
                  type="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="input"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Number of Seats
                </label>
                <input
                  type="number"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                  className="input"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="reserved">Reserved</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              {selectedTable && (
                <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">Table QR Code</span>
                    <QrCode className="h-5 w-5 text-neutral-500" />
                  </div>
                  <div className="flex justify-center bg-white p-4 rounded-lg">
                    <QRCode value={selectedTable.id} size={128} />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
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
                  {selectedTable ? 'Save Changes' : 'Add Table'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-4">Delete Table</h2>
              <p className="text-neutral-600">
                Are you sure you want to delete Table {selectedTable.number}? This action cannot be undone.
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
                onClick={handleDelete}
                className="btn bg-error-500 text-white hover:bg-error-600"
              >
                Delete Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;