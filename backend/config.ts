import '@std/dotenv/load';
import { z } from 'zod';
const configSchema = z.object({
  DENO_ENV: z.enum(['development', 'production']).default('development'),
  FRONTEND_URL: z
    .string()
    .url()
    .default('https://exercicios.formacaots.com.br/'),
  PORT: z.coerce.number().min(1024).max(65535).optional().default(3000),
  MONGODB_DATABASE: z.string().default('exercise_platform'),
  MONGODB_CONNECTION_STRING: z.string().default('mongodb://localhost:27017'),
  JWT_SECRET: z.string(),
  // DISCORD_CLIENT_ID: z.string(),
  // DISCORD_API_URL: z.string().url().default(''),
  // DISCORD_OAUTH_API_URL: z.string().url(),
  // DISCORD_CLIENT_SECRET: z.string(),
});
export type AppConfig = z.infer<typeof configSchema>;

export const config: AppConfig = configSchema.parse(Deno.env.toObject());
