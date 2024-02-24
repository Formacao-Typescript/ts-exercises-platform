import { getAuthorizationCodeUrl } from '@/utils/discord';
import React from 'react';
import { FaDiscord as DiscordIcon } from 'react-icons/fa';

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
        className="text-white bg-[#5F69F3] hover:bg-[#5F69F3]/90 focus:ring-4 focus:outline-none focus:ring-[#5F69F3]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5F69F3]/55 me-2 mb-2"
        onClick={() => {
          window.location.href = getAuthorizationCodeUrl();
        }}
      >
        <DiscordIcon className="w-4 h-4 me-2" />
        Login com Discord
      </button>
    </div>
  );
};

export default AuthLayout;
