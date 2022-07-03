import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import WritingController from 'controller/writing';
import WritingService from 'service/writing';
import { typeOrmOptions } from 'model';
import WritingModule from 'module/writing.module';
import HttpExceptionFilter from 'utils/httpExceptionFilter';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmOptions), WritingModule],
  controllers: [WritingController],
  providers: [
    WritingService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
class AppModule {}

export default AppModule;
