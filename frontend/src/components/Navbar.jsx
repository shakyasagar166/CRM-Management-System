import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, LogOut, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          CRM
        </div>
        <h1 className="text-lg font-semibold text-slate-800 tracking-tight hidden sm:block">
          CRM Enterprise Hub
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button 
          title="Notifications"
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-600">
            <UserCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium text-slate-800 leading-none">
              {user?.username || 'Sales Rep'}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {user?.roles ? Array.from(user.roles).join(', ') : 'Standard User'}
            </p>
          </div>

          <button
            onClick={logout}
            title="Sign out"
            className="flex items-center gap-1.5 ml-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
