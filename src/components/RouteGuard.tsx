
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useResponsive } from '@/hooks/use-responsive';

interface RouteGuardProps {
  children: React.ReactNode;
  validRoutes?: string[];
}

const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  validRoutes = ['/', '/app', '/widget'] 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useResponsive();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateRoute = async () => {
      try {
        const currentPath = location.pathname;
        
        // Check if current path is in valid routes or is a valid nested route
        const isValidRoute = validRoutes.some(route => 
          currentPath === route || 
          (route !== '/' && currentPath.startsWith(route + '/'))
        );
        
        if (!isValidRoute) {
          console.warn('Invalid route detected:', currentPath);
          // Store the attempted route for analytics
          sessionStorage.setItem('lastAttemptedRoute', currentPath);
          navigate('/404-not-found', { 
            replace: true,
            state: { 
              from: currentPath,
              timestamp: Date.now(),
              userAgent: navigator.userAgent,
              isMobile
            }
          });
          return;
        }
        
        // Clear any previous errors
        setError(null);
        setIsValidating(false);
      } catch (err) {
        console.error('Route validation error:', err);
        setError('Failed to validate route');
        // On mobile, provide a more graceful fallback
        if (isMobile) {
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 3000);
        }
      }
    };

    // Debounce validation for better mobile performance
    const timeoutId = setTimeout(validateRoute, isMobile ? 50 : 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, navigate, validRoutes, isMobile]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-4">
        <div className="text-center max-w-md">
          <h2 className="text-lg font-semibold mb-2">Route Validation Error</h2>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          {isMobile && (
            <p className="text-xs text-muted-foreground">
              Redirecting to home page...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <LoadingSpinner 
          size={isMobile ? "md" : "lg"} 
          text={isMobile ? "Loading..." : "Validating route..."} 
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
