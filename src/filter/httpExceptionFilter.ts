import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { Response } from 'express';

@Catch(TypeORMError)
class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, argumentsHost: ArgumentsHost) {
    const ctx = argumentsHost.switchToHttp();
    const response = ctx.getResponse<Response>();
    const httpStatusCode = this.getHttpStatusCode(exception);
    response.status(httpStatusCode).json({ message: exception.message });
  }

  private getHttpStatusCode(exception: TypeORMError) {
    if (exception instanceof EntityNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof Error) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}

export default HttpExceptionFilter;
