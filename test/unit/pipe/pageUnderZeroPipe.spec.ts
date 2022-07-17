import { BadRequestException } from '@nestjs/common';
import PageUnderZeroPipe from 'pipe/pageUnderZeroPipe';

describe('PageUnderZeroPipe', () => {
  it('page가 1보다 작을 경우 BadRequestException를 반환 한다', () => {
    const exception = new BadRequestException('page는 1보다 큰 숫자여야 합니다.');
    const zeroPage = new PageUnderZeroPipe();
    const minusPage = new PageUnderZeroPipe();
    expect(() => zeroPage.transform(0)).toThrow(exception);
    expect(() => minusPage.transform(-1)).toThrow(exception);
  });

  it('page가 1이상의 숫자인 경우 page를 그대로 반환 한다', () => {
    const onePage = new PageUnderZeroPipe();
    const tenPage = new PageUnderZeroPipe();
    expect(onePage.transform(1)).toBe(1);
    expect(tenPage.transform(10)).toBe(10);
  });
});
