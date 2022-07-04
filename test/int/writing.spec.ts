import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';
import * as request from 'supertest';

import AppModule from 'app.module';
import { WritingRequestDto } from 'dto/writing';

describe('writing controller', () => {
  const prefix = '/api/writings';
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
    await getConnection().dropDatabase();
    await app.close();
  });

  describe(`${prefix}/:id (GET)`, () => {
    it('', async () => {});
  });

  describe(`${prefix}?page=page (GET)`, () => {
    it('', async () => {});
  });

  describe(`${prefix} (POST)`, () => {
    describe('content validation', () => {
      it('content가 없을 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`).send({ title: 'title' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('content가 문자열 타입이 아닌 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`).send({ title: 'title', content: 1 });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('content가 빈 문자열인 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`).send({ title: 'title', content: '' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });

    describe('title validation', () => {
      it('title가 없을 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`).send({ content: 'content' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('content가 문자열 타입이 아닌 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`).send({ title: 'title', content: 1 });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('title가 빈 문자열인 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`).send({ title: '', content: 'content' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });

    describe('게시글 추가 feature', () => {
      it('body payload가 없는 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).post(`${prefix}`);
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('게시글이 추가 된다', async () => {
        const data: WritingRequestDto = { content: 'content', title: 'title' };
        const result = await request(app.getHttpServer()).post(`${prefix}`).send(data);
        expect(result.statusCode).toBe(HttpStatus.CREATED);
        expect((result.body as WritingRequestDto).content).toBe('content');
        expect((result.body as WritingRequestDto).title).toBe('title');
      });
    });
  });

  describe(`${prefix}/:id (PATCH)`, () => {
    let createdWritingId = '';

    beforeEach(async () => {
      const data: WritingRequestDto = { content: 'content', title: 'title' };
      const writing = await request(app.getHttpServer()).post(`${prefix}`).send(data);
      createdWritingId = writing.body.id;
    });

    describe('id validation', () => {
      it('id의 타입이 uuid가 아닌 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).patch(`${prefix}/adasdadads`);
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('UUID를 찾지 못할 경우 404 statusCode를 반환 한다', async () => {
        const updateData: WritingRequestDto = { content: 'update', title: 'update' };
        const tempUUID = '745cf77c-fae5-11ec-b939-0242ac120002';
        const result = await request(app.getHttpServer()).patch(`${prefix}/${tempUUID}`).send(updateData);
        expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('content validation', () => {
      it('content가 없을 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer())
          .patch(`${prefix}/${createdWritingId}`)
          .send({ title: 'title' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('content가 문자열 타입이 아닌 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer())
          .patch(`${prefix}/${createdWritingId}`)
          .send({ title: 'title', content: 1 });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('content가 빈 문자열인 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer())
          .patch(`${prefix}/${createdWritingId}`)
          .send({ title: 'title', content: '' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });

    describe('title validation', () => {
      it('title가 없을 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer())
          .patch(`${prefix}/${createdWritingId}`)
          .send({ content: 'content' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('content가 문자열 타입이 아닌 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer())
          .patch(`${prefix}/${createdWritingId}`)
          .send({ title: 'title', content: 1 });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('title가 빈 문자열인 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer())
          .patch(`${prefix}/${createdWritingId}`)
          .send({ title: '', content: 'content' });
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });

    describe('게시글 업데이트 feature', () => {
      it('body payload가 없는 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).patch(`${prefix}/${createdWritingId}`);
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('업데이트 데이터가 id로 찾은 게시글 데이터와 같은 경우 400 HttpCode를 반환 한다', async () => {
        const create: WritingRequestDto = { content: 'create', title: 'create' };
        const writing = await request(app.getHttpServer()).post(`${prefix}`).send(create);
        const result = await request(app.getHttpServer()).patch(`${prefix}/${writing.body.id}`).send(create);
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('게시글을 업데이트 한다', async () => {
        const create: WritingRequestDto = { content: 'create', title: 'create' };
        const writing = await request(app.getHttpServer()).post(`${prefix}`).send(create);

        const update: WritingRequestDto = { content: 'update', title: 'update' };
        const result = await request(app.getHttpServer()).patch(`${prefix}/${writing.body.id}`).send(update);
        const body: WritingRequestDto = result.body;

        expect(result.statusCode).toBe(HttpStatus.OK);
        expect(body.content).not.toEqual(create.content);
        expect(body.content).toEqual(update.content);
        expect(body.title).not.toEqual(create.title);
        expect(body.title).toEqual(update.title);
      });
    });
  });

  describe(`${prefix}/:id (DELETE)`, () => {
    describe('id valiation', () => {
      it('id의 타입이 uuid가 아닌 경우 400 HttpCode를 반환 한다', async () => {
        const result = await request(app.getHttpServer()).delete(`${prefix}/adasdadads`);
        expect(result.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('UUID를 찾지 못할 경우 404 HttpCode를 반환 한다', async () => {
        const tempUUID = '745cf77c-fae5-11ec-b939-0242ac120002';
        const result = await request(app.getHttpServer()).delete(`${prefix}/${tempUUID}`);
        expect(result.statusCode).toBe(HttpStatus.NOT_FOUND);
      });
    });

    describe('게시글 삭제 feature', () => {
      it('id에 맞는 게시글이 삭제 된다', async () => {
        const data: WritingRequestDto = { content: 'content', title: 'title' };
        const createdWriting = await request(app.getHttpServer()).post(`${prefix}`).send(data);
        const result = await request(app.getHttpServer()).delete(`${prefix}/${createdWriting.body.id}`);
        expect(result.statusCode).toBe(HttpStatus.NO_CONTENT);
        expect(result.body).toStrictEqual({});
      });
    });
  });
});
