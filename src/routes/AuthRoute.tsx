import React from 'react';

import { AuthLayout } from '../pages/_layouts';

interface Props {
  fallback?: string;
  children: React.ReactNode;
}

const AuthRoute: React.FC<Props> = ({ children }: Props) => {
  return <AuthLayout>{children}</AuthLayout>;
};

AuthRoute.defaultProps = {
  fallback: '/',
};

export default AuthRoute;
