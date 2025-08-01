import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredUserType?: 'jobseeker' | 'employer';
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredUserType }) => {
  const { isAuthenticated, userType } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = userType === 'jobseeker' ? '/jobseeker/dashboard' : '/employer/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard; 