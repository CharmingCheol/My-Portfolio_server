import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { BadRequestException } from '@nestjs/common';

const multerStorage = diskStorage({
  destination: (request, file, callback) => {
    const uploadPath = 'images';
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath);
    }
    callback(null, uploadPath);
  },
  filename: (request, file, callback) => {
    file.originalname = encodeURIComponent(file.originalname);
    callback(null, `${Math.round(Math.random() * 1e9)}-${file.originalname}`);
  },
});

const multerOptions: MulterOptions = {
  storage: multerStorage,
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('지원하지 않는 이미지 형식입니다.'), false);
    }
  },
};

export default multerOptions;
