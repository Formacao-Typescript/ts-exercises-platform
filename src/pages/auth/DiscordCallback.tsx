import { useSearchParams } from '@/hooks';
import { useUser } from '@/store/user';
import { fetchUser } from '@/utils/discord';

import { buildUrl } from '@/utils/url';
import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const DiscordCallback: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useSearchParams('error', 'code');
  const [user, setUser] = useUser();

  const informError = (error: string) => {
    const url = buildUrl('/auth', {
      error,
      platform: 'discord',
    });

    navigate(url);
  };

  useEffect(() => {
    console.log('searchParams', searchParams);
    if (searchParams.error) {
      informError(searchParams.error); // access_denied
      return void 0;
    }

    if (searchParams.code) {
      // TODO: use code to get info
      try {
        const data = fetchUser(searchParams.code);
        console.log('dscb', data);
      } catch (error) {
        informError('unexpected_error'); // token request failed
      }
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
