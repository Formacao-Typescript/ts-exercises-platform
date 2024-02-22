import { IUserToken } from '@/types';
const {
  VITE_DISCORD_OAUTH_API_URL: DISCORD_API_URL,
  VITE_DISCORD_OAUTH_REDIRECT_URL: REDIRECT_URL,
  VITE_DISCORD_OAUTH_CLIENT_ID: CLIENT_ID,
  VITE_DISCORD_OAUTH_CLIENT_SECRET: CLIENT_SECRET,
} = import.meta.env;

export const getToken = async (code: string): Promise<IUserToken> => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URL,
  });
  console.log(params.toString());
  const response = await fetch(DISCORD_API_URL + '/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    },
    body: params.toString(),
  });

  const data = (await response.json()) as IUserToken;
  console.log(data);
  if (!data.access_token) {
    throw new Error('Token request failed');
  }

  return data;
};

export const getUser = async (token: IUserToken) => {
  const response = await fetch(DISCORD_API_URL + '/users/@me', {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

export const getDiscordLoginUrl = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URL,
    response_type: 'code',
    scope: 'identify',
  });

  return DISCORD_API_URL + '/authorize?' + params;
};

export const fetchUser = async (code: string) => {
  const token = await getToken(code);
  const user = await getUser(token);
  return { user, token };
};
