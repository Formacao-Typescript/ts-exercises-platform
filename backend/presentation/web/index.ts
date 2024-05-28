import { AppConfig } from '../../config.ts';
import { UserRepository } from '../../data/UserRepository.ts';
import { connectToDatabase } from '../../data/mongoConnection.ts';
import { Hono } from '../../deps.ts';
import { UserService } from '../../services/UserService.ts';
import { userRoutes } from './users.ts';

export async function initDependencies(config: AppConfig) {
  const connection = await connectToDatabase(config);
  const platformDatabase = connection.database('platform');
  const repositories = {
    userRepository: new UserRepository(platformDatabase),
  };

  const services = {
    userService: new UserService(repositories.userRepository),
  };

  return {
    repositories,
    services,
  } as const;
}

export default async function webLayer(appConfig: AppConfig) {
  let httpServer: Deno.HttpServer | null = null;
  const { services } = await initDependencies(appConfig);

  const app = new Hono();

  app.use(async (c, next) => {
    c.res.headers.set(
      'Access-Control-Allow-Origin',
      appConfig.DENO_ENV === 'development' ? '*' : appConfig.FRONTEND_URL
    );
    c.res.headers.set('Access-Control-Allow-Headers', '*');
    c.res.headers.set('Access-Control-Allow-Methods', '*');
    await next();
  });

  // publicRoutes(app, connection);

  // JWT
  app.use(async (c, next) => {});
  userRoutes(app, services.userService);

  return {
    start: () => {
      httpServer = Deno.serve(app.fetch);
    },
    stop: () => httpServer?.shutdown(),
  };
}
