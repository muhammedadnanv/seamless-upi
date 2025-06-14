
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

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
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateRoute = () => {
      const currentPath = location.pathname;
      
      // Check if current path is in valid routes
      const isValidRoute = validRoutes.includes(currentPath);
      
      if (!isValidRoute) {
        console.log('Invalid route detected:', currentPath);
        // Redirect to 404 page for invalid routes
        navigate('/404-not-found', { replace: true });
        return;
      }
      
      setIsValidating(false);
    };

    // Small delay to ensure proper route resolution
    const timeoutId = setTimeout(validateRoute, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location.pathname, navigate, validRoutes]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Validating route..." />
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
