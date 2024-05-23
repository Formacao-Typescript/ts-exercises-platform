import { AppConfig } from '../../config.ts';
import { connectToDatabase } from '../../data/mongoConnection.ts';
import { Hono } from '../../deps.ts';
import { publicRoutes } from './public.ts';
import { userRoutes } from './users.ts';

export default async function webLayer(appConfig: AppConfig) {
  let httpServer: Deno.HttpServer | null = null;
  const app = new Hono();
  const database = await connectToDatabase(appConfig);

  app.use(async (c, next) => {
    c.res.headers.set(
      'Access-Control-Allow-Origin',
      appConfig.DENO_ENV === 'development' ? '*' : appConfig.FRONTEND_URL
    );
    c.res.headers.set('Access-Control-Allow-Headers', '*');
    c.res.headers.set('Access-Control-Allow-Methods', '*');
    await next();
  });

  publicRoutes(app, database);

  app.use(async (c, next) => {});
  userRoutes(app, database);

  return {
    start: () => {
      httpServer = Deno.serve(app.fetch);
    },
    stop: () => httpServer?.shutdown(),
  };
}
