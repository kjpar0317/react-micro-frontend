import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { SafeRemote } from '../components/SafeRemote';
import { safeLazy } from '../utils/remote-loader';

const WirelessWidget = safeLazy(() => import('remote_wireless/Widget'));

const WirelessPage = () => {
  return (
    <div className="max-w-[1240px] mx-auto pb-10">
      <h1 className="text-4xl font-extrabold mb-8">Wireless Mobile Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SafeRemote name="Wireless">
          <Suspense fallback={<div className="h-48 bg-muted/50 animate-pulse rounded-2xl"></div>}>
            <WirelessWidget />
          </Suspense>
        </SafeRemote>
        <div className="p-8 rounded-3xl bg-muted/50 border border-border">
          <h2 className="text-xl font-bold mb-4">Mobile Data Analytics</h2>
          <p className="text-muted-foreground mb-6 font-medium leading-relaxed">
            Analyze your 5G usage, add lines, and manage roaming settings. Your mobile experience
            redefined.
          </p>
        </div>

      </div>
    </div>
  );
};

export const Route = createFileRoute('/wireless')({
  component: WirelessPage,
});
