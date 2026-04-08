import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  TooltipProvider,
  useSidebar,
} from '@mfe/ui';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { AppSidebar } from '../components/app-sidebar';
import { themeAtom } from '../state/theme';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [theme, setTheme] = useAtom(themeAtom);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev: 'dark' | 'light') => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <TooltipProvider>
      <div className="h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
        <SidebarProvider>
          <AppLayout theme={theme} toggleTheme={toggleTheme} />
        </SidebarProvider>
      </div>
    </TooltipProvider>
  );
}

function AppLayout({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) {
  const { state } = useSidebar();

  return (
    <>
      <AppSidebar />
      <SidebarInset className="flex flex-col flex-1 h-screen overflow-hidden transition-all duration-200">
        {/* Top Header */}
        <header
          className={`h-16 border-b border-border flex items-center justify-between pr-6 bg-background/40 backdrop-blur-md sticky top-0 z-30 shrink-0 transition-all duration-200 ${
            state === 'collapsed' ? 'pl-14 md:pl-16' : 'pl-4 md:pl-6'
          }`}
        >
          <div className="flex items-center gap-4">
            <SidebarTrigger className="relative z-50 h-9 w-9 text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary transition-all border border-primary/20 rounded-lg shadow-sm" />
            <Separator orientation="vertical" className="h-4 bg-border" />

            <div className="relative w-64 md:w-96 group hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full bg-muted/50 border border-border rounded-lg py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              className="relative w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors"
            >
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-destructive rounded-full border border-background"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="text-right hidden md:block">
                <p className="text-xs font-semibold">Alex Parker</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  Premium
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-0.5">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                  alt="Avatar"
                  className="w-full h-full rounded-full bg-background"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative z-10">
          <Outlet />

          {/* Decorative Background Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        </main>
      </SidebarInset>
    </>
  );
}
