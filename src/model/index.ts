import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import WritingModel from './writing';

export default TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: configService.get('DB_HOST') || 'localhost',
    port: 3306,
    username: configService.get('DB_USERNAME') || 'root',
    password: configService.get('DB_PASSWORD') || 'root',
    database: configService.get('DB_DATABASE') || 'portfolio',
    entities: [WritingModel],
    synchronize: true,
    keepConnectionAlive: true,
  }),
});
