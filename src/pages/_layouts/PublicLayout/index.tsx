import React from 'react';

// import { Container } from './styles';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default PublicLayout;
