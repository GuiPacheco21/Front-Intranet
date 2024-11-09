import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default PrivateRoute;
