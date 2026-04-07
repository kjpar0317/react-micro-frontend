import React from 'react';
import { Network, Activity, Globe } from 'lucide-react';

export const Widget = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
          <Network className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-green-400 font-medium">Online</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-1">Network Status</h3>
        <p className="text-2xl font-bold mb-4">980 Mbps</p>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-white/40">Latency</span>
            <span className="text-cyan-400">12 ms</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full w-[85%] rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
        <Globe className="w-4 h-4 text-cyan-400" />
        <p className="text-xs text-white/60">Wired Giga Plan Active</p>
      </div>
    </div>
  );
};

export default Widget;
