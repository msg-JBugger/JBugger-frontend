import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginCheck } from './LoginCheck';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!LoginCheck()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
