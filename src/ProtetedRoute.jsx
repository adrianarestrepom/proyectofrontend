import React from 'react';
import { useAuth } from './hooks/useAuth.js';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;