import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const BUILD_NUMBER = import.meta.env.VITE_BUILD_NUMBER;

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="text-white w-full h-full flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg">
        <Link to="/">
          <button type="button">return home</button>
        </Link>
        <h1>Build: {BUILD_NUMBER}</h1>
        <h1>aooo potencia</h1>
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
