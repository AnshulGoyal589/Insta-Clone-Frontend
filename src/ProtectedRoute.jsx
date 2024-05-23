import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Components/Authentication/AuthProvider'; // Adjust the path based on your file structure

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
 
  return children;
};

export default ProtectedRoute;
