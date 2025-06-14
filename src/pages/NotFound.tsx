
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Home, ArrowLeft, RefreshCw, Search, Wifi, AlertTriangle } from "lucide-react";
import { useResponsive } from "@/hooks/use-responsive";
import GlobalNavigation from "@/components/GlobalNavigation";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const [countdown, setCountdown] = useState(15);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Monitor online status for better error handling
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Generate route suggestions based on attempted path
  useEffect(() => {
    const attemptedPath = location.pathname;
    const validRoutes = ['/', '/app', '/widget'];
    const routeDescriptions = {
      '/': 'Home - Landing page',
      '/app': 'Dashboard - Main application',
      '/widget': 'Widget Demo - Interactive demonstration'
    };

    // Simple fuzzy matching for suggestions
    const getSuggestions = (path: string) => {
      return validRoutes
        .map(route => ({
          route,
          similarity: calculateSimilarity(path, route),
          description: routeDescriptions[route as keyof typeof routeDescriptions]
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 2)
        .map(item => `${item.route} - ${item.description}`);
    };

    setSuggestions(getSuggestions(attemptedPath));
  }, [location.pathname]);

  // Simple similarity calculation
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const getEditDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
      {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        online: navigator.onLine,
        state: location.state
      }
    );

    // Auto-redirect countdown with mobile-optimized timing
    const redirectTime = isMobile ? 10 : 15;
    setCountdown(redirectTime);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [location.pathname, navigate, isMobile]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSuggestionClick = (suggestion: string) => {
    const route = suggestion.split(' - ')[0];
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header />
      
      <ResponsiveContainer className="py-4 sm:py-8" maxWidth="lg">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
          {/* Error Status Indicator */}
          {!isOnline && (
            <Alert variant="destructive" className="max-w-md">
              <Wifi className="h-4 w-4" />
              <AlertDescription>
                You appear to be offline. Please check your internet connection.
              </AlertDescription>
            </Alert>
          )}

          {/* Main 404 Content */}
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-300 dark:text-gray-600">
                404
              </h1>
              <AlertTriangle className="absolute -top-2 -right-2 h-8 w-8 sm:h-12 sm:w-12 text-orange-500 animate-bounce" />
            </div>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Oops! Page not found
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md leading-relaxed">
              The page <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                {location.pathname}
              </code> doesn't exist or has been moved.
            </p>

            {/* Auto-redirect notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Auto-redirecting to homepage in{" "}
                <span className="font-bold text-lg">{countdown}</span> seconds
              </p>
            </div>
          </div>

          {/* Route Suggestions */}
          {suggestions.length > 0 && (
            <div className="w-full max-w-md space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Did you mean to visit:
              </h3>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="text-sm">
                      <div className="font-medium">{suggestion.split(' - ')[0]}</div>
                      <div className="text-muted-foreground text-xs">
                        {suggestion.split(' - ').slice(1).join(' - ')}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <Button 
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2 min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button 
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2 min-h-[44px]"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 min-h-[44px]"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </div>

          {/* Additional Help Section */}
          <div className="w-full max-w-md mt-8">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-medium">Need help navigating?</h4>
              <div className="text-xs text-muted-foreground space-y-2">
                <p>• Use the navigation menu to explore available pages</p>
                <p>• Check your internet connection if pages won't load</p>
                <p>• Contact support if you continue experiencing issues</p>
              </div>
              
              {/* Quick Navigation */}
              <div className="pt-3 border-t">
                <GlobalNavigation variant="footer" />
              </div>
            </div>
          </div>

          {/* Debug Info (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="w-full max-w-md mt-4 text-left">
              <summary className="cursor-pointer text-xs text-muted-foreground">
                Debug Information
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">
                {JSON.stringify({
                  pathname: location.pathname,
                  search: location.search,
                  state: location.state,
                  timestamp: new Date().toISOString(),
                  userAgent: navigator.userAgent.substring(0, 100) + '...',
                  online: navigator.onLine,
                  referrer: document.referrer
                }, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default NotFound;
