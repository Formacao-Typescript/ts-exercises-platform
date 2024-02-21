import { useSearchParams } from '@/hooks';
import { buildUrl } from '@/utils/url';
import React, { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const {
  VITE_DISCORD_OAUTH_API_URL: DISCORD_API_URL,
  VITE_DISCORD_OAUTH_REDIRECT_URL: REDIRECT_URL,
  VITE_DISCORD_OAUTH_CLIENT_ID: CLIENT_ID,
  VITE_DISCORD_OAUTH_CLIENT_SECRET: CLIENT_SECRET,
} = import.meta.env;

const DiscordCallback: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useSearchParams('error');

  const informError = (error: string) => {
    const url = buildUrl('/auth', {
      error,
      platform: 'discord',
    });

    navigate(url);
  };

  useEffect(() => {
    if (searchParams.error) {
      informError(searchParams.error); // access_denied
      return void 0;
    }

    if (searchParams.code) {
      // TODO: use code to get info
      try {
        getToken(searchParams.code);
      } catch (error) {
        informError('unexpected_error'); // token request failed
      }
    }
  }, [searchParams]);

  const getToken = async (code: string) => {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URL,
    });

    // headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
    // r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers, auth=(CLIENT_ID, CLIENT_SECRET))
    const response = await fetch(DISCORD_API_URL + '/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
      },
      body: params.toString(),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      <h1>callback maroto</h1>
      <pre>{search && JSON.stringify(search, null, 2)}</pre>
    </div>
  );
};

export default DiscordCallback;
