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

  describe(`${prefix}/writings/contents`, () => {
    const path = 'writings/contents';

    it('File 데이터가 없는 경우 400 HttpCode를 반환 한다', async () => {
      const result = await request(app.getHttpServer()).post(`${prefix}/${path}`);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('이미지 확장자가 아닐 경우 400 HttpCode를 반환 한다', async () => {
      const file = 'test/fixtures/test.md';
      const result = await request(app.getHttpServer()).post(`${prefix}/${path}`).attach('writing', file);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('field가 writing이 아닐 경우 400 HttpCode를 반환 한다', async () => {
      const file = 'test/fixtures/test.jpg';
      const result = await request(app.getHttpServer()).post(`${prefix}/${path}`).attach('foo', file);
      expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('이미지 파일 업로드에 성공 할 경우 경로를 반환 된다', async () => {
      const file = 'test/fixtures/test.jpg';
      const result = await request(app.getHttpServer()).post(`${prefix}/${path}`).attach('writing', file);
      expect(result.body.path).toContain('amazon');
      expect(result.statusCode).toBe(HttpStatus.OK);
    });
  });
});
