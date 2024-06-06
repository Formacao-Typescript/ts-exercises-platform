// deno-lint-ignore-file
import { zod } from '../deps.ts';

export interface Serializable {
  id: string;
  toJSON(): string;
  toObject(): Record<string, unknown>;
}

export interface SerializableStatic<
  CreationSchema extends zod.ZodSchema,
  UpdateSchema = zod.ZodObject<
    {
      [k in keyof CreationSchema['_output']]: zod.ZodOptional<
        zod.ZodType<CreationSchema['_output'][k], any, any>
      >;
    },
    'strip'
  >,
  ValidationSchema extends zod.ZodSchema = zod.ZodSchema<any>,
> {
  // new (...args: any[]): any;
  creationSchema: CreationSchema;
  updateSchema: UpdateSchema;
  validatedSchema: ValidationSchema;
  collectionName: string;
  create(data: CreationSchema['_output']): Serializable;
}
