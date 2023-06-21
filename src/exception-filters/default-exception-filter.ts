import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  catch(err: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status, message;
    if (err instanceof HttpException) {
      status = err.getStatus();
      message = err.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'INTERNAL_SERVER_ERROR';
      console.error(err.toString());
    }
    console.log('Response:', status, message);
    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
