import { UserRepository } from '../data/UserRepository.ts';
import { User } from '../domain/User.ts';
import { Service } from './BaseService.ts';

export class UserService extends Service<User> {
  constructor(repository: UserRepository) {
    super(repository);
  }
}
