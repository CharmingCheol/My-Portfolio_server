import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ImageController from 'controller/image';
import AwsS3Service from 'service/aws-s3';

@Module({
  imports: [ConfigModule],
  providers: [AwsS3Service],
  controllers: [ImageController],
})
class ImageModule {}

export default ImageModule;
