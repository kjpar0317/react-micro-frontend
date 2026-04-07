import React from 'react';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { LayoutDashboard, CreditCard, Network, Wifi, Settings, Bell, Search } from 'lucide-react';

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="font-bold text-xl">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight">MFE Portal</span>
        </div>

        <nav className="flex-1 space-y-2">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[2px] px-2 mb-4">Main Menu</p>
          <Link
            to="/"
            activeProps={{ className: 'bg-white/10 text-white' }}
            inactiveProps={{ className: 'text-white/50 hover:bg-white/5 hover:text-white' }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          >
            <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[2px] px-2 mt-8 mb-4">Services</p>
          <Link
            to="/billing"
            activeProps={{ className: 'bg-blue-500/10 text-blue-400' }}
            inactiveProps={{ className: 'text-white/50 hover:bg-white/5 hover:text-white' }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          >
            <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Billing Service</span>
          </Link>
          <Link
            to="/wired"
            activeProps={{ className: 'bg-indigo-500/10 text-indigo-400' }}
            inactiveProps={{ className: 'text-white/50 hover:bg-white/5 hover:text-white' }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          >
            <Network className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Wired Network</span>
          </Link>
          <Link
            to="/wireless"
            activeProps={{ className: 'bg-orange-500/10 text-orange-400' }}
            inactiveProps={{ className: 'text-white/50 hover:bg-white/5 hover:text-white' }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
          >
            <Wifi className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Wireless Mobile</span>
          </Link>
        </nav>

        <div className="pt-6 border-t border-white/10 space-y-2">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-white/50 hover:bg-white/5 hover:text-white rounded-xl transition-all group">
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-white/2 backdrop-blur-sm sticky top-0 z-10">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white/60 transition-colors" />
            <input 
              type="text" 
              placeholder="Search services or transactions..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-white/60" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#050505]"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-semibold">Alex Parker</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Premium User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                  alt="Avatar" 
                  className="w-full h-full rounded-full bg-[#050505]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <Outlet />
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      </main>
    </div>
  ),
});
