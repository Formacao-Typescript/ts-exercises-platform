import React from 'react';
import { useLocation } from 'react-router-dom';

const useSearchParams = (...params: string[]) => {
  const location = useLocation();

  const query = React.useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  return params.reduce(
    (acc, param) => {
      const value = query.get(param);
      acc[param] = value ? decodeURI(value).replace(/\s+/g, '+') : '';
      return acc;
    },
    {} as Record<string, string>
  );
};

export default useSearchParams;
