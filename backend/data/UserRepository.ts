import { mongodb } from '../deps.ts';
import { User } from '../domain/User.ts';
import { Repository } from './BaseRepository.ts';

export class UserRepository extends Repository<
  typeof User.creationSchema,
  typeof User
> {
  constructor(db: mongodb.Database, entity: typeof User) {
    super(db, entity);
  }
}
