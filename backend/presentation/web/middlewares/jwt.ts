// @deno-types="npm:@types/jsonwebtoken@^9.0.6"
import { verify } from 'jsonwebtoken';
import { Context, Next } from '@hono/hono';
import { HTTPException } from '@hono/hono/http-exception';
import { config } from '../../../config.ts';

export interface JWTPayload {
  sub: string;
  'urn:fts:user:discord_id': string;
  'urn:fts:user:email': string;
}

export type WithAuthUser = {
  Variables: {
    user: {
      id: string;
      email: string;
      discord_id: string;
    };
  };
};

export async function withJWT(c: Context<WithAuthUser>, next: Next) {
  const header = c.req.header('Authorization');
  if (!header) {
    throw new HTTPException(401, {
      message: 'No Authorization header provided',
    });
  }

  const [protocol, token] = header.split(' ');

  if (protocol !== 'Bearer') {
    throw new HTTPException(400, {
      message: 'Invalid Authorization protocol',
    });
  }

  if (!token) {
    throw new HTTPException(401, {
      message: 'No token provided',
    });
  }

  try {
    const decoded = verify(token, config.JWT_SECRET, {
      issuer: 'urn:fts:issuer:platform',
      audience: 'urn:fts:platform:user_token',
    }) as JWTPayload;

    c.set('user', {
      id: decoded.sub,
      email: decoded['urn:fts:user:email'],
      discord_id: decoded['urn:fts:user:discord_id'],
    });

    await next();
  } catch (error) {
    console.log(error);
    throw new HTTPException(403, {
      message: 'Invalid token provided',
    });
  }
}
