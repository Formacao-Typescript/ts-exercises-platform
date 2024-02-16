import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

interface Props {
  isLoading: boolean;
  skeleton: () => React.ReactNode;
  children: React.ReactNode;
}
const LoadSkeleton: React.FC<Props> = ({
  isLoading,
  skeleton: Skeleton,
  children,
}) => {
  const [internalLoading, setInternalLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setInternalLoading(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, []);

  if (internalLoading) return <Skeleton />;

  return <>{children}</>;
};

export default LoadSkeleton;
