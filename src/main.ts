import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use('/images', express.static(join(__dirname, '../images')));
  await app.listen(3001);
}

bootstrap();
