import React from 'react';
import { Wifi, Zap, Smartphone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Badge } from '@mfe/ui';

export const Widget = () => {
  return (
    <Card className="bg-muted/50 border-border backdrop-blur-md shadow-2xl hover:bg-muted transition-all cursor-pointer group">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
            <Wifi className="w-5 h-5 text-white" />
          </div>
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">
            5G Ultra
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground mb-1">Wireless Mobile</CardTitle>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">42.5</span>
            <span className="text-xs font-bold text-muted-foreground/30 uppercase tracking-widest">GB</span>
          </div>
        </div>
        <div className="w-full bg-muted border border-border/50 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold">
            <Zap className="w-3 h-3 text-orange-400 animate-pulse" />
            <span>Unlimited Plan</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-pink-400 font-bold uppercase tracking-widest">
            <Smartphone className="w-3 h-3" />
            <span>Phone Linked</span>
          </div>
        </div>
      </CardFooter>
    </Card>

  );
};

export default Widget;
