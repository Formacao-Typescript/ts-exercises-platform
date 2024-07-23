import { AppConfig } from '../config.ts';
import { PlatformService } from './PlatformService.ts';

export class DiscordService extends PlatformService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly oauthUrl: string;
  private readonly apiBaseUrl: string;
  private readonly client: <T>(
    url: string,
    headers?: Record<string, string>,
    options?: { method: string; body?: Record<string, unknown> }
  ) => Promise<T> = async (url, headers, body) => {
    const response = await fetch(`${this.apiBaseUrl}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(headers ?? {}),
      },
      body: JSON.stringify(body),
    });

    return response.json();
  };

  constructor(config: AppConfig) {
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
}
