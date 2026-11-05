import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  BadgePercent, 
  CheckSquare, 
  CalendarClock, 
  BarChart3 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Leads', path: '/leads', icon: Target },
  { name: 'Sales Deals', path: '/sales', icon: BadgePercent },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Follow-Ups', path: '/follow-ups', icon: CalendarClock },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 border-r border-slate-800">
      <div>
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 mt-6">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
          Enterprise CRM v1.0
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Spring Boot 3 + React + JWT Secure Cloud Architecture
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
