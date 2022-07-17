import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class ImageService {
  constructor(private configService: ConfigService) {}

  createImageURL(filename: string) {
    const env = this.configService.get<'dev' | 'prod'>('NODE_ENV');
    if (env === 'dev') {
      return `http://localhost:3001/images/${filename}`;
    }
  }
}

export default ImageService;
