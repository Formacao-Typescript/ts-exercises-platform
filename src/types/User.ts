import { IActivity, IJourney, ITopic } from './Exercises';

export interface IUserToken {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface IUserAvatar {
  kind: 'discord';
  value: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  global_name: string;
  avatar?: IUserAvatar;
  discord_id?: string;
  // google_id?: string;
  token?: IUserToken;
  progress_raw: string[];
  progress: {
    journeys: Record<IJourney['id'], number>;
    topics: Record<ITopic['id'], number>;
    activities: IActivity['id'][];
  };
}

export type IRemoteUser = IUser & { token?: never; progress: never };
