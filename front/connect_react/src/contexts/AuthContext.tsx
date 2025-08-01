import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import api from '@/services/api';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/current_user');
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/login', { user: { email, password } });
      const userData = response.data.user || response.data;
      
      // Transform the user data to match our User type
      const user = {
        ...userData,
        name: userData.name || userData.email,
        type: userData.role === 1 ? 'employer' : 'jobseeker' as const,
        profile: userData.profile
      };
      
      setUser(user);
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.delete('/logout');
      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout failed',
        description: 'There was an error logging out. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/current_user');
      const userData = response.data.user || response.data;
      
      // Transform the user data to match our User type
      const user = {
        ...userData,
        name: userData.name || userData.email,
        type: userData.role === 1 ? 'employer' : 'jobseeker' as const,
        profile: userData.profile
      };
      
      setUser(user);
      return user;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      setUser(null);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
