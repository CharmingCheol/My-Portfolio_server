import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';

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
};

export default multerOptions;
