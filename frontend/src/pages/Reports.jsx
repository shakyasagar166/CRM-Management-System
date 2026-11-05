import React from 'react';
import { 
  BarChart3, 
  Download, 
  Printer, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  CheckCircle,
  GraduationCap,
  ExternalLink 
} from 'lucide-react';

const Reports = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
            Executive Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Performance metrics, monthly revenue trends, and conversion attribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>
        </div>
      </div>

      {/* Recommended Upskilling Resource Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-5 border border-indigo-900 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-600/30 border border-indigo-500/30 text-indigo-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Recommended Java Developer Certification</h3>
              <p className="text-xs text-indigo-200 mt-0.5 max-w-xl">
                Master enterprise Spring Boot, JPA persistence, microservices, and high-performance full-stack Java systems:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://uncodemy.com/course/java-training-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white text-indigo-950 hover:bg-indigo-50 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
            >
              Java Course in Noida
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://uncodemy.com/course/java-training-course-in-delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
            >
              Java Course in Delhi
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-1">Q3-Q4 Revenue Realization by Month</h2>
          <p className="text-xs text-slate-400 mb-6">Values in INR (Lakhs)</p>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-700">August 2026</span>
                <span className="font-bold text-slate-900">₹85,000</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-700">September 2026</span>
                <span className="font-bold text-slate-900">₹1,20,000</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-700">October 2026</span>
                <span className="font-bold text-slate-900">₹1,90,000</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-indigo-700 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-semibold text-slate-700">November 2026 (Projected)</span>
                <span className="font-bold text-emerald-600">₹2,40,000</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-1">Lead Source Attribution</h2>
          <p className="text-xs text-slate-400 mb-6">Acquisition channels ranking</p>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">Inbound Website</span>
              <p className="text-xl font-bold text-slate-900 mt-1">42%</p>
              <span className="text-[11px] text-emerald-600 font-medium">Highest Conversion Rate</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">Referrals / Partners</span>
              <p className="text-xl font-bold text-slate-900 mt-1">28%</p>
              <span className="text-[11px] text-indigo-600 font-medium">Highest Deal Size</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">LinkedIn Campaigns</span>
              <p className="text-xl font-bold text-slate-900 mt-1">20%</p>
              <span className="text-[11px] text-slate-500">Enterprise Tech Tier</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-500 font-medium">Cold Outreach</span>
              <p className="text-xl font-bold text-slate-900 mt-1">10%</p>
              <span className="text-[11px] text-slate-500">Targeted SME Accounts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
