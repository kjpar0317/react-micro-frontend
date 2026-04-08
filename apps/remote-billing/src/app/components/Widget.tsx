import { Badge, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mfe/ui';
import { AlertCircle, CreditCard, TrendingUp } from 'lucide-react';

export const Widget = () => {
  return (
    <Card className="bg-muted/50 border-border backdrop-blur-md shadow-2xl hover:bg-muted transition-all cursor-pointer group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
            Paid
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-sm font-medium text-muted-foreground mb-1">
          Total Billing
        </CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">$124.50</span>
          <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-wider">
            <TrendingUp className="w-3 h-3" />
            <span>+8%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          <AlertCircle className="w-3 h-3 text-purple-400" />
          <span>Next: April 15, 2026</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Widget;
