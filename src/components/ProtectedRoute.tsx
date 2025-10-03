import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const FullPageSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gray-50">
    <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-purple-600 border-t-transparent"></div>
  </div>
);

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <FullPageSpinner />;
  }

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;