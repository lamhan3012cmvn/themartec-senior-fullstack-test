import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpStatusReasons } from './http-status.constant';

export class ErrorBadRequest extends HttpException {
  constructor(
    message = HttpStatusReasons[HttpStatus.BAD_REQUEST],
    status = HttpStatus.BAD_REQUEST,
  ) {
    super(message, status);
  }
}

export class ErrorForbidden extends HttpException {
  constructor(
    message = HttpStatusReasons[HttpStatus.FORBIDDEN],
    status = HttpStatus.FORBIDDEN,
  ) {
    super(message, status);
  }
}

export class ErrorInternalServer extends HttpException {
  constructor(
    message = HttpStatusReasons[HttpStatus.INTERNAL_SERVER_ERROR],
    status = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status);
  }
}
