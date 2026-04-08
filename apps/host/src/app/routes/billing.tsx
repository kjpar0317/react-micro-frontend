import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { SafeRemote } from '../components/SafeRemote';
import { safeLazy } from '../utils/remote-loader';

const BillingWidget = safeLazy(() => import('remote_billing/Widget'));

const BillingPage = () => {
  return (
    <div className="max-w-[1240px] mx-auto pb-10">
      <h1 className="text-4xl font-extrabold mb-8">Billing Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SafeRemote name="Billing">
          <Suspense fallback={<div className="h-48 bg-white/5 animate-pulse rounded-2xl"></div>}>
            <BillingWidget />
          </Suspense>
        </SafeRemote>
        <div className="p-8 rounded-3xl bg-muted/50 border border-border">
          <h2 className="text-xl font-bold mb-4">Detailed Invoices</h2>
          <p className="text-muted-foreground mb-6">
            Manage your subscription, view payment history, and update billing methods.
          </p>

          {/* Add more placeholder content here if needed */}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/billing')({
  component: BillingPage,
});
