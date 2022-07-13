import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ImageController from 'controller/image';
import ImageService from 'service/image';

@Module({
  imports: [ConfigModule],
  providers: [ImageService],
  controllers: [ImageController],
})
class ImageModule {}

export default ImageModule;
