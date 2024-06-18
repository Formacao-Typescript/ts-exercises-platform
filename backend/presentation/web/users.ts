import { Hono } from '@hono/hono';
import { Db } from 'mongodb';
import {
  JSONSuccessResponse,
  JSONFailureResponse,
} from '../../utils/response.ts';
import { UserCreateSchema } from '../../utils/schemas/user.ts';
import { zodValidationMiddleware } from './middlewares/zodValidator.ts';
import { HTTPException } from 'jsr:@hono/hono@^4.4.6/http-exception';

export function userRoutes(app: Hono, dbClient: Db) {
  const usersCollection = dbClient.collection('users');

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

  app.post('/users', zodValidationMiddleware(UserCreateSchema), async c => {
    const { validatedBody: body } = c.var;
    const existingUser = await usersCollection.findOne({
      $or: [{ email: body.email }, { discord_id: body.discord_id }],
    });
    if (existingUser) {
      throw new HTTPException(409, {
        message: 'User already exists',
      });
    }
    const user = await usersCollection.insertOne({ ...body });
    if (!user.insertedId) {
      throw new HTTPException(500, {
        message: 'Failed to create user',
        cause: { ack: user.acknowledged, insertedId: user.insertedId },
      });
    }

    c.status(201);
    return c.json(JSONSuccessResponse({ ...body, _id: user.insertedId }));
  });

  //   return c.json(JSONSuccessResponse(body));
  // });

  // app.get('/users/:id', async c => {
  //   const id = c.req.param('id');
  //   const userKv = await kv.get(['users', id]);
  //   if (!userKv.value) {
  //     return c.json(JSONFailureResponse('user not found'));
  //   }
  //   return c.json(JSONSuccessResponse(userKv.value));
  // });

  // app.get('/users/discord/:discord_id', async c => {
  //   const discordID = c.req.param('discord_id');
  //   const userID = await kv.get<string>([
  //     'users',
  //     'discord',
  //     discordID,
  //     'userID',
  //   ]);

  //   if (!userID.value) {
  //     return c.json(JSONFailureResponse('user not found for this discord id'));
  //   }

  //   const userKv = await kv.get(['users', userID.value]);

  //   if (!userKv.value) {
  //     return c.json(JSONFailureResponse('user not found for this discord id'));
  //   }

  //   return c.json(JSONSuccessResponse(userKv.value));
  // });

  // app.delete('/users/:id', async c => {
  //   const id = c.req.param('id');
  //   await kv.delete(['users', id]);
  //   return c.text('');
  // });

  // return app;
}
