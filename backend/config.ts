import { zod } from './deps.ts';
const configSchema = zod.object({
  DENO_ENV: zod.enum(['development', 'production']).default('development'),
  FRONTEND_URL: zod
    .string()
    .url()
    .default('https://exercicios.formacaots.com.br/'),
  PORT: zod.coerce.number().min(1024).max(65535).optional(),
  MONGODB_CONNECTION_STRING: zod.string(),
  DISCORD_CLIENT_ID: zod.string(),
  DISCORD_API_URL: zod.string().url(),
  DISCORD_OAUTH_API_URL: zod.string().url(),
  DISCORD_CLIENT_SECRET: zod.string(),
  JWT_SECRET: zod.string(),
});
export type AppConfig = zod.infer<typeof configSchema>;

export const config: AppConfig = configSchema.parse(Deno.env.toObject());
