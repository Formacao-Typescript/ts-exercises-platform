import { ZodSchema, ZodError } from 'zod';
import { Context, Next } from '@hono/hono';
import { HTTPException } from '@hono/hono/http-exception';

export function zodValidationMiddleware<T extends ZodSchema>(
  schema: T,
  key: 'body' | 'query' = 'body',
  allowEmpty = false
) {
  return async (
    c: Context<{
      Variables: { validatedData: Awaited<ReturnType<T['parseAsync']>> };
    }>,
    next: Next
  ) => {
    try {
      let dataToValidate: Record<string, unknown> = {};
      switch (key) {
        case 'body': {
          dataToValidate = await c.req.json();
          break;
        }
        case 'query':
          dataToValidate = c.req.query();
          break;
      }

      if (!Object.keys(dataToValidate) && !allowEmpty) {
        throw new HTTPException(422, {
          message: 'Body cannot be empty.',
        });
      }

      const validatedData = await schema.parseAsync(dataToValidate);
      c.set('validatedData', validatedData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HTTPException(422, {
          message: 'Validation error',
          cause: error.issues,
        });
      }

      if (error instanceof SyntaxError) {
        throw new HTTPException(400, { message: 'Invalid JSON', cause: error });
      }

      throw new HTTPException(500, { message: 'Internal server error' });
    }

    await next();
  };
}
