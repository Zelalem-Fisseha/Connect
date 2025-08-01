import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  profile?: {
    id: number;
    company_name: string;
    company_description: string;
    location: string;
    industry: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load user on initial render
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const userData = await authService.getCurrentUser();
      if (userData) {
        // Ensure profile data is properly structured
        const user = {
          ...userData,
          profile: userData.profile || null
        };
        setUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error('Failed to load user', error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await authService.login(email, password);
      const user = userData.user || userData; // Handle both response formats
      
      // Ensure profile data is properly structured
      const userWithProfile = {
        ...user,
        profile: user.profile || null
      };
      
      setUser(userWithProfile);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name || 'User'}!`,
      });
      
      // Navigate based on role
      const targetPath = user.role === 'employer' ? '/employer/dashboard' : '/jobseeker/dashboard';
      navigate(targetPath);
      
      return userWithProfile;
    } catch (error: any) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      await authService.register(userData);
      toast({
        title: 'Registration successful',
        description: 'Your account has been created. Please log in.',
      });
      navigate('/signin');
    } catch (error: any) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
