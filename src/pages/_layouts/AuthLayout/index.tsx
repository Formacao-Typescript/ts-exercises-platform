import React from 'react';
import { Outlet } from 'react-router-dom';

// import { Container } from './styles';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <h1>aooo potencia</h1>
      <button
        type="button"
        onClick={() => {
          const BASE_URL = 'https://discord.com/api/oauth2';
          const params = new URLSearchParams({
            response_type: 'code',
            client_id: import.meta.env.VITE_DISCORD_OAUTH_CLIENT_ID,
            redirect_uri:
              import.meta.env.VITE_APP_URL + '/auth/discord/callback',
            scope: 'identify',
          });

          const url = `${BASE_URL}/authorize?${params}`;
          window.location.href = url;
        }}
      >
        Discord SSO
      </button>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
