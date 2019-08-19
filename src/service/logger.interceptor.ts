import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: LoggerService = new LoggerService('API');
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();
    const { body, method, url } = req;
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `[${context.getClass().name}] ${method} ${url} ${Date.now() -
              now}ms`,
            body,
          ),
        ),
      );
  }
}
