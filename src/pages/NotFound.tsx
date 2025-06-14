
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ResponsiveContainer from "@/components/ResponsiveContainer";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Auto-redirect countdown
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
  }, [location.pathname, navigate]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <Header />
      
      <ResponsiveContainer className="py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <h1 className="text-6xl sm:text-8xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Page not found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              You'll be automatically redirected to the homepage in <span className="font-semibold text-primary">{countdown}</span> seconds.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Button 
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Page
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </div>

          {/* Additional help text */}
          <div className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg max-w-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              If you believe this is an error, please try refreshing the page or contact support.
            </p>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default NotFound;
