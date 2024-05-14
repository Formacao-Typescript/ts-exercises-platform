import Overlay from '@/components/Overlay';
import cn from 'classnames';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaDiscord as DiscordIcon } from 'react-icons/fa';
import { getAuthorizationCodeUrl } from '@/services/discord';

// import { Container } from './styles';
const UserWidget: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="container relative">
      <div
        className="flex rounded-3xl bg-gray-700 cursor-pointer hover:scale-105 transition-all duration-200"
        onClick={() => setIsDropdownOpen(true)}
      >
        <div className="flex items-center pr-2 pl-4 text-gray-300">
          <span className="text-sm overflow-ellipsis overflow-hidden whitespace-nowrap max-w-24">
            Minha conta
          </span>
        </div>
        <div className="w-11 h-11 rounded-full bg-gray-500">
          <div className="placeholder h-full flex justify-center items-center">
            <FaUser className="text-gray-200 text-xl" />
          </div>
        </div>
      </div>
      <Overlay
        open={isDropdownOpen}
        className={cn(
          'absolute top-[52px] left-[-24px] z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700',
          isDropdownOpen ? 'block' : 'hidden'
        )}
        onBackdropClick={() => setIsDropdownOpen(false)}
        inactivityLimit={1000}
        onInactive={() => setIsDropdownOpen(false)}
      >
        <ul className="py-2" aria-labelledby="dropdownButton">
          <li>
            <Link
              to="/auth"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Criar conta
            </Link>
          </li>
          <li className="text-center">
            <button
              type="button"
              className="text-white bg-[#5F69F3] hover:bg-[#5F69F3]/90 focus:ring-4 focus:outline-none focus:ring-[#5F69F3]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#5F69F3]/55"
              onClick={() => {
                window.location.href = getAuthorizationCodeUrl();
              }}
            >
              <DiscordIcon className="w-4 h-4 me-2" />
              Login com Discord
            </button>
          </li>
        </ul>
      </Overlay>
    </div>
  );
};

export default UserWidget;
