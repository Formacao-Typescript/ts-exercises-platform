import React from 'react';

import { PublicLayout } from '../pages/_layouts';

interface Props {
  fallback?: string;
  children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }: Props) => {
  return <PublicLayout>{children}</PublicLayout>;
};

// PublicRoute.defaultProps = {
//   fallback: '/dashboard',
// };

export default PublicRoute;
