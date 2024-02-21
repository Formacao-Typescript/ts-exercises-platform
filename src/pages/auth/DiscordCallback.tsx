import { useSearchParams } from '@/hooks';
import { buildUrl } from '@/utils/url';
import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const DiscordCallback: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useSearchParams('error');
  console.log(search);

  useEffect(() => {
    if (searchParams.error) {
      const url = buildUrl('/auth', {
        error: searchParams.error,
        platform: 'discord',
      });

      navigate(url);
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
