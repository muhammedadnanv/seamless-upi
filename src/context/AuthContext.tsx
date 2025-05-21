
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'owner' | 'manager' | 'cashier' | 'viewer';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  userData: UserData | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const defaultUser: UserData = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  role: 'owner',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData] = useState<UserData | null>(defaultUser);
  const [loading] = useState(false);

  const hasRole = (roles: UserRole[]) => {
    if (!userData) return false;
    return roles.includes(userData.role);
  };

  const value = {
    userData,
    loading,
    isAuthenticated: true, // Always authenticated
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
