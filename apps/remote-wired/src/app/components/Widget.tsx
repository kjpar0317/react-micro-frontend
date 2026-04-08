import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mfe/ui';
import { useSetAtom } from 'jotai';
import { Activity, Network } from 'lucide-react';
import { useEffect } from 'react';
import { themeAtom } from '../state/theme';

interface WidgetProps {
  theme?: 'dark' | 'light';
}

export function Widget({ theme }: WidgetProps) {
  const setTheme = useSetAtom(themeAtom);

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return (
    <Card className="bg-muted/50 border-border backdrop-blur-md shadow-2xl hover:bg-muted transition-all cursor-pointer group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Network className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 hover:bg-indigo-500/30">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
          Wired Network
        </CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">940.2</span>
          <span className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest">
            Mbps
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold">
            <Activity className="w-3 h-3 text-indigo-400" />
            <span>Optimal Ping</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-indigo-400 animate-ping"></div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
              Live
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Widget;
