import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import TypeOrmOptions from 'model';
import WritingModule from 'module/writing.module';
import ImageModule from 'module/image.module';
import HttpExceptionFilter from 'filter/httpExceptionFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
      }),
    }),
    TypeOrmOptions,
    WritingModule,
    ImageModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
class AppModule {}

export default AppModule;
