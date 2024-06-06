export interface BaseErrorOptions {
  message?: string;
  code?: string;
  statusCode?: number;
  extraData?: Record<string, unknown>;
  cause?: Error;
}

export class BaseError extends Error {
  readonly cause?: Error;
  readonly code?: string;
  readonly statusCode?: number;
  readonly extraData?: Record<string, unknown>;
  stack?: string | undefined;

  constructor(options: BaseErrorOptions) {
    super(options.message ?? 'Uknown error');
    this.name = this.constructor.name;
    this.cause = options.cause;
    this.code = options.code ?? 'UNKNOWN_ERROR';
    this.statusCode = options.statusCode ?? 500;
    this.extraData = options.extraData ?? {};
    this.stack = new Error().stack;
  }
}
