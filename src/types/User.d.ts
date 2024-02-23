export interface IDiscordUser {
  // useful
  id: '432099683519692802';
  email: 'wel.cavzod@gmail.com';
  username: 'wells.sa';
  global_name: 'Wells.SA';
  avatar: '0092f9691ff184470fff5d67107d4f6e';
  // possibly useful
  verified: true;
  mfa_enabled: true;
  locale: 'en-US';
  banner_color: '#32d3b5';
  // not sure how could be useful
  banner: 'a_c1b57fa5b8d97737092373403a2be987';
  accent_color: 3330997;
  avatar_decoration_data: null;
  discriminator: '0';
  flags: 0;
  premium_type: 2;
  public_flags: 0;
}

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
  progress: {
    journeys: Record<IJourney[id], number>;
    topics: Record<ITopic[id], number>;
    activities: IActivity[id][];
  };
}

export type IPersistedUser = Pick<IUser, 'progress', 'email', 'username'>;
