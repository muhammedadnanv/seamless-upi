
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RouteErrorBoundaryState {
  hasError: boolean;
  error?: Error;
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
    
    // If configured to redirect to 404, do so after a short delay
    if (this.props.fallbackTo404) {
      setTimeout(() => {
        window.location.href = '/404-not-found';
      }, 2000);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Page Failed to Load</AlertTitle>
              <AlertDescription>
                {this.props.fallbackTo404 
                  ? "This page encountered an error and you'll be redirected to our 404 page shortly."
                  : "An unexpected error occurred while loading this page."
                }
              </AlertDescription>
            </Alert>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </div>
            
            {this.props.fallbackTo404 && (
              <p className="mt-4 text-sm text-muted-foreground text-center">
                Redirecting to 404 page in a few seconds...
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
