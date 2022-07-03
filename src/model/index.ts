import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import WritingModel from './writing';

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'portfolio',
  entities: [WritingModel],
  synchronize: true,
  keepConnectionAlive: true,
};
