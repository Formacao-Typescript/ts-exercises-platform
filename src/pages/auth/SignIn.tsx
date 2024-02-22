import { getAuthorizationCodeUrl } from '@/utils/discord';
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
      <pre>
        {JSON.stringify(
          {
            discUrl: DISCORD_API_URL,
            response_type: 'code',
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URL,
            scope: 'identify',
          },
          null,
          2
        )}
      </pre>
      <button
        type="button"
        onClick={() => {
          window.location.href = getAuthorizationCodeUrl();
        }}
      >
        Discord SSO
      </button>
    </div>
  );
};

export default AuthLayout;
