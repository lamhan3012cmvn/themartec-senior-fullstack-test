import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpStatusReasons } from './http-status.constant';
import { Reflector } from '@nestjs/core';

export class ResponseFormat<T> {
  @ApiProperty()
  error: boolean;
  @ApiProperty()
  errorKey?: string;
  @ApiProperty()
  httpCode?: HttpStatus;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: T;
  @ApiProperty()
  duration?: string;
}

export class ReturnController<T> {
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: T;
  @ApiProperty()
  httpCode?: HttpStatus;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();
    const messageResponse = this.reflector.get<string>(
      'messageResponse',
      context.getHandler(),
    );
    const _status = response.statusCode;

    return next.handle().pipe(
      catchError((error) => {
        const status = error.status ?? 500;

        const response = {
          error: true,
          message: error.message ?? HttpStatusReasons[status],
          data: null,
          path: request.path,
          duration: `${Date.now() - now}ms`,
        };

        return throwError(() => new HttpException(response, status));
      }),
      map((data) => {
        const message = messageResponse;
        return {
          error: false,
          data: data,
          message: message?.[_status] ?? 'Success',
          path: request.path,
          duration: `${Date.now() - now}ms`,
        };
      }),
    );
  }
}
