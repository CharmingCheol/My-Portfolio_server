import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Express } from 'express';

import { ImageUploadResponseDto } from 'dto/image';
import FileNullValiationPipe from 'pipe/file-null-validation.pipe';
import ImageExtensionCheckerPipe from 'pipe/image-extension-checker.pipe';
import ImageService from 'service/image';

@Controller('images')
@ApiTags('Images API')
class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('writings/contents')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('writing'))
  @ApiOperation({ summary: '게시글 이미지 업로드' })
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponseDto })
  uploadWritingContentImage(
    @UploadedFile(new FileNullValiationPipe(), new ImageExtensionCheckerPipe()) file: Express.Multer.File,
  ) {
    return { path: this.imageService.createImageURL(file) };
  }
}

export default ImageController;
