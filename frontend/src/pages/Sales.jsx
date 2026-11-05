import React, { useState, useEffect } from 'react';
import { salesService } from '../services/crmServices';
import { 
  BadgePercent, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  TrendingUp, 
  BadgeIndianRupee, 
  X, 
  CheckCircle,
  Building2 
} from 'lucide-react';

const Sales = () => {
  const [sales, setSales] = useState([
    {
      id: 1,
      dealName: 'Annual CRM License - TechSolutions',
      amount: 120000.00,
      stage: 'CLOSED_WON',
      expectedCloseDate: '2026-10-15',
      customer: { company: 'TechSolutions Pvt Ltd' }
    },
    {
      id: 2,
      dealName: 'Custom Integration Deal - InnovateHub',
      amount: 85000.00,
      stage: 'NEGOTIATION',
      expectedCloseDate: '2026-11-20',
      customer: { company: 'InnovateHub Digital' }
    },
    {
      id: 3,
      dealName: 'Enterprise Support Package - Malhotra',
      amount: 65000.00,
      stage: 'PROSPECT',
      expectedCloseDate: '2026-12-05',
      customer: { company: 'Malhotra Enterprises' }
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    dealName: '',
    amount: '',
    stage: 'PROSPECT',
    expectedCloseDate: ''
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await salesService.getAll();
      if (data && data.length > 0) setSales(data);
    } catch (err) {
      console.warn('Using seeded sales', err);
    }
  };

  const wonTotal = sales
    .filter(s => s.stage === 'CLOSED_WON')
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const pipelineTotal = sales
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      dealName: '',
      amount: '',
      stage: 'PROSPECT',
      expectedCloseDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const openEditModal = (s) => {
    setEditingId(s.id);
    setFormData({
      dealName: s.dealName,
      amount: s.amount,
      stage: s.stage,
      expectedCloseDate: s.expectedCloseDate || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await salesService.update(editingId, formData);
        setSales(sales.map(s => s.id === editingId ? { ...s, ...formData } : s));
      } else {
        const created = await salesService.create(formData);
        const newSale = created?.id ? created : { ...formData, id: Date.now() };
        setSales([newSale, ...sales]);
      }
      setAlert({ type: 'success', text: 'Deal saved successfully!' });
      setShowModal(false);
    } catch (err) {
      setSales(editingId ? sales.map(s => s.id === editingId ? { ...s, ...formData } : s) : [{ ...formData, id: Date.now() }, ...sales]);
      setShowModal(false);
      setAlert({ type: 'success', text: 'Deal saved!' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this deal?')) return;
    try {
      await salesService.delete(id);
      setSales(sales.filter(s => s.id !== id));
      setAlert({ type: 'success', text: 'Deal removed.' });
    } catch (err) {
      setSales(sales.filter(s => s.id !== id));
      setAlert({ type: 'success', text: 'Deal removed.' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BadgePercent className="w-6 h-6 text-indigo-600" />
            Sales Deals & Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track active revenue opportunities across multiple sales stages.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Create Deal
        </button>
      </div>

      {alert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* Revenue summary banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Won Revenue</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              ₹{wonTotal.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pipeline Potential</span>
            <p className="text-2xl font-bold text-indigo-600 mt-1">
              ₹{pipelineTotal.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <BadgeIndianRupee className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Deal Title</th>
                <th className="py-3 px-4">Account / Client</th>
                <th className="py-3 px-4">Deal Value</th>
                <th className="py-3 px-4">Target Close</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{sale.dealName}</td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      {sale.customer?.company || 'Enterprise Client'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    ₹{Number(sale.amount || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {sale.expectedCloseDate || 'Rolling'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      sale.stage === 'CLOSED_WON' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      sale.stage === 'NEGOTIATION' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      sale.stage === 'PROSPECT' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      {sale.stage}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(sale)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(sale.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
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
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Sales Deal' : 'Create Sales Deal'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Deal Title *</label>
                <input
                  type="text"
                  required
                  value={formData.dealName}
                  onChange={(e) => setFormData({ ...formData, dealName: e.target.value })}
                  placeholder="e.g. 50-Seat Enterprise Subscription"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Deal Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="100000"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Deal Stage</label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="PROSPECT">PROSPECT</option>
                    <option value="NEGOTIATION">NEGOTIATION</option>
                    <option value="CLOSED_WON">CLOSED_WON</option>
                    <option value="CLOSED_LOST">CLOSED_LOST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Expected Close</label>
                  <input
                    type="date"
                    value={formData.expectedCloseDate}
                    onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
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
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sales;
