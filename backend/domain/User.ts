import { zod } from '../deps.ts';
import { Serializable } from './types.ts';

const userSchema = zod.object({
  id: zod.string().uuid().optional(),
  email: zod.string().email(),
  username: zod.string(),
  globalName: zod.string(),
  avatar: zod
    .object({
      kind: zod.literal('discord'),
      value: zod.string(),
    })
    .optional(),
  discordId: zod.string().optional(),
  progressRaw: zod.string().array(),
});
const userUpdateSchema = userSchema.partial();

type InternalUserSchema = User & zod.infer<typeof User.validatedSchema>;

export class User implements Serializable {
  static creationSchema = userSchema;
  static updateSchema = userUpdateSchema;
  static validatedSchema = User.creationSchema.extend({
    id: User.creationSchema.shape.id.default(crypto.randomUUID()),
  });

  private constructor(data: unknown) {
    Object.assign(this, data);
  }
  toJSON(this: InternalUserSchema): string {
    return JSON.stringify({
      id: this.id,
      email: this.email,
      avatar: this.avatar,
      username: this.username,
      globalName: this.globalName,
      discordId: this.discordId,
      progressRaw: this.progressRaw,
    });
  }

  static create(data: zod.infer<typeof userSchema>): InternalUserSchema {
    return new User(User.validatedSchema.parse(data)) as User &
      zod.infer<typeof User.validatedSchema>;
  }
}
