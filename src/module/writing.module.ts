import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import WritingController from 'controller/writing';
import WritingModel from 'model/writing';
import WritingService from 'service/writing';

@Module({
  imports: [TypeOrmModule.forFeature([WritingModel])],
  providers: [WritingService],
  controllers: [WritingController],
  exports: [TypeOrmModule],
})
class WritingModule {}

export default WritingModule;
