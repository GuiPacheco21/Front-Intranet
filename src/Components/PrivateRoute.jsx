import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  // Verifica a presença do token no localStorage
  const isAuthenticated = localStorage.getItem('authToken');

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, renderiza o componente protegido
  return <Component />;
};

export default PrivateRoute;
