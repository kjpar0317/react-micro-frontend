import React, { Suspense, lazy } from 'react';
import { createFileRoute } from '@tanstack/react-router';

const WirelessWidget = lazy(() => import('remote_wireless/Widget'));

const WirelessPage = () => {
    return (
        <div className="max-w-[1240px] mx-auto pb-10">
            <h1 className="text-4xl font-extrabold mb-8">Wireless Mobile Service</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Suspense fallback={<div className="h-48 bg-white/5 animate-pulse rounded-2xl"></div>}>
                    <WirelessWidget />
                </Suspense>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h2 className="text-xl font-bold mb-4">Mobile Data Analytics</h2>
                    <p className="text-white/60 mb-6 font-medium leading-relaxed">
                        Analyze your 5G usage, add lines, and manage roaming settings. Your mobile experience redefined.
                    </p>
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/wireless')({
    component: WirelessPage,
});
