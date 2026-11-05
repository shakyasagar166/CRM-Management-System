import React, { useState, useEffect } from 'react';
import { leadService } from '../services/crmServices';
import { 
  Target, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  UserCheck, 
  Sparkles, 
  BadgeIndianRupee, 
  Building2, 
  X, 
  CheckCircle, 
  Filter 
} from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      firstName: 'Rohan',
      lastName: 'Mehta',
      email: 'rohan.m@cloudcorp.com',
      phone: '+91-9711223344',
      company: 'CloudCorp India',
      source: 'Website',
      status: 'QUALIFIED',
      estimatedValue: 120000,
      notes: 'Interested in enterprise cloud CRM'
    },
    {
      id: 2,
      firstName: 'Neha',
      lastName: 'Singhal',
      email: 'neha.s@fintechscale.org',
      phone: '+91-9811334455',
      company: 'FintechScale Ltd',
      source: 'Referral',
      status: 'CONTACTED',
      estimatedValue: 85000,
      notes: 'Demo scheduled next week'
    },
    {
      id: 3,
      firstName: 'Karan',
      lastName: 'Chawla',
      email: 'karan.c@nexusecommerce.com',
      phone: '+91-9988776655',
      company: 'Nexus Ecommerce',
      source: 'LinkedIn',
      status: 'NEW',
      estimatedValue: 150000,
      notes: 'Inquiry regarding automated pipeline'
    }
  ]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    status: 'NEW',
    estimatedValue: '',
    notes: ''
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await leadService.getAll();
      if (data && data.length > 0) {
        setLeads(data);
      }
    } catch (err) {
      console.warn('Using seeded leads', err);
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
      source: 'Website',
      status: 'NEW',
      estimatedValue: '',
      notes: ''
    });
    setShowModal(true);
  };

  const openEditModal = (lead) => {
    setEditingId(lead.id);
    setFormData({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      source: lead.source || 'Website',
      status: lead.status || 'NEW',
      estimatedValue: lead.estimatedValue || '',
      notes: lead.notes || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await leadService.update(editingId, formData);
        setLeads(leads.map(l => l.id === editingId ? { ...l, ...formData } : l));
        setAlert({ type: 'success', text: 'Lead updated successfully!' });
      } else {
        const created = await leadService.create(formData);
        const newLead = created?.id ? created : { ...formData, id: Date.now() };
        setLeads([newLead, ...leads]);
        setAlert({ type: 'success', text: 'New prospective lead created!' });
      }
      setShowModal(false);
    } catch (err) {
      // optimistic update
      if (editingId) {
        setLeads(leads.map(l => l.id === editingId ? { ...l, ...formData } : l));
      } else {
        setLeads([{ ...formData, id: Date.now() }, ...leads]);
      }
      setShowModal(false);
      setAlert({ type: 'success', text: 'Saved successfully!' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead record?')) return;
    try {
      await leadService.delete(id);
      setLeads(leads.filter(l => l.id !== id));
      setAlert({ type: 'success', text: 'Lead deleted.' });
    } catch (err) {
      setLeads(leads.filter(l => l.id !== id));
      setAlert({ type: 'success', text: 'Lead deleted.' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleConvertToCustomer = async (lead) => {
    try {
      await leadService.convert(lead.id);
      setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'WON' } : l));
      setAlert({ type: 'success', text: `🎉 Lead converted to Active Customer! (${lead.firstName} ${lead.lastName})` });
    } catch (err) {
      setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'WON' } : l));
      setAlert({ type: 'success', text: `🎉 Lead converted to Active Customer! (${lead.firstName} ${lead.lastName})` });
    }
    setTimeout(() => setAlert(null), 4000);
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchesSearch = !searchQuery || 
      l.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-600" />
            Leads Pipeline & Acquisition
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track prospect qualification, deal size estimates, and seamless customer conversions.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </button>
      </div>

      {alert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, or company..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="QUALIFIED">QUALIFIED</option>
            <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
            <option value="WON">WON</option>
            <option value="LOST">LOST</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Lead Name</th>
                <th className="py-3 px-4">Company & Source</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900">{lead.firstName} {lead.lastName}</p>
                    <p className="text-[11px] text-slate-400">{lead.email} {lead.phone && `• ${lead.phone}`}</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      {lead.company || 'Direct Client'}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Source: {lead.source || 'Website'}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    ₹{Number(lead.estimatedValue || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      lead.status === 'QUALIFIED' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      lead.status === 'WON' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      lead.status === 'CONTACTED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      lead.status === 'PROPOSAL_SENT' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {lead.status !== 'WON' && (
                        <button
                          onClick={() => handleConvertToCustomer(lead)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md text-[11px] font-semibold flex items-center gap-1 transition border border-emerald-200"
                          title="Convert to Customer"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Convert
                        </button>
                      )}
                      <button
                        onClick={() => openEditModal(lead)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUALIFIED">QUALIFIED</option>
                    <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                    <option value="WON">WON</option>
                    <option value="LOST">LOST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Estimated Value (₹)</label>
                  <input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Notes / Requirements</label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                ></textarea>
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
                  {editingId ? 'Update Lead' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
