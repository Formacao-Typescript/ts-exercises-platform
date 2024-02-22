import React from 'react';
import { Outlet } from 'react-router-dom';

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <h1>Build: {BUILD_NUMBER}</h1>
      <h1>aooo potencia</h1>
      {children}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
