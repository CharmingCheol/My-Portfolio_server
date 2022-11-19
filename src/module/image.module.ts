import { Module, ConsoleLogger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import ImageController from 'controller/image';
import AwsS3Service from 'service/aws-s3';

@Module({
  imports: [ConsoleLogger, ConfigModule],
  providers: [ConsoleLogger, AwsS3Service],
  controllers: [ImageController],
})
class ImageModule {}

export default ImageModule;
