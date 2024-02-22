import React from 'react';

const {
  VITE_DISCORD_OAUTH_API_URL: DISCORD_API_URL,
  VITE_DISCORD_OAUTH_REDIRECT_URL: REDIRECT_URL,
  VITE_DISCORD_OAUTH_CLIENT_ID: CLIENT_ID,
  // VITE_DISCORD_OAUTH_CLIENT_SECRET: CLIENT_SECRET,
} = import.meta.env;

const AuthLayout: React.FC = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          const BASE_URL = DISCORD_API_URL;
          const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URL,
            scope: 'identify',
          });

          const url = `${BASE_URL}/authorize?${params}`;
          window.location.href = url;
        }}
      >
        Discord SSO
      </button>
    </div>
  );
};

export default AuthLayout;
