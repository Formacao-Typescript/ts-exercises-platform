// @ts-ignore // FIXME: Typescript and linters need to understand that this is a Deno file
import { Hono } from 'https://deno.land/x/hono@v3.4.1/mod.ts';
import { JSONSuccessResponse, JSONFailureResponse } from './utils/response';

const app = new Hono();
// FIXME: how do I use the KV store in a module?
// const kv = await Deno.openKv();

/*
function notifySuccess(data) {
  return {
    success: true,
    data,
  };
}

function notifyFailure(message) {
  return {
    success: false,
    message,
  };
}

// Redirect root URL
app.get('/', c => c.redirect('/users'));

app.get('/users', async c => {
  const iter = await kv.list({ prefix: ['users'] });
  const users = [];
  for await (const res of iter) users.push(res);

  return c.json(notifySuccess(users));
});

app.post('/users', async c => {
  const body = await c.req.json();

  const userKv = await kv.set(['users', body.id], body);

  if (!userKv.ok) {
    return c.json(notifyFailure('failed to create user'));
  }
  if (body.discord_id) {
    const discordKv = await kv.set(['users/discord', body.discord_id], body.id);
    if (!discordKv.ok) {
      // TODO: rollback user creation above
      return c.json(notifyFailure('failed to create discord user'));
    }
  }

  return c.json(notifySuccess(body));
});

app.get('/users/:id', async c => {
  const id = c.req.param('id');
  const userKv = await kv.get(['users', id]);
  if (!userKv.value) {
    return c.json(notifyFailure('user not found'));
  }
  return c.json(notifySuccess(userKv.value));
});

app.get('/users/discord/:discord_id', async c => {
  const discordID = c.req.param('discord_id');
  const discordKv = await kv.get(['users/discord', discordID]);
  const userID = discordKv.value;

  if (!userID) {
    return c.json(notifyFailure('user not found for this discord id'));
  }
  const userKv = await kv.get(['users', userID]);

  if (!userKv.value) {
    return c.json(notifyFailure('user not found for this discord id'));
  }

  return c.json(notifySuccess(userKv.value));
});

app.delete('/users/:id', async c => {
  const id = c.req.param('id');
  await kv.delete(['users', id]);
  return c.text('');
});

Deno.serve(app.fetch);
*/
