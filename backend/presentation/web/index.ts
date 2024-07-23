import { AppConfig } from '../../config.ts';
import { connectToDatabase } from '../../data/mongoConnection.ts';
import { Hono } from '@hono/hono';
import { publicRoutes } from './public.ts';
import { userRoutes } from './users.ts';
import { logger } from '@hono/hono/logger';
import { JSONFailureResponse } from '../../utils/response.ts';
import { HTTPException } from 'jsr:@hono/hono@^4.4.6/http-exception';
import { DiscordService } from '../../services/Discord.ts';

export default async function webLayer(appConfig: AppConfig) {
  let httpServer: Deno.HttpServer | null = null;
  const app = new Hono();
  const { database, disconnect } = await connectToDatabase(appConfig);
  const discordService = new DiscordService(appConfig);

  app.use(logger());

  app.onError((err, c) => {
    appConfig.DENO_ENV === 'development' && console.error(err);

    if (err instanceof HTTPException) {
      return new Response(
        JSON.stringify(
          JSONFailureResponse({
            message: err.message,
            details: err.cause,
          })
        ),
        { status: err.status }
      );
    }

    return new Response(c.res.body, { status: c.res.status });
  });

  app.use(async (c, next) => {
    c.res.headers.set(
      'Access-Control-Allow-Origin',
      appConfig.DENO_ENV === 'development' ? '*' : appConfig.FRONTEND_URL
    );
    c.res.headers.set('Access-Control-Allow-Headers', '*');
    c.res.headers.set('Access-Control-Allow-Methods', '*');
    await next();
  });

  app.route('/public', publicRoutes(database, discordService));
  app.route('/users', userRoutes(database));

  return {
    start: () => {
      httpServer = Deno.serve({ port: appConfig.PORT }, app.fetch);
    },
    stop: () => {
      disconnect();
      httpServer?.shutdown();
    },
  };
}
