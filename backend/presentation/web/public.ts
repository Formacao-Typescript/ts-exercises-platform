import { Hono } from '@hono/hono';
// @deno-types="npm:@types/jsonwebtoken@^9.0.6"
import { sign } from 'jsonwebtoken';
import { HTTPException } from 'jsr:@hono/hono@^4.4.6/http-exception';
import type { Db } from 'mongodb';
import { z } from 'zod';
import { config } from '../../config.ts';
import { JSONSuccessResponse } from '../../utils/response.ts';
import { User } from '../../utils/schemas/user.ts';
import { zodValidationMiddleware } from './middlewares/zodValidator.ts';

export function publicRoutes(client: Db) {
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
