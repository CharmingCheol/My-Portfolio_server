import { BadRequestException, PipeTransform } from '@nestjs/common';

class PageUnderZeroPipe implements PipeTransform {
  transform(page: number) {
    if (page < 1) {
      throw new BadRequestException('page는 1보다 큰 숫자여야 합니다.');
    }
    return page;
  }
}

export default PageUnderZeroPipe;
