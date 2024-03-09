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
  id: string;
  email: string;
  username: string;
  global_name: string;
  avatar?: IUserAvatar;
  discord_id?: string;
  // google_id?: string;
  token?: IUserToken;
  rawProgress: string[];
  progress: {
    journeys: Record<IJourney[id], number>;
    topics: Record<ITopic[id], number>;
    activities: IActivity[id][];
  };
}

export type IRemoteUser = IUser & { token?: never; progress: never };
