import { NestFactory } from '@nestjs/core';
import swaggerSetup from 'utils/swaggerSetup';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: ['http://localhost:3000', 'https://www.charmingcheol.com'] },
  });
  app.setGlobalPrefix('api');
  swaggerSetup(app);
  await app.listen(3001);
}

bootstrap();
