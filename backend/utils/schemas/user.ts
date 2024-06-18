import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().ulid(),
  email: z.string().email(),
  username: z.string(),
  global_name: z.string(),
  avatar: z
    .object({
      kind: z.literal('discord'),
      value: z.string(),
    })
    .optional(),
  discord_id: z.string().optional(),
  token: z
    .object({
      token_type: z.string(),
      access_token: z.string(),
      expires_in: z.number(),
      refresh_token: z.string(),
      scope: z.string(),
    })
    .optional(),
  progress_raw: z.array(z.string()),
  progress: z.object({
    journeys: z.record(z.number()),
    topics: z.record(z.number()),
    activities: z.array(z.string()),
  }),
});

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({
  id: true,
  token: true,
  progress_raw: true,
  progress: true,
});

export type UserCreateParams = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserSchema.omit({
  id: true,
  token: true,
}).partial();
