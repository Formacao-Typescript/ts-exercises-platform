import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const mediaQuery = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mediaQuery]);

  return matches;
};

export default useMediaQuery;
