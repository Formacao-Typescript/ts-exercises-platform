export type SupportedPlatforms = 'discord'; // | 'google' | 'github' | 'twitter';

export interface IDiscordUser {
  // useful
  id: string;
  email: string;
  username: string;
  global_name: string;
  avatar: string;
  // possibly useful
  verified: boolean;
  mfa_enabled: boolean;
  locale: string;
  banner_color: string;
  // not sure how could be useful
  banner: string;
  accent_color: number;
  avatar_decoration_data: unknown;
  discriminator: string;
  flags: number;
  premium_type: number;
  public_flags: number;
}
