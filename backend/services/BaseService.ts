import { Repository } from '../data/BaseRepository.ts';

export abstract class Service<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }
}
