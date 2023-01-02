import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors, ConsoleLogger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Express } from 'express';

import { ImageUploadResponseDto } from 'dto/image';
import FileNullValiationPipe from 'pipe/file-null-validation.pipe';
import ImageExtensionCheckerPipe from 'pipe/image-extension-checker.pipe';
import AwsS3Service from 'service/aws-s3';

@Controller('images')
@ApiTags('Images API')
class ImageController {
  constructor(private logger: ConsoleLogger, private awsS3Service: AwsS3Service) {
    this.logger.setContext('ImageController');
  }

  @Post('writings/contents')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('writing'))
  @ApiOperation({ summary: '게시글 이미지 업로드' })
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponseDto })
  public async uploadWritingContentImage(
    @UploadedFile(new FileNullValiationPipe(), new ImageExtensionCheckerPipe()) file: Express.Multer.File,
  ) {
    this.logger.log(`POST /images/writings/contents - ${file}`);
    return { path: await this.awsS3Service.upload(file) };
  }
}

export default ImageController;
