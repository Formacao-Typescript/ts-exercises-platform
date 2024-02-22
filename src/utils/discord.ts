import { IUserToken } from '@/types';
const {
  VITE_DISCORD_API_URL: DISCORD_API_URL,
  VITE_DISCORD_OAUTH_API_URL: DISCORD_OAUTH_API_URL,
  VITE_DISCORD_OAUTH_REDIRECT_URL: REDIRECT_URL,
  VITE_DISCORD_OAUTH_CLIENT_ID: CLIENT_ID,
  VITE_DISCORD_OAUTH_CLIENT_SECRET: CLIENT_SECRET,
} = import.meta.env;

/**
 * Generates the URL to redirect the user to for Discord OAuth
 * @returns {url: string} - The URL to redirect the user to
 */
export const getAuthorizationCodeUrl = (): string => {
  const BASE_URL = DISCORD_OAUTH_API_URL;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URL,
    scope: 'identify email',
  });

  return `${BASE_URL}/authorize?${params}`;
};

/**
 * Exchanges the code received from the Discord OAuth redirect for a user token
 * @param code {string} - The code received from the Discord OAuth redirect
 * @returns {Promise<IUserToken>} - The user token
 */
export const getToken = async (code: string): Promise<IUserToken> => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URL,
  });
  console.log(params.toString());
  const response = await fetch(DISCORD_OAUTH_API_URL + '/token', {
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

/**
 * Fetches the user data from Discord
 * @param token {IUserToken} - The user token
 * @returns {Promise<any>} - The user data
 */
export const getUser = async (token: IUserToken): Promise<any> => {
  const response = await fetch(DISCORD_API_URL + '/users/@me', {
    headers: {
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};

/**
 * Fetches the user data from Discord
 * @param code {string} - The code received from the Discord OAuth redirect
 * @returns {Promise<{ user: any; token: IUserToken }>} - The user data and token
 * @throws {Error} - If the token request fails
 * @throws {Error} - If the user request fails
 * @throws {Error} - If the token or user data is missing
 */
export const fetchUser = async (
  code: string
): Promise<{ user: any; token: IUserToken }> => {
  const token = await getToken(code);
  const user = await getUser(token);
  return { user, token };
};
