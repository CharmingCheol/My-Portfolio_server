import { BadRequestException } from '@nestjs/common';
import BodyLengthValidationPipe from 'pipe/bodyLengthValidationPipe';

describe('BodyLengthValidationPipe', () => {
  it('Body 객체의 길이가 0인 경우 BadRequestException를 반환 한다', () => {
    const exception = new BadRequestException('Body should not be empty');
    const pipe = new BodyLengthValidationPipe();
    expect(() => pipe.transform({})).toThrow(exception);
  });

  it('Body 객체의 길이가 1 이상인 경우 Body 객체를 그대로 반환 한다', () => {
    const body = { body: 'body' };
    const pipe = new BodyLengthValidationPipe();
    expect(pipe.transform(body)).toStrictEqual(body);
  });
});
