import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { Express } from 'express';
import { diskStorage } from 'multer';
import ImageService from 'service/image';

const multerStorage = diskStorage({
  destination: (request, file, callback) => {
    const uploadPath = 'images';
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }
    callback(null, uploadPath);
  },
  filename: (request, file, callback) => {
    callback(null, `${Math.round(Math.random() * 1e9)}-${file.originalname}`);
  },
});

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
