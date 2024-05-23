import { IDiscordUser, IRemoteUser } from '@/types';
import { get, post } from './api';

// export const getUserById = async () => {};

export const fetchUserByDiscordId = async (
  discordId: IDiscordUser['id']
): Promise<IRemoteUser | null> => {
  try {
    const user = await get<IRemoteUser>(`/users/discord/${discordId}`);
    return user;
  } catch (e) {
    return null;
  }
};

export const createUser = async (user: IRemoteUser): Promise<boolean> => {
  try {
    await post<IRemoteUser>('/users', JSON.stringify(user));
    return true;
  } catch (e) {
    return false;
  }
};
