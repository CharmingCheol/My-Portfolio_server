import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const swaggerSetup = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('My Portfolio API').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

export default swaggerSetup;
