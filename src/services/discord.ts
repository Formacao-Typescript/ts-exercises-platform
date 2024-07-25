import { IUser, IUserToken } from '@/types';
import { get } from './api';

/**
 * Generates the URL to redirect the user to for Discord OAuth
 * @returns {url: string} - The URL to redirect the user to
 */
export const getAuthorizationCodeUrl = async (): Promise<string> => {
  const [error, response] = await get<{ redirect: string }>(
    '/public/auth/discord'
  );
  if (error) throw new Error(error);

  return response!.redirect;
};

/**
 * Fetches the user data from Discord
 * @param code {string} - The code received from the Discord OAuth redirect
 * @returns {Promise<{ user: any; token: IUserToken }>} - The user data and token
 * @throws {Error} - If the token request fails
 * @throws {Error} - If the user request fails
 * @throws {Error} - If the token or user data is missing
 */
export const fetchUser = async (code: string): Promise<IUser> => {
  const params = new URLSearchParams({
    code: code,
  });

  const url = '/public/auth/discord/token?' + params.toString();

  const [error, response] = await get<{ user: IUser; token: IUserToken }>(url);

  if (error) throw new Error(error);

  response!.user.token = response!.token;

  return response!.user;
};
