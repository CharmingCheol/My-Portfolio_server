import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import AppModule from 'app.module';

describe('ImageController', () => {
  const prefix = '/api/images';
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`${prefix}/writing`, () => {
    it('File 데이터가 없는 경우 400 HttpCode를 반환 한다', async () => {
      const result = await request(app.getHttpServer()).post(`${prefix}/writing`);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('파일 확장자가 이미지가 아닐 경우 400 HttpCode를 반환 한다', async () => {
      const exe = 'md';
      const filePath = `test/fixtures/test.${exe}`;
      const result = await request(app.getHttpServer()).post(`${prefix}/writing`).attach('writing', filePath);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('파일 이름이 한글인 경우, 인코딩 된 형태로 저장 된다', async () => {
      const fileName = '테스트';
      const filePath = `test/fixtures/${fileName}.jpg`;
      const result = await request(app.getHttpServer())
        .post(`${prefix}/writing`)
        .set('Content-Type', 'multipart/form-data')
        .attach('writing', filePath);
      expect(result.body.path).toContain(encodeURIComponent(fileName));
      expect(result.statusCode).toBe(HttpStatus.OK);
    });
  });
});
