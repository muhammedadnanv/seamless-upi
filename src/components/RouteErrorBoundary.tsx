
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useResponsive } from '@/hooks/use-responsive';

interface RouteErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  fallbackTo404?: boolean;
}

class RouteErrorBoundary extends React.Component<RouteErrorBoundaryProps, RouteErrorBoundaryState> {
  private navigate: any;
  private location: any;

  constructor(props: RouteErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): RouteErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Route error caught:', error, errorInfo);
    
    // Enhanced error logging for better debugging
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      online: navigator.onLine
    };
    
    console.error('Detailed error report:', errorReport);
    
    this.setState({ errorInfo });
    
    // If configured to redirect to 404, do so after a short delay
    if (this.props.fallbackTo404) {
      setTimeout(() => {
        window.location.href = '/404-not-found';
      }, 3000);
    }
  }

  private ErrorFallback = () => {
    const { isMobile } = useResponsive();
    const isNetworkError = this.state.error?.message.includes('Failed to fetch') || 
                          this.state.error?.message.includes('Network Error');

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-6">
          {/* Network Status Alert */}
          {!navigator.onLine && (
            <Alert variant="destructive">
              <Wifi className="h-4 w-4" />
              <AlertTitle>No Internet Connection</AlertTitle>
              <AlertDescription>
                Please check your internet connection and try again.
              </AlertDescription>
            </Alert>
          )}

          {/* Main Error Alert */}
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>
              {isNetworkError ? 'Connection Error' : 'Page Failed to Load'}
            </AlertTitle>
            <AlertDescription>
              {this.props.fallbackTo404 
                ? "This page encountered an error and you'll be redirected to our 404 page shortly."
                : isNetworkError
                  ? "Unable to load the page due to a network issue. Please check your connection and try again."
                  : "An unexpected error occurred while loading this page."
              }
            </AlertDescription>
          </Alert>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
              className="flex items-center gap-2 min-h-[44px]"
              disabled={!navigator.onLine}
            >
              <RefreshCw className="h-4 w-4" />
              {navigator.onLine ? 'Refresh Page' : 'Offline'}
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 min-h-[44px]"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>
          
          {/* Mobile-specific messaging */}
          {isMobile && (
            <div className="text-sm text-muted-foreground text-center">
              <p>Having trouble? Try:</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Refreshing the page</li>
                <li>• Checking your internet connection</li>
                <li>• Closing and reopening the app</li>
              </ul>
            </div>
          )}
          
          {/* Redirect Notice */}
          {this.props.fallbackTo404 && (
            <p className="text-sm text-muted-foreground text-center">
              Redirecting to 404 page in a few seconds...
            </p>
          )}

          {/* Error Details for Development */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
              <summary className="cursor-pointer font-medium">Error Details</summary>
              <div className="mt-2 space-y-2">
                <div>
                  <strong>Message:</strong>
                  <pre className="mt-1 whitespace-pre-wrap">{this.state.error.message}</pre>
                </div>
                {this.state.error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-xs">
                      {this.state.error.stack.substring(0, 500)}...
                    </pre>
                  </div>
                )}
                {this.state.errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap text-xs">
                      {this.state.errorInfo.componentStack.substring(0, 300)}...
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    );
  };

  render() {
    if (this.state.hasError) {
      return <this.ErrorFallback />;
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
