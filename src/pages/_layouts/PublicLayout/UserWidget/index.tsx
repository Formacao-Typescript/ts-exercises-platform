import React from 'react';
import { FaUser } from 'react-icons/fa';

// import { Container } from './styles';
const UserWidget: React.FC = () => {
  return (
    <div className="flex rounded-3xl bg-gray-700 cursor-pointer hover:scale-105 transition-all duration-200">
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
  );
};

export default UserWidget;
