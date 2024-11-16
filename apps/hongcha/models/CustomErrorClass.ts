export class AuthError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}

export class ValidError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ValidError';
    this.statusCode = 422;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidError);
    }
  }
}

export class MethodError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'MethodError';
    this.statusCode = 405;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MethodError);
    }
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MethodError);
    }
  }
}
