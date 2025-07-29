import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Components
import ErrorMessage from '../ui/ErrorMessage';

const isTokenExpired = (token) => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < now;
  } catch (err) {
    console.error("Token inválido ou mal formatado.", err);
    return true;
  }
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role')?.toLowerCase()?.trim();
  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <ErrorMessage message="Acesso negado. Você não tem permissão para acessar esta página." />;
  }

  return children;
};

export default PrivateRoute;
