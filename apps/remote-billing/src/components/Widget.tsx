import React from 'react';
import { CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

export const Widget = () => {
  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
          Paid
        </span>
      </div>
      <div>
        <h3 className="text-sm font-medium text-white/60 mb-1">Billing Overview</h3>
        <p className="text-2xl font-bold mb-4">$124.50</p>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span>8% from last month</span>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3">
        <AlertCircle className="w-4 h-4 text-purple-400" />
        <p className="text-xs text-white/60">Next billing date: April 15, 2026</p>
      </div>
    </div>
  );
};

export default Widget;
