import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from '@mfe/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, History, Sparkles, Target, Zap } from 'lucide-react';
import { Suspense } from 'react';
import { SafeRemote } from '../components/SafeRemote';
import { safeLazy } from '../utils/remote-loader';

const BillingWidget = safeLazy(() => import('remote_billing/Widget'));
const WiredWidget = safeLazy(() => import('remote_wired/Widget'));
const WirelessWidget = safeLazy(() => import('remote_wireless/Widget'));

const LoadingWidget = () => (
  <Card className="bg-muted/50 border-border backdrop-blur-md overflow-hidden">
    <CardContent className="p-12 flex flex-col items-center justify-center min-h-[220px]">
      <div className="w-10 h-10 rounded-full border-2 border-t-indigo-500 border-border animate-spin mb-4" />
      <Skeleton className="h-4 w-[120px] bg-border" />
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section>
        <Badge
          variant="outline"
          className="mb-6 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1 gap-2"
        >
          <Sparkles className="w-3 h-3" />
          SYSTEMS STATUS: OPTIMAL
        </Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Unified Control of your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Digital Ecosystem.
          </span>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
          Monitor real-time performance, manage billing lifecycles, and optimize your network nodes
          through our integrated micro-frontend architecture.
        </p>
      </section>

      {/* Remote Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SafeRemote name="Billing">
          <Suspense fallback={<LoadingWidget />}>
            <BillingWidget />
          </Suspense>
        </SafeRemote>
        <SafeRemote name="Wired">
          <Suspense fallback={<LoadingWidget />}>
            <WiredWidget />
          </Suspense>
        </SafeRemote>
        <SafeRemote name="Wireless">
          <Suspense fallback={<LoadingWidget />}>
            <WirelessWidget />
          </Suspense>
        </SafeRemote>
      </div>

      {/* Insights and History */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
        {/* Integration History */}
        <Card className="lg:col-span-3 bg-muted/5 border-border shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <History className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Integration History</CardTitle>
                <CardDescription className="text-muted-foreground/70">
                  Recent system-wide synchronization events
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground gap-2 group"
            >
              VIEW ALL{' '}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: 'Billing Sync Complete',
                app: 'remote_billing',
                time: '2 mins ago',
                status: 'Success',
              },
              {
                title: 'New 5G Node Optimized',
                app: 'remote_wireless',
                time: '1 hour ago',
                status: 'Optimal',
              },
              {
                title: 'Bandwidth Upgrade Confirmed',
                app: 'remote_wired',
                time: '4 hours ago',
                status: 'Success',
              },
            ].map((item, i) => (
              <div key={i.toString()}>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-8 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">
                        {item.app}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                    <Badge
                      variant="outline"
                      className="text-[10px] text-green-400/80 border-green-500/20 py-0"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
                {i < 2 && <Separator className="bg-border" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-border relative overflow-hidden group">
          <Zap className="absolute top-[-10%] right-[-5%] w-32 h-32 text-indigo-500/10 -z-0 group-hover:rotate-12 transition-transform duration-700" />
          <CardHeader>
            <div className="p-3 rounded-xl bg-indigo-500 w-12 h-12 flex items-center justify-center mb-2 shadow-xl shadow-indigo-500/40">
              <Target className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Performance Insights</CardTitle>
            <CardDescription className="text-muted-foreground">
              Distributed architecture metrics
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              Your architecture is currently performing at{' '}
              <span className="text-indigo-400 font-bold">98.4%</span> efficiency with sub-zero
              latency between micro-frontend modules.
            </p>

            <div className="space-y-3">
              {['Zero-runtime CSS', 'Tree-shaked Deps', 'Predictive Loading'].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-3 text-xs font-medium text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {feat}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-white text-black hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg transition-all active:scale-[0.98]">
              View Optimization Guide
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Dashboard,
});
