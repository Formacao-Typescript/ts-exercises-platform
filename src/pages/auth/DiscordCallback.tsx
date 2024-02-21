import { useSearchParams } from '@/hooks';
import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const DiscordCallback: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useSearchParams('error');
  console.log(search);

  useEffect(() => {
    if (searchParams.error) {
      const params = new URLSearchParams({
        error: searchParams.error,
        platform: 'discord',
      });
      navigate(`/auth?${params}`);
    }

    if (searchParams.code) {
      // TODO: use code to get info
    }
  }, [searchParams]);

  return (
    <div>
      <h1>callback maroto</h1>
      <pre>{search && JSON.stringify(search, null, 2)}</pre>
    </div>
  );
};

export default DiscordCallback;
