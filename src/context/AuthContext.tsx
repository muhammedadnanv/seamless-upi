
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'owner' | 'manager' | 'cashier' | 'viewer';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userData: UserData | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user data when session changes
        if (session?.user) {
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setUserData(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('app_users')
        .select('id, email, name, role')
        .eq('auth_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return;
      }

      if (data) {
        setUserData({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role as UserRole,
        });
      }
    } catch (error) {
      console.error('Error in fetchUserData:', error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserData(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const hasRole = (roles: UserRole[]) => {
    if (!userData) return false;
    return roles.includes(userData.role);
  };

  const value = {
    session,
    user,
    userData,
    signOut,
    loading,
    isAuthenticated: !!user,
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
