import React, { Suspense, lazy } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Sparkles, ArrowRight, Zap, Target, History } from 'lucide-react';

const BillingWidget = lazy(() => import('remote_billing/Widget'));
const WiredWidget = lazy(() => import('remote_wired/Widget'));
const WirelessWidget = lazy(() => import('remote_wireless/Widget'));

const LoadingWidget = () => (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl animate-pulse flex flex-col items-center justify-center min-h-[200px]">
        <div className="w-10 h-10 rounded-full bg-white/10 mb-4 animate-spin border-4 border-t-indigo-500 border-white/10"></div>
        <p className="text-sm text-white/40">Connecting to Remote...</p>
    </div>
);

const Dashboard = () => {
    return (
        <div className="max-w-[1240px] mx-auto pb-10">
            {/* Hero Section */}
            <section className="mb-12">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 w-fit mb-6 animate-fade-in">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SYSTEMS STATUS: OPTIMAL</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                    Overview of your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Integrated Services.</span>
                </h1>
                <p className="text-white/50 max-w-xl text-lg font-medium leading-relaxed">
                    Monitor and manage your billing, 5G connections, and home networks from a single, unified interface. Experience the power of micro-frontends.
                </p>
            </section>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Suspense fallback={<LoadingWidget />}>
                    <BillingWidget />
                </Suspense>
                <Suspense fallback={<LoadingWidget />}>
                    <WiredWidget />
                </Suspense>
                <Suspense fallback={<LoadingWidget />}>
                    <WirelessWidget />
                </Suspense>
            </div>

            {/* Recent Activity / Integration Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/20">
                                <History className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold">Integration History</h2>
                        </div>
                        <button className="text-xs font-bold text-white/40 hover:text-white flex items-center gap-1 transition-colors group">
                            VIEW LOGS <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="space-y-6">
                        {[
                            { title: 'Billing Sync Complete', app: 'remote_billing', time: '2 mins ago', status: 'Success' },
                            { title: 'New 5G Node Optimized', app: 'remote_wireless', time: '1 hour ago', status: 'Optimal' },
                            { title: 'Bandwidth Upgrade Confirmed', app: 'remote_wired', time: '4 hours ago', status: 'Success' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-10 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div>
                                        <p className="font-semibold text-sm">{item.title}</p>
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{item.app}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white/50">{item.time}</p>
                                    <p className="text-[10px] font-bold text-green-400/80 uppercase">{item.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 relative overflow-hidden group">
                    <Zap className="absolute top-[-20%] right-[-10%] w-48 h-48 text-indigo-500/10 -z-0 group-hover:rotate-12 transition-transform duration-700" />
                    <div className="relative z-10">
                        <div className="p-3 rounded-2xl bg-indigo-500 w-12 h-12 flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/40">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">MFE Performance Insights</h2>
                        <p className="text-white/60 mb-6 font-medium">
                            Your distributed architecture is currently performing at 98.4% efficiency with 0.1s latency between micro-frontend modules.
                        </p>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                Zero-runtime CSS Injection
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                Tree-shaked Shared Dependencies
                            </li>
                            <li className="flex items-center gap-3 text-sm font-medium text-white/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                Predictive Module Loading
                            </li>
                        </ul>
                        <button className="px-8 py-3 rounded-2xl bg-white text-[#050505] font-bold text-sm shadow-xl hover:scale-105 transition-transform active:scale-95">
                            Optimization Guide
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/')({
  component: Dashboard,
});
