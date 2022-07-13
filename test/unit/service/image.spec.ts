import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import ImageService from 'service/image';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const configServiceMock = jest.fn(() => ({
  get: jest.fn((entity) => entity),
}));

describe('ImageService', () => {
  let imageService: ImageService;
  let configService: MockType<ConfigService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ImageService, { provide: ConfigService, useFactory: configServiceMock }],
    }).compile();
    imageService = moduleRef.get(ImageService);
    configService = moduleRef.get(ConfigService);
  });

  describe('uploadImage', () => {
    it('개발 환경일 경우 localhost로 이미지 경로가 추가 된다', () => {
      configService.get.mockReturnValue('dev');
      const result = imageService.uploadImage('1.jpg');
      expect(result).toContain('localhost');
      expect(result).toContain('images');
      expect(result).toContain('1.jpg');
    });
  });
});
