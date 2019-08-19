import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '../logger/logger.service';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: LoggerService = new LoggerService('API_ERROR');
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const { url: path, method, body } = req;

    const errorResponse = {
      timestamp: new Date().toLocaleDateString(),
      path,
      method,
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? {
              error: 'Internal server error.',
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            }
          : (exception.message && {
              ...(typeof exception.message === 'string'
                ? { error: exception.message, statusCode: status }
                : exception.message),
            }) || {
              error: 'Undefined error.',
              statusCode: status,
            },
    };
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`${method} ${path}`, exception.message, body);
    } else {
      this.logger.error(`${method} ${path}`, errorResponse, body);
    }

    res.status(status).json(errorResponse);
  }
}
