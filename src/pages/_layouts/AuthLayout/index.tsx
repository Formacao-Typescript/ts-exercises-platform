import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Link to="/">
        <button type="button">return home</button>
      </Link>
      <h1>Build: {BUILD_NUMBER}</h1>
      <h1>aooo potencia</h1>
      {children}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
