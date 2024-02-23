import React from 'react';

const useSearchParams = (...params: string[]) => {
  const search = window.location.search;

  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  return params.reduce(
    (acc, param) => {
      const value = query.get(param);
      acc[param] = value ? decodeURI(value).replace(' ', '+') : '';
      return acc;
    },
    {} as Record<string, string>
  );
};

export default useSearchParams;
