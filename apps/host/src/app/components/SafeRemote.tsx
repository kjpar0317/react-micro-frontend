import { Badge, Card, CardContent } from '@mfe/ui';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  name: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class SafeRemote extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[SafeRemote] Error in ${this.props.name}:`, error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="bg-destructive/5 border-destructive/20 backdrop-blur-md overflow-hidden min-h-[220px] flex items-center justify-center relative group">
          <div className="absolute top-4 right-4">
            <Badge
              variant="outline"
              className="bg-destructive/10 text-destructive border-destructive/20 gap-1.5 px-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              OFFLINE
            </Badge>
          </div>

          <CardContent className="p-8 flex flex-col items-center text-center">
            <div className="p-3 rounded-2xl bg-destructive/10 text-destructive mb-4 group-hover:rotate-12 transition-transform duration-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">{this.props.name} Service</h3>
            <p className="text-sm text-muted-foreground max-w-[200px] mb-6">
              Unable to establish a secure connection to the remote module.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Attempt Reconnect
            </button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
