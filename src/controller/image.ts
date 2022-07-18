import { Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import FileNullValiationPipe from 'pipe/file-null-validation.pipe';
import ImageService from 'service/image';
import multerOptions from 'utils/multerStorage';

@Controller('images')
class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('writing')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('writing', multerOptions))
  uploadWritingImage(@UploadedFile(new FileNullValiationPipe()) file: Express.Multer.File) {
    return { path: this.imageService.createImageURL(file.filename) };
  }
}

export default ImageController;
