import React from 'react';
import { Wifi, Zap, Smartphone } from 'lucide-react';

export const Widget = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500">
          <Wifi className="w-6 h-6 text-white" />
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-medium border border-orange-500/30">
          Unmetered
        </span>
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-1">Wireless Device</h3>
        <p className="text-2xl font-bold mb-4">5G Pro Plus</p>
        <div className="flex items-center justify-between mt-4 mb-2">
          <span className="text-xs text-white/40">Data Usage</span>
          <span className="text-xs text-pink-400">42.5 GB / Unlimited</span>
        </div>
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-pink-400" />
          <span className="text-xs text-white/60">Phone Connected</span>
        </div>
        <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
      </div>
    </div>
  );
};

export default Widget;
