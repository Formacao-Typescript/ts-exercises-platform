import React from 'react';
import { useLocation } from 'react-router-dom';

type UseSearchParamsReturnType = Record<string, string | undefined>;

const useSearchParams = (...params: string[]): UseSearchParamsReturnType => {
  const { search } = useLocation();

  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  return params.reduce((acc, param) => {
    const value = query.get(param);
    acc[param] = value ? decodeURI(value).replace(' ', '+') : '';
    return acc;
  }, {} as UseSearchParamsReturnType);
};

export default useSearchParams;
