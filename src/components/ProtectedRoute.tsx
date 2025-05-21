
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = ['owner', 'manager', 'cashier', 'viewer'] 
}) => {
  const { isAuthenticated, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-upi-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const hasRequiredRole = hasRole(requiredRoles);
  if (!hasRequiredRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground text-center mb-6">
          You don't have the required permissions to access this page.
        </p>
        <p className="text-sm text-muted-foreground">
          Please contact an administrator if you need access.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
