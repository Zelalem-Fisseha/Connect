import React, { createContext, useContext, useState } from 'react';

export type UserType = 'jobseeker' | 'employer';

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  avatar?: string;
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