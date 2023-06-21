import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DefaultInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();
    const requestId = randomUUID();
    console.log(requestId, request.method, request.path);
    return next.handle().pipe(
      tap({
        complete: () => {
          const response = httpCtx.getResponse<Response>();
          console.log(requestId, response.statusCode);
        },
      }),
    );
  }
}
