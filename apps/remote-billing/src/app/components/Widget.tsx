import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mfe/ui';
import { atom, type PrimitiveAtom, useAtom, useSetAtom } from 'jotai';
import { AlertCircle, CreditCard, Plus, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { themeAtom } from '../state/theme';

interface WidgetProps {
  sharedAtom?: PrimitiveAtom<number>;
  theme?: 'dark' | 'light';
}

const localFallbackAtom = atom(0);

export const Widget = ({ sharedAtom, theme }: WidgetProps) => {
  const setTheme = useSetAtom(themeAtom);

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  // sharedAtom이 있으면 그것을 쓰고, 없으면 로컬 fallback atom을 사용하여 훅 규칙 준수
  const [count, setCount] = useAtom(sharedAtom ?? localFallbackAtom);

  return (
    <Card className="bg-muted/50 border-border backdrop-blur-md shadow-2xl hover:bg-muted transition-all cursor-pointer group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
            {sharedAtom ? 'MFE Connected' : 'Standalone'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
          {sharedAtom ? 'Shared Counter' : 'Total Billing'}
        </CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">
            {sharedAtom ? count : '$124.50'}
          </span>
          {sharedAtom && setCount && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCount((c) => c + 1);
              }}
              className="ml-4 p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              aria-label="Increment"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
          {!sharedAtom && (
            <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" />
              <span>+8%</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          <AlertCircle className="w-3 h-3 text-purple-400" />
          <span>{sharedAtom ? 'Injected via Props' : 'Next: April 15, 2026'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Widget;
