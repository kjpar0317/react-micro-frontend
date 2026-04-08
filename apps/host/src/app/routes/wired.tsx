import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { SafeRemote } from '../components/SafeRemote';
import { safeLazy } from '../utils/remote-loader';

const WiredWidget = safeLazy(() => import('remote_wired/Widget'));

const WiredPage = () => {
  return (
    <div className="max-w-[1240px] mx-auto pb-10">
      <h1 className="text-4xl font-extrabold mb-8">Wired Network Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SafeRemote name="Wired">
          <Suspense fallback={<div className="h-48 bg-muted/50 animate-pulse rounded-2xl"></div>}>
            <WiredWidget />
          </Suspense>
        </SafeRemote>
        <div className="p-8 rounded-3xl bg-muted/50 border border-border">
          <h2 className="text-xl font-bold mb-4">Network Management</h2>
          <p className="text-muted-foreground mb-6 font-medium leading-relaxed">
            Optimize your home or office network. Manage individual nodes, monitor real-time
            bandwidth, and schedule maintenance from this unified interface.
          </p>

        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/wired')({
  component: WiredPage,
});
