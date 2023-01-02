import { BadRequestException, PipeTransform } from '@nestjs/common';

class ImageExtensionCheckerPipe implements PipeTransform {
  public transform(file: Express.Multer.File) {
    if (!file.mimetype.match(/jpg|jpeg|png/)) {
      throw new BadRequestException('지원하지 않는 이미지 확장자 입니다');
    }
    return file;
  }
}

export default ImageExtensionCheckerPipe;
