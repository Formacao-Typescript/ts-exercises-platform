import { encodeBase64 } from '@std/encoding';
import { Collection, Db } from 'mongodb';
import type { IDiscordUser } from '../../src/types/SignIn.ts';
import type { IUserToken } from '../../src/types/User.ts';
import { AppConfig } from '../config.ts';
import { User, UserCreateParams } from '../utils/schemas/user.ts';
import { PlatformService } from './PlatformService.ts';

export class DiscordService extends PlatformService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly oauthUrl: string;
  private readonly apiBaseUrl: string;

  constructor(
    config: AppConfig,
    private readonly database: Db
  ) {
    super();

    this.apiBaseUrl = config.DISCORD_API_URL;
    this.clientId = config.DISCORD_OAUTH_CLIENT_ID;
    this.clientSecret = config.DISCORD_OAUTH_CLIENT_SECRET;
    this.redirectUrl = config.DISCORD_OAUTH_REDIRECT_URL;
    this.oauthUrl = config.DISCORD_OAUTH_API_URL;
  }

  getAuthorizationUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUrl,
      scope: 'identify email guilds.join',
    }).toString();

    return `${this.oauthUrl}/authorize?${params}`;
  }

  async getAccessToken(code: string): Promise<IUserToken> {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUrl,
    });

    const response = await fetch(`${this.oauthUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + encodeBase64(`${this.clientId}:${this.clientSecret}`),
      },
      body: params.toString(),
    });

    return await response.json();
  }

  async getTokenUser(token: string): Promise<IDiscordUser> {
    const response = await fetch(`${this.apiBaseUrl}/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }

  async saveUser(user: IDiscordUser) {
    const usersCollection = this.database.collection<User>('users');

    const existingUser = await usersCollection.findOne({ discord_id: user.id });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await (
      usersCollection as unknown as Collection<UserCreateParams>
    ).insertOne({
      email: user.email,
      username: user.username,
      global_name: user.global_name,
      avatar: {
        kind: 'discord',
        value: user.avatar,
      },
      discord_id: user.id,
    });

    return (await usersCollection.findOne({ _id: newUser.insertedId })) as User;
  }
}
