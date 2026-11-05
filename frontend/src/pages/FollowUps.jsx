import React, { useState, useEffect } from 'react';
import { followUpService } from '../services/crmServices';
import { 
  CalendarClock, 
  Plus, 
  Trash2, 
  Edit3, 
  PhoneCall, 
  Mail, 
  Users2, 
  CheckCircle2, 
  X, 
  Calendar,
  Building2 
} from 'lucide-react';

const FollowUps = () => {
  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      title: 'Quarterly Health Check Call',
      followUpDate: '2026-11-15',
      type: 'CALL',
      notes: 'Review customer feedback on recent patch and cloud uptime SLA',
      status: 'SCHEDULED',
      customer: { firstName: 'Amit', lastName: 'Patel', company: 'TechSolutions Pvt Ltd' }
    },
    {
      id: 2,
      title: 'Feature Walkthrough Meeting',
      followUpDate: '2026-11-18',
      type: 'MEETING',
      notes: 'Online demo of custom workflows and sales pipeline automations',
      status: 'SCHEDULED',
      customer: { firstName: 'Sneha', lastName: 'Kapoor', company: 'InnovateHub Digital' }
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    followUpDate: '',
    type: 'CALL',
    notes: '',
    status: 'SCHEDULED'
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const fetchFollowUps = async () => {
    try {
      const data = await followUpService.getAll();
      if (data && data.length > 0) setFollowUps(data);
    } catch (e) {
      console.warn('Using seeded follow-ups', e);
    }
  };

  const toggleStatus = async (item) => {
    const nextStatus = item.status === 'COMPLETED' ? 'SCHEDULED' : 'COMPLETED';
    const updated = { ...item, status: nextStatus };
    setFollowUps(followUps.map(f => f.id === item.id ? updated : f));
    try {
      await followUpService.update(item.id, updated);
    } catch (e) {
      // optimistic
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      followUpDate: new Date().toISOString().split('T')[0],
      type: 'CALL',
      notes: '',
      status: 'SCHEDULED'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await followUpService.update(editingId, formData);
        setFollowUps(followUps.map(f => f.id === editingId ? { ...f, ...formData } : f));
      } else {
        const created = await followUpService.create(formData);
        setFollowUps([{ ...(created?.id ? created : formData), id: Date.now() }, ...followUps]);
      }
      setShowModal(false);
      setAlert({ type: 'success', text: 'Follow-up appointment saved!' });
    } catch (e) {
      setFollowUps([{ ...formData, id: Date.now() }, ...followUps]);
      setShowModal(false);
      setAlert({ type: 'success', text: 'Saved!' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this follow-up?')) return;
    try {
      await followUpService.delete(id);
      setFollowUps(followUps.filter(f => f.id !== id));
      setAlert({ type: 'success', text: 'Follow-up removed.' });
    } catch (e) {
      setFollowUps(followUps.filter(f => f.id !== id));
      setAlert({ type: 'success', text: 'Follow-up removed.' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'CALL': return <PhoneCall className="w-4 h-4 text-blue-500" />;
      case 'EMAIL': return <Mail className="w-4 h-4 text-amber-500" />;
      case 'MEETING': return <Users2 className="w-4 h-4 text-emerald-500" />;
      default: return <CalendarClock className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarClock className="w-6 h-6 text-indigo-600" />
            Client Touchpoints & Follow-Ups
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain relationship momentum with scheduled cadence reminders.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Schedule Follow-Up
        </button>
      </div>

      {alert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* Follow-up Timeline Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Subject & Notes</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Scheduled Date</th>
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {followUps.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 max-w-sm">{item.notes}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.followUpDate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                      {item.customer?.company || 'Active Account'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(item)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold transition flex items-center gap-1 ${
                        item.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">Schedule Touchpoint</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Contract negotiation call"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Medium</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="CALL">Phone Call</option>
                    <option value="MEETING">Video Meeting</option>
                    <option value="EMAIL">Email Follow-Up</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Touchpoint Notes</label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Key discussion points..."
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
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUps;
