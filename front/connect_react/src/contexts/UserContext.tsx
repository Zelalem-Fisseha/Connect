import React, { createContext, useContext, useState } from 'react';
import { User as AuthUser } from '@/types/auth';

export type UserType = 'jobseeker' | 'employer';

// Extend the User type from auth with frontend specific fields
interface User extends Omit<AuthUser, 'id' | 'role'> {
  id: string; // Override to ensure string type for frontend
  name: string; // Combined first_name and last_name or company_name
  type: UserType; // Frontend specific type (jobseeker/employer)
  avatar?: string; // Frontend specific field
}

interface UserContextType {
  user: User | null;
  userType: UserType;
  setUser: (user: User | null) => void;
  setUserType: (type: UserType) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>('jobseeker');

  return (
    <UserContext.Provider value={{
      user,
      userType,
      setUser,
      setUserType,
      isAuthenticated: !!user
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};