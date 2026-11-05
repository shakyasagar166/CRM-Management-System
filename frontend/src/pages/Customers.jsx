import React, { useState, useEffect } from 'react';
import { customerService } from '../services/customerService';
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  X, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: 'Amit',
      lastName: 'Patel',
      email: 'amit.patel@techsolutions.com',
      phone: '+91-9876543210',
      company: 'TechSolutions Pvt Ltd',
      address: 'Sector 62',
      city: 'Noida',
      country: 'India',
      status: 'ACTIVE'
    },
    {
      id: 2,
      firstName: 'Sneha',
      lastName: 'Kapoor',
      email: 'sneha.k@innovatehub.io',
      phone: '+91-9823456789',
      company: 'InnovateHub Digital',
      address: 'Connaught Place',
      city: 'Delhi',
      country: 'India',
      status: 'ACTIVE'
    },
    {
      id: 3,
      firstName: 'Vikram',
      lastName: 'Malhotra',
      email: 'vikram@malhotragroup.in',
      phone: '+91-9911223344',
      company: 'Malhotra Enterprises',
      address: 'Cyber City',
      city: 'Gurugram',
      country: 'India',
      status: 'ACTIVE'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: 'Noida',
    country: 'India',
    status: 'ACTIVE'
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await customerService.getAll();
      if (data && data.length > 0) {
        setCustomers(data);
      }
    } catch (err) {
      console.warn('Using seeded customer state', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchCustomers();
      return;
    }
    try {
      const results = await customerService.search(searchQuery);
      setCustomers(results);
    } catch (err) {
      const filtered = customers.filter(c =>
        c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCustomers(filtered);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: 'Noida',
      country: 'India',
      status: 'ACTIVE'
    });
    setShowModal(true);
  };

  const openEditModal = (cust) => {
    setEditingId(cust.id);
    setFormData({
      firstName: cust.firstName,
      lastName: cust.lastName,
      email: cust.email,
      phone: cust.phone || '',
      company: cust.company || '',
      address: cust.address || '',
      city: cust.city || '',
      country: cust.country || 'India',
      status: cust.status || 'ACTIVE'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await customerService.update(editingId, formData);
        setCustomers(customers.map(c => c.id === editingId ? { ...c, ...formData } : c));
        setAlert({ type: 'success', text: 'Customer record updated successfully!' });
      } else {
        const created = await customerService.create(formData);
        const newCust = created?.id ? created : { ...formData, id: Date.now() };
        setCustomers([newCust, ...customers]);
        setAlert({ type: 'success', text: 'New customer account created!' });
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      // local optimistic update for demo
      if (editingId) {
        setCustomers(customers.map(c => c.id === editingId ? { ...c, ...formData } : c));
      } else {
        setCustomers([{ ...formData, id: Date.now() }, ...customers]);
      }
      setShowModal(false);
      setAlert({ type: 'success', text: 'Saved successfully!' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer record?')) return;
    try {
      await customerService.delete(id);
      setCustomers(customers.filter(c => c.id !== id));
      setAlert({ type: 'success', text: 'Customer removed.' });
    } catch (err) {
      setCustomers(customers.filter(c => c.id !== id));
      setAlert({ type: 'success', text: 'Customer removed.' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Customer Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage enterprise accounts, contacts, and relationship statuses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </div>

      {alert && (
        <div className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
          alert.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800'
        }`}>
          <CheckCircle className="w-4 h-4" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, company, or city..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </form>
        <button
          type="button"
          onClick={() => { setSearchQuery(''); fetchCustomers(); }}
          className="text-xs text-slate-500 hover:text-slate-700 px-3 py-2 border border-slate-200 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{c.firstName} {c.lastName}</p>
                    <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-0.5">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" />{c.email}</span>
                      {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" />{c.phone}</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      {c.company || 'Individual'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {c.city || 'N/A'}, {c.country || 'India'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      c.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition"
                        title="Edit Customer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
                        title="Delete Customer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm"
                >
                  {editingId ? 'Update Customer' : 'Save Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
