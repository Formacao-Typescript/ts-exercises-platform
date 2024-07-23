import { Hono } from '@hono/hono';
// @deno-types="npm:@types/jsonwebtoken@^9.0.6"
import { sign } from 'jsonwebtoken';
import { HTTPException } from 'jsr:@hono/hono@^4.4.6/http-exception';
import type { Db } from 'mongodb';
import { z } from 'zod';
import type { IDiscordUser } from '../../../src/types/SignIn.ts';
import type { IUserToken } from '../../../src/types/User.ts';
import { config } from '../../config.ts';
import { DiscordService } from '../../services/Discord.ts';
import { JSONSuccessResponse } from '../../utils/response.ts';
import { User } from '../../utils/schemas/user.ts';
import { encodeBase64 } from '@std/encoding';
import { zodValidationMiddleware } from './middlewares/zodValidator.ts';

export function publicRoutes(client: Db, discordService: DiscordService) {
  const router = new Hono();
  const usersCollection = client.collection<User>('users');

  router.get('/ping', c => {
    const start = performance.now();
    return c.json(
      JSONSuccessResponse({
        message: 'pong',
        latency: performance.now() - start,
      })
    );
  });

  router.get('/auth/discord', c => {
    return c.redirect(discordService.getAuthorizationUrl());
  });

  router.get('/auth/discord/token', async c => {
    const { code } = c.req.query();
    if (!code) {
      throw new HTTPException(422, {
        message: 'Missing code',
      });
    }

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.DISCORD_OAUTH_REDIRECT_URL,
    });

    const response = await fetch(`${config.DISCORD_OAUTH_API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          encodeBase64(
            config.DISCORD_OAUTH_CLIENT_ID +
              ':' +
              config.DISCORD_OAUTH_CLIENT_SECRET
          ),
      },
      body: params.toString(),
    });

    const data = (await response.json()) as IUserToken;
    if (!data.access_token) {
      throw new HTTPException(401, {
        message: 'Token request failed',
      });
    }

    const discordUser = await fetch(`${config.DISCORD_API_URL}/users/@me`, {
      headers: {
        authorization: `${data.token_type} ${data.access_token}`,
      },
    });

    const discordUserData = (await discordUser.json()) as IDiscordUser;
  });

  router.post(
    '/login',
    // FIX: Body needs to be something that Discord returns to us when logging in
    zodValidationMiddleware(z.object({ discord_id: z.string() })),
    async c => {
      const { discord_id } = c.var.validatedBody;
      const user = await usersCollection.findOne({ discord_id });

      if (!user) {
        throw new HTTPException(401, {
          message: 'Invalid credentials',
        });
      }

      const oneDay = 60 * 60 * 24;
      const jwt = sign(
        {
          sub: user._id,
          'urn:fts:user:discord_id': user.discord_id,
          'urn:fts:user:email': user.email,
        },
        config.JWT_SECRET,
        {
          issuer: 'urn:fts:issuer:platform',
          audience: 'urn:fts:platform:user_token',
          expiresIn: oneDay,
        }
      );

      return c.json(
        JSONSuccessResponse({
          token: jwt,
          type: 'Bearer',
          createdAt: new Date(),
          expiresIn: new Date(Date.now() + oneDay * 1000),
        })
      );
    }
  );

  return router;
}
