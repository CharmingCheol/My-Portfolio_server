import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import ImageService from 'service/image';
import multerStorage from 'utils/multerStorage';

@Controller('images')
class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('writing')
  @UseInterceptors(FileInterceptor('writing', { storage: multerStorage }))
  uploadWritingImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImage(file.filename);
  }
}

export default ImageController;
