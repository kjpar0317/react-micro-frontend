import { createFileRoute } from '@tanstack/react-router';
import type { PrimitiveAtom } from 'jotai';
import { useAtom } from 'jotai';
import { Suspense } from 'react';
import { SafeRemote } from '../components/SafeRemote';
import { countAtom } from '../state/atoms';
import { safeLazy } from '../utils/remote-loader';

const BillingWidget = safeLazy<React.ComponentType<{ sharedAtom?: PrimitiveAtom<number> }>>(
  () => import('remote_billing/Widget'),
);

function BillingPage() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div className="max-w-[1240px] mx-auto pb-10">
      <h1 className="text-4xl font-extrabold mb-8">Billing Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SafeRemote name="Billing">
          <Suspense fallback={<div className="h-48 bg-white/5 animate-pulse rounded-2xl"></div>}>
            <BillingWidget sharedAtom={countAtom} />
          </Suspense>
        </SafeRemote>
        <div className="p-8 rounded-3xl bg-muted/50 border border-border">
          <h2 className="text-xl font-bold mb-4">Host Controlled State</h2>
          <p className="text-muted-foreground mb-6">
            이 값은 Host 앱의 전역 상태(Jotai)입니다. 아래 버튼을 눌러 상태를 변경해 보세요.
          </p>
          <div className="flex items-center gap-6 p-6 bg-background rounded-2xl border border-border shadow-inner">
            <span className="text-5xl font-black text-blue-500">{count}</span>
            <button
              type="button"
              onClick={() => setCount((c) => c + 1)}
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/25"
            >
              Increment from Host
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/billing')({
  component: BillingPage,
});
