import { BadRequestException } from '@nestjs/common';
import ImageExtensionCheckerPipe from 'pipe/image-extension-checker.pipe';
import createFileMock from '../../fixtures/file-mock';

describe('ImageExtensionCheckerPipe', () => {
  let pipe: ImageExtensionCheckerPipe;

  beforeEach(() => {
    pipe = new ImageExtensionCheckerPipe();
  });

  it('지원하지 않는 이미지 확장자일 경우 BadRequestException를 반환 한다', () => {
    const error = new BadRequestException('지원하지 않는 이미지 확장자 입니다');
    const file = createFileMock({ mimetype: 'txt' });
    expect(() => pipe.transform(file)).toThrowError(error);
  });

  it('알맞은 이미지 확장자 일 경우 file을 그대로 반환 한다', () => {
    const file = createFileMock({ mimetype: 'jpg' });
    expect(pipe.transform(file)).toStrictEqual(file);
  });
});
