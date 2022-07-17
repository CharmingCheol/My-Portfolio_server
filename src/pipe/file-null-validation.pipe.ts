import { BadRequestException, PipeTransform } from '@nestjs/common';

class FileNullValidationPipe implements PipeTransform {
  // front 쪽에서 file을 전달하지 않을 경우 null
  transform(file: Express.Multer.File | null) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    return file;
  }
}

export default FileNullValidationPipe;
