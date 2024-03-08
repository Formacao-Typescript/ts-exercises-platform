import { getAuthorizationCodeUrl } from '@/services/discord';
import React from 'react';
import { FaDiscord as DiscordIcon } from 'react-icons/fa';

const AuthLayout: React.FC = () => {
  return (
    <div>
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
