import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ImageUploadResponseDto } from 'dto/image';
import { Express } from 'express';
import FileNullValiationPipe from 'pipe/file-null-validation.pipe';
import ImageService from 'service/image';
import multerOptions from 'utils/multerStorage';

@Controller('images')
@ApiTags('Images API')
class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('writing')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('writing', multerOptions))
  @ApiOperation({ summary: '게시글 이미지 업로드' })
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponseDto })
  uploadWritingImage(@UploadedFile(new FileNullValiationPipe()) file: Express.Multer.File) {
    return { path: this.imageService.createImageURL(file.filename) };
  }
}

export default ImageController;
