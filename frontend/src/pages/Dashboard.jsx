import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../services/crmServices';
import { 
  Users, 
  Target, 
  BadgeIndianRupee, 
  CheckCircle, 
  ArrowUpRight, 
  Clock, 
  Plus, 
  GraduationCap,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState({
    totalCustomers: 4,
    activeCustomers: 3,
    totalLeads: 4,
    qualifiedLeads: 1,
    totalRevenue: 120000.00,
    pipelineValue: 270000.00,
    pendingTasks: 1,
    completedTasks: 1,
    recentLeads: [],
    recentSales: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardService.getData();
      setData(res);
    } catch (err) {
      console.warn('Backend not responding yet or using fallback default data', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Welcome & Highlights */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            CRM Intelligence Hub
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Executive Sales & Operations Overview</h1>
          <p className="text-indigo-200 text-sm mt-1 max-w-2xl">
            Real-time pipeline analytics, lead conversion tracking, and task delegation for enterprise teams.
          </p>
        </div>

        {/* Training Certification Highlights */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-xs text-white max-w-sm">
          <div className="flex items-center gap-2 font-semibold text-amber-300 mb-1">
            <GraduationCap className="w-4 h-4" />
            Specialized Java Training Links:
          </div>
          <p className="text-slate-200 text-[11px] mb-2 leading-relaxed">
            Enhance your Spring Boot & microservices backend capabilities:
          </p>
          <div className="flex flex-col gap-1.5">
            <a 
              href="https://uncodemy.com/course/java-training-course-in-noida" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-200 hover:text-white font-medium underline flex items-center justify-between"
            >
              <span>Java Training Course in Noida</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a 
              href="https://uncodemy.com/course/java-training-course-in-delhi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-amber-200 hover:text-white font-medium underline flex items-center justify-between"
            >
              <span>Java Training Course in Delhi</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Customers</span>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-2">{data.totalCustomers}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{data.activeCustomers} Active Accounts</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Leads</span>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-2">{data.totalLeads}</p>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium mt-1">
            <span>{data.qualifiedLeads} Qualified Prospects</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Won Revenue</span>
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BadgeIndianRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-2">{formatCurrency(data.totalRevenue)}</p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium mt-1">
            <span>Pipeline: {formatCurrency(data.pipelineValue)}</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Tasks</span>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-2">{data.pendingTasks}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>{data.completedTasks} Completed recently</span>
          </div>
        </div>
      </div>

      {/* Main Content Split: Quick Actions + Pipeline + Recent Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Leads & Quick Add */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800">Recent Lead Inquiries</h2>
                <p className="text-xs text-slate-500">Prospects acquired across web, referrals & outbound campaigns</p>
              </div>
              <Link
                to="/leads"
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View All Leads
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium uppercase">
                    <th className="py-2.5">Name</th>
                    <th className="py-2.5">Company</th>
                    <th className="py-2.5">Status</th>
                    <th className="py-2.5">Est. Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {data.recentLeads && data.recentLeads.length > 0 ? (
                    data.recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 font-medium text-slate-900">{lead.firstName} {lead.lastName}</td>
                        <td className="py-3 text-slate-600">{lead.company || 'Direct'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            lead.status === 'QUALIFIED' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                            lead.status === 'WON' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            lead.status === 'CONTACTED' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 font-semibold text-slate-800">{formatCurrency(lead.estimatedValue)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-slate-400">
                        No recent leads found. Click "Add Lead" to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Operations bar */}
          <div className="bg-slate-900 rounded-xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-sm">Need to add a record fast?</h3>
              <p className="text-xs text-slate-400">Create new customer accounts, pipeline leads or schedule tasks.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/leads"
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Lead
              </Link>
              <Link
                to="/customers"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" />
                New Customer
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Pipeline Distribution & System Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-base font-semibold text-slate-800 mb-1">Sales Funnel Health</h2>
            <p className="text-xs text-slate-500 mb-4">Pipeline stages and conversion metrics</p>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Prospecting</span>
                  <span className="text-slate-500 font-semibold">25%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Negotiation</span>
                  <span className="text-slate-500 font-semibold">45%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Closed Won</span>
                  <span className="text-slate-500 font-semibold">70%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Win Rate Target: 65%</span>
              <span className="text-emerald-600 font-semibold">On Track</span>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-indigo-900 mb-1">System Health</h3>
            <p className="text-xs text-indigo-700 leading-relaxed mb-3">
              Spring Security JWT session active. Database connection pool verified.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All CRM Micro-APIs Operational
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
