// @deno-types="npm:@types/jsonwebtoken@^9.0.6"
import { sign, verify } from 'jsonwebtoken';
import { Context, Next } from '@hono/hono';
import { HTTPException } from '@hono/hono/http-exception';
import { config } from '../../../config.ts';
import { User } from '../../../utils/schemas/user.ts'
const JWT_EXPIRATION = 60 * 60 * 24; // one day

export interface IJWTPayload {
  sub: string;
  'urn:fts:user:discord_id': string;
  'urn:fts:user:email': string;
}

export const enum TokenAudiences {
  userToken = 'urn:fts:platform:user_token',
}

function buildURN(type: string, property: string) {
  return `urn:fts:${type}:${property}`;
}

export function createToken(user: User) {
  const payload = {
    sub: user._id,
    [buildURN('user', 'discord_id')]: user.discord_id,
    [buildURN('user', 'email')]: user.email,
  };

  const token = sign(payload, config.JWT_SECRET, {
    issuer: buildURN('issuer', 'platform'),
    audience: TokenAudiences.userToken,
    expiresIn: JWT_EXPIRATION,
  });

  return {
    token,
    type: 'Bearer',
    hash: crypto.subtle.digest('SHA-256', new TextEncoder().encode(token)),
    createdAt: new Date(),
    expiresIn: new Date(Date.now() + JWT_EXPIRATION * 1000),
  };
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
      issuer: buildURN('issuer', 'platform'),
      audience: buildURN('platform', TokenAudiences.userToken),
    }) as IJWTPayload;

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
