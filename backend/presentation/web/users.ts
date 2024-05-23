import { Hono, mongodb } from '../../deps.ts';
import {
  JSONSuccessResponse,
  JSONFailureResponse,
} from '../../utils/response.ts';

export function userRoutes(app: Hono, dbClient: mongodb.MongoClient) {
  const discordDB = dbClient.database('discord');
  const usersCollection = discordDB.collection('students');
  const platformDB = dbClient.database('exercises-platform');

  // Redirect root URL
  app.get('/', c => c.redirect('/users'));

  app.get('/users', async c => {
    const users = await usersCollection
      .find({
        hasJoinedExercisePlatform: true,
      })
      .toArray();

    return c.json(JSONSuccessResponse(users));
  });

  app.post('/users', async c => {
    const body = await c.req.json();

    const userKv = await kv.set(['users', body.id], body);

    if (!userKv.ok) {
      return c.json(JSONFailureResponse('failed to create user'));
    }
    if (body.discord_id) {
      const discordKv = await kv.set(
        ['users', 'discord', body.discord_id],
        body.id
      );
      if (!discordKv.ok) {
        // TODO: rollback user creation above
        return c.json(JSONFailureResponse('failed to create discord user'));
      }
    }

    return c.json(JSONSuccessResponse(body));
  });

  app.get('/users/:id', async c => {
    const id = c.req.param('id');
    const userKv = await kv.get(['users', id]);
    if (!userKv.value) {
      return c.json(JSONFailureResponse('user not found'));
    }
    return c.json(JSONSuccessResponse(userKv.value));
  });

  app.get('/users/discord/:discord_id', async c => {
    const discordID = c.req.param('discord_id');
    const userID = await kv.get<string>([
      'users',
      'discord',
      discordID,
      'userID',
    ]);

    if (!userID.value) {
      return c.json(JSONFailureResponse('user not found for this discord id'));
    }

    const userKv = await kv.get(['users', userID.value]);

    if (!userKv.value) {
      return c.json(JSONFailureResponse('user not found for this discord id'));
    }

    return c.json(JSONSuccessResponse(userKv.value));
  });

  app.delete('/users/:id', async c => {
    const id = c.req.param('id');
    await kv.delete(['users', id]);
    return c.text('');
  });

  return app;
}
