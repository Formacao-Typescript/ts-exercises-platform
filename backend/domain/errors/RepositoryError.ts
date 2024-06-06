import { BaseError, BaseErrorOptions } from './BaseError.ts';

export class RepositoryError extends BaseError {
  constructor(options: BaseErrorOptions) {
    super({
      ...options,
      message: `Repository error: ${options.message ?? 'Unknown error'}`,
      code: options.code ?? 'REPOSITORY_ERROR',
      statusCode: 500,
    });

    this.name = this.constructor.name;
  }
}
