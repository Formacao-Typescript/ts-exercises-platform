import { HTTPException } from 'jsr:@hono/hono@^4.4.6/http-exception';
import { Db } from 'mongodb';
import { JSONSuccessResponse } from '../../utils/response.ts';
import {
  User,
  UserCreateSchema,
  UserUpdateSchema,
} from '../../utils/schemas/user.ts';
import { zodValidationMiddleware } from './middlewares/zodValidator.ts';
import { WithAuthUser, withJWT } from './middlewares/jwt.ts';
import { Hono } from '@hono/hono';

export function userRoutes(dbClient: Db) {
  const router = new Hono<WithAuthUser>();
  const usersCollection = dbClient.collection('users');

  router.use(withJWT);

  /**
   * Current user routes
   */
  router.get('/me', async c => {
    const { user } = c.var;
    const fullUser = await usersCollection.findOne({ _id: user.id });
    return c.json(JSONSuccessResponse(fullUser));
  });

  router.patch('/me', zodValidationMiddleware(UserUpdateSchema), async c => {
    const { user } = c.var;
    const { validatedData: body } = c.var;
    const updatedUser = await usersCollection.updateOne(
      { _id: user.id },
      { $set: body }
    );

    if (!updatedUser.acknowledged) {
      throw new HTTPException(500, {
        message: 'Failed to update user',
        cause: { ack: updatedUser.acknowledged },
      });
    }

    return c.json(JSONSuccessResponse({ ...body, _id: user.id }));
  });

  /**
   * All users routes
   */
  // TODO: Create a new middleware to check if the user is an admin
  // FIX: Create another router for admin routes here and merge both in a single app router with two different middlewares
  // router.get('/', async c => {
  //   const users: User[] = await usersCollection.find().toArray();

  //   return c.json(JSONSuccessResponse(users));
  // });

  router.post('/', zodValidationMiddleware(UserCreateSchema), async c => {
    const { validatedData: body } = c.var;
    // Shitty workaround since if the discord doesn't exist it will be an empty string
    // and this returns all the objects
    const query = [
      { email: body.email },
      ...(body.discord_id ? [{ discord_id: body.discord_id }] : []),
    ];

    // $or is here because otherwise the type breaks
    const existingUser: User | undefined = await usersCollection.findOne({
      $or: query,
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
        cause: { ack: user.acknowledged, insertedId: null },
      });
    }

    c.status(201);
    return c.json(JSONSuccessResponse({ ...body, _id: user.insertedId }));
  });

  router.get('/:id', async c => {
    const id = c.req.param('id');
    const user: User = await usersCollection.findOne({ _id: id });
    if (!user) {
      throw new HTTPException(404, {
        message: 'User not found',
      });
    }
    return c.json(JSONSuccessResponse(user));
  });

  router.get('/discord/:discord_id', withJWT, async c => {
    const discordID = c.req.param('discord_id');
    const user: User = await usersCollection.findOne({ discord_id: discordID });

    if (!user) {
      throw new HTTPException(404, {
        message: 'User not found for this discord id',
      });
    }

    return c.json(JSONSuccessResponse(user));
  });

  router.delete('/:id', withJWT, async c => {
    const id = c.req.param('id');
    await usersCollection.deleteOne({ _id: id });
    return c.newResponse(null, 204);
  });

  return router;
}
