// deno-lint-ignore-file
import { zod } from '../deps.ts';

export interface Serializable {
  toJSON(): string;
}

export interface SerializableStatic<
  C extends zod.ZodSchema,
  U extends zod.ZodOptional<any> = zod.ZodOptional<C>,
  V extends zod.ZodSchema = zod.ZodSchema<C['_output'] & { id: zod.ZodString }>,
> {
  new (...args: any[]): any;
  creationSchema: C;
  updateSchema: U;
  validatedSchema: V;
  collectionName: string;
  create(data: C['_output']): Serializable;
}
