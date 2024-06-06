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

export type UserCreationType = zod.infer<typeof User.creationSchema>;
export type UserUpdateType = zod.infer<typeof User.updateSchema>;
export type UserInstanceType = zod.infer<typeof User.validatedSchema>;

export type UserObjectType = zod.infer<typeof User.creationSchema>;

// schema with required ID mostly used as thisType in the functions
// so we can access `this` in the class methods
type UserThisType = User & UserInstanceType;

export class User implements Serializable {
  static creationSchema = userSchema;
  static updateSchema = userSchema.partial();
  static validatedSchema = User.creationSchema.extend({
    id: User.creationSchema.shape.id.default(crypto.randomUUID()),
  });
  static collectionName = 'users';

  id: string = '';
  private constructor(data: unknown) {
    Object.assign(this, data);
  }

  toJSON(this: UserThisType): string {
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

  toObject(this: UserThisType): UserInstanceType {
    return {
      id: this.id,
      email: this.email,
      avatar: this.avatar,
      username: this.username,
      globalName: this.globalName,
      discordId: this.discordId,
      progressRaw: this.progressRaw,
    } as const;
  }

  static create(data: UserCreationType): UserThisType {
    return new User(User.validatedSchema.parse(data)) as User &
      UserInstanceType;
  }
}
