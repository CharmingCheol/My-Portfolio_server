import { BadRequestException } from '@nestjs/common';
import FileNullValiationPipe from 'pipe/file-null-validation.pipe';

describe('file-validation.pipe', () => {
  it('file의 인자값이 없는 경우 400 HttpCode를 반환 한다', () => {
    const exception = new BadRequestException('파일이 존재하지 않습니다.');
    const pipe = new FileNullValiationPipe();
    expect(() => pipe.transform(null)).toThrow(exception);
  });
});
