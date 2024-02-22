import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <h1>aooo potencia</h1>
      {children}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
