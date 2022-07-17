import { BadRequestException, PipeTransform } from '@nestjs/common';

class BodyLengthValidationPipe implements PipeTransform {
  transform(body: object) {
    const keys = Object.keys(body);
    if (keys.length === 0) {
      throw new BadRequestException('Body should not be empty');
    }
    return body;
  }
}

export default BodyLengthValidationPipe;
