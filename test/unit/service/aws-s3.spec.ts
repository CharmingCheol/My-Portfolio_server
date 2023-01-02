import { Test } from '@nestjs/testing';
import { ConsoleLogger } from '@nestjs/common';
import * as S3RequestPresigner from '@aws-sdk/s3-request-presigner';

import AWSS3Service from 'service/aws-s3';
import createFileMock from '../../fixtures/file-mock';
import { loggerMockFactory } from '../../fixtures/log-mock';

jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner');

describe('AWSS3Service', () => {
  let awsS3Service: AWSS3Service;
  let getSignedUrlMock: jest.SpyInstance<Promise<string | Error>>;
  const file = createFileMock({ mimetype: 'jpg' });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConsoleLogger],
      providers: [{ provide: ConsoleLogger, useFactory: loggerMockFactory }, AWSS3Service],
    }).compile();
    awsS3Service = moduleRef.get(AWSS3Service);
    getSignedUrlMock = jest.spyOn(S3RequestPresigner, 'getSignedUrl');
    jest.clearAllMocks();
  });

  describe('upload', () => {
    it('업로드에 성공 할 경우 url을 반환 한다', async () => {
      const url = 'url';
      getSignedUrlMock.mockResolvedValue(url);
      expect(await awsS3Service.upload(file)).toBe(url);
    });

    it('업로드 도중 문제가 발생 할 경우 에러를 반환 한다', () => {
      const error = new Error('unexcepted error');
      getSignedUrlMock.mockRejectedValue(error);
      expect(async () => await awsS3Service.upload(file)).rejects.toThrowError(error);
    });
  });
});
