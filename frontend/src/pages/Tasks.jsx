import React, { useState, useEffect } from 'react';
import { taskService } from '../services/crmServices';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  X 
} from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow-up with Rohan Mehta',
      description: 'Send updated pricing matrix for 50 licenses',
      dueDate: '2026-11-08',
      priority: 'HIGH',
      status: 'PENDING'
    },
    {
      id: 2,
      title: 'Prepare Contract for InnovateHub',
      description: 'Draft Master Services Agreement with 99.9% SLA',
      dueDate: '2026-11-10',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS'
    },
    {
      id: 3,
      title: 'Q3 Quarterly Review Deck',
      description: 'Compile dashboard KPI metrics for leadership presentation',
      dueDate: '2026-11-12',
      priority: 'LOW',
      status: 'COMPLETED'
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'PENDING'
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAll();
      if (data && data.length > 0) setTasks(data);
    } catch (err) {
      console.warn('Using seeded tasks', err);
    }
  };

  const toggleStatus = async (task) => {
    const nextStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    const updated = { ...task, status: nextStatus };
    setTasks(tasks.map(t => t.id === task.id ? updated : t));
    try {
      await taskService.update(task.id, updated);
    } catch (e) {
      // optimistic
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'MEDIUM',
      status: 'PENDING'
    });
    setShowModal(true);
  };

  const openEditModal = (t) => {
    setEditingId(t.id);
    setFormData({
      title: t.title,
      description: t.description || '',
      dueDate: t.dueDate || '',
      priority: t.priority || 'MEDIUM',
      status: t.status || 'PENDING'
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await taskService.update(editingId, formData);
        setTasks(tasks.map(t => t.id === editingId ? { ...t, ...formData } : t));
      } else {
        const created = await taskService.create(formData);
        setTasks([{ ...(created?.id ? created : formData), id: Date.now() }, ...tasks]);
      }
      setShowModal(false);
      setAlert({ type: 'success', text: 'Task saved successfully!' });
    } catch (err) {
      setTasks(editingId ? tasks.map(t => t.id === editingId ? { ...t, ...formData } : t) : [{ ...formData, id: Date.now() }, ...tasks]);
      setShowModal(false);
      setAlert({ type: 'success', text: 'Task saved!' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskService.delete(id);
      setTasks(tasks.filter(t => t.id !== id));
      setAlert({ type: 'success', text: 'Task deleted.' });
    } catch (e) {
      setTasks(tasks.filter(t => t.id !== id));
      setAlert({ type: 'success', text: 'Task deleted.' });
    }
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            Task Management & Action Items
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Assign, schedule, and track mission-critical deliverables across accounts.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {alert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* Task cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-white rounded-xl border p-5 shadow-sm transition flex flex-col justify-between ${
              task.status === 'COMPLETED' ? 'border-slate-200 opacity-75' : 'border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  task.priority === 'HIGH' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  task.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {task.priority} Priority
                </span>

                <button
                  onClick={() => toggleStatus(task)}
                  className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded-full font-medium transition ${
                    task.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {task.status}
                </button>
              </div>

              <h2 className={`font-bold text-sm text-slate-800 mb-1.5 ${task.status === 'COMPLETED' ? 'line-through text-slate-400' : ''}`}>
                {task.title}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {task.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-slate-500 font-medium text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Due: {task.dueDate || 'Flexible'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(task)}
                  className="p-1 hover:text-indigo-600 hover:bg-slate-100 rounded"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Task' : 'Create Task'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Schedule onboarding session"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Task instructions and details..."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
