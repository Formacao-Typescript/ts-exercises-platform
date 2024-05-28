import { mongodb } from '../deps.ts';
import { User } from '../domain/User.ts';
import { Repository } from './BaseRepository.ts';

export class UserRepository extends Repository<User> {
  static readonly collectionName = 'users';
  constructor(db: mongodb.Database) {
    super(db, UserRepository.collectionName);
  }
}
