import React from 'react';

// import { Container } from './styles';
import { AiOutlineLoading3Quarters as LoadingIcon } from 'react-icons/ai';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="animate-pulse">
      <LoadingIcon className="text-4xl animate-spin text-cyan-700" />
    </div>
  );
};

export default LoadingIndicator;
