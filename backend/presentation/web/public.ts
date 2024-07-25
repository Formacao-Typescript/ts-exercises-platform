import { Hono } from '@hono/hono';
import { HTTPException } from 'jsr:@hono/hono@^4.4.6/http-exception';
import { z } from 'zod';
import { DiscordService } from '../../services/Discord.ts';
import { JSONSuccessResponse } from '../../utils/response.ts';
import { zodValidationMiddleware } from './middlewares/zodValidator.ts';
import { createToken } from './middlewares/jwt.ts';

export function publicRoutes(discordService: DiscordService) {
  const router = new Hono();

  router.get('/ping', c => {
    const start = performance.now();
    return c.json(
      JSONSuccessResponse({
        message: 'pong',
        latency: performance.now() - start,
      })
    );
  });

  // Returns the URL to redirect the user to the Discord OAuth2 page
  router.get('/auth/discord', c => {
    return c.json(
      JSONSuccessResponse({
        redirect: discordService.getAuthorizationUrl(),
      })
    );
  });

  // Receives the code from Discord OAuth2 and exchanges it for an internal application token
  router.get(
    '/auth/discord/token',
    zodValidationMiddleware(z.object({ code: z.string() }), 'query'),
    async c => {
      const { access_token } = await discordService.getAccessToken(
        c.var.validatedData.code
      );

      if (!access_token) {
        throw new HTTPException(401, {
          message: 'Token request failed',
        });
      }

      const discordUser = await discordService.getTokenUser(access_token);
      const savedUser = await discordService.saveUser(discordUser);
      const userToken = createToken(savedUser);

      return c.json(
        JSONSuccessResponse({
          user: savedUser,
          token: userToken,
        })
      );
    }
  );

  return router;
}
