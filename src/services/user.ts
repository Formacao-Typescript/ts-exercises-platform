// export const createUser = async () => {};

import { IDiscordUser, IUser } from '@/types';
import { get } from './api';

// export const getUserById = async () => {};

export const fetchUserByDiscordId = async (
  discordId: IDiscordUser['id']
): Promise<IUser | null> => {
  try {
    const user = await get<IUser>(`users/discord/${discordId}`);
    return user;
  } catch (e) {
    return null;
  }
};
