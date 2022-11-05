import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import WritingService from 'service/writing';
import WritingModel from 'model/writing';
import { WritingRequestDto } from 'dto/writing';
import { WritingPagination } from 'types/writing';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

type RepositoryMock = MockType<Repository<WritingModel>>;

const repositoryMockFactory: () => RepositoryMock = jest.fn(() => ({
  count: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  findOne: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
}));

describe('WritingService', () => {
  let writingService: WritingService;
  let repositoryMock: RepositoryMock;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        WritingService,
        {
          provide: getRepositoryToken(WritingModel),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    writingService = moduleRef.get(WritingService);
    repositoryMock = moduleRef.get(getRepositoryToken(WritingModel));
  });

  describe('findWritingsByPageNumber', () => {
    const pageNumber = 1;

    it('게시글 리스트와 총 갯수를 반환 한다', async () => {
      const totalCount = 29;
      const list = Array(10)
        .fill(0)
        .map(() => new WritingModel());
      const result: WritingPagination = { totalCount, list };
      repositoryMock.count.mockReturnValue(totalCount);
      repositoryMock.find.mockReturnValue(list);
      expect(await writingService.findWritingsByPageNumber(pageNumber)).toStrictEqual(result);
    });

    it('검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      const error = new EntityNotFoundError(WritingModel, pageNumber);
      repositoryMock.count.mockReturnValue(0);
      repositoryMock.find.mockReturnValue([]);
      expect(async () => await writingService.findWritingsByPageNumber(pageNumber)).rejects.toThrowError(error);
    });

    it('예상치 못하게 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.find.mockRejectedValue(error);
      expect(async () => await writingService.findWritingsByPageNumber(pageNumber)).rejects.toThrowError(error);
    });
  });

  describe('findWritingById', () => {
    const id = '1';

    it('메서드 반환 값으로 게시글이 반환 된다', async () => {
      const result: WritingModel = { title: 'title', content: 'content', createdAt: new Date(), id };
      repositoryMock.findOne.mockReturnValue(result);
      expect(await writingService.findWritingById(id)).toStrictEqual(result);
    });

    it('findOne 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      const error = new EntityNotFoundError(WritingModel, id);
      repositoryMock.findOne.mockReturnValue(null);
      expect(async () => await writingService.findWritingById(id)).rejects.toThrowError(error);
    });

    it('예상치 못하게 findOne에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.findOne.mockRejectedValue(error);
      expect(async () => await writingService.findWritingById(id)).rejects.toThrowError(error);
    });
  });

  describe('createWriting', () => {
    const data: WritingRequestDto = { content: 'content', title: 'title' };

    it('create 호출 시 게시글이 정상적으로 추가된다', async () => {
      const result: WritingModel = { content: data.content, title: data.title, id: '1', createdAt: new Date() };
      repositoryMock.save.mockReturnValue(result);
      expect(await writingService.createWriting(data)).toStrictEqual(result);
    });

    it('예상치 못하게 save에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.save.mockRejectedValue(error);
      expect(async () => await writingService.createWriting(data)).rejects.toThrowError(error);
    });
  });

  describe('updateWriting', () => {
    const id = '1';
    const writing: WritingModel = { content: 'content', title: 'title', id: '1', createdAt: new Date() };

    it('findOne의 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      const error = new EntityNotFoundError(WritingModel, id);
      repositoryMock.findOne.mockReturnValue(null);
      expect(async () => await writingService.updateWriting(id, null)).rejects.toThrowError(error);
    });

    describe('이미 저장 된 데이터로 업데이트 하려는 경우 BadRequestException를 던진다', () => {
      const error = new BadRequestException();

      it('content가 같은 경우', () => {
        repositoryMock.findOne.mockReturnValue(writing);
        expect(async () => await writingService.updateWriting(id, { content: 'content' })).rejects.toThrowError(error);
      });

      it('title이 같은 경우', () => {
        repositoryMock.findOne.mockReturnValue(writing);
        expect(async () => await writingService.updateWriting(id, { title: 'title' })).rejects.toThrowError(error);
      });

      it('모든 데이터가 같은 경우', () => {
        const updateData: WritingRequestDto = { content: writing.content, title: writing.title };
        repositoryMock.findOne.mockReturnValue(writing);
        expect(async () => await writingService.updateWriting(id, updateData)).rejects.toThrowError(error);
      });
    });

    it('updateData에 맞게 게시글 데이터가 업데이트 된다', async () => {
      const updateData: WritingRequestDto = { content: 'newContent', title: 'newTitle' };
      const result: WritingModel = { ...writing, ...updateData };
      repositoryMock.findOne.mockReturnValue(writing);
      repositoryMock.save.mockReturnValue(result);
      expect(await writingService.updateWriting(id, updateData)).toStrictEqual(result);
    });

    it('예상치 못하게 findOne에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.findOne.mockRejectedValue(error);
      expect(async () => await writingService.updateWriting(id, { title: 'title' })).rejects.toThrowError(error);
    });

    it('예상치 못하게 save에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.save.mockRejectedValue(error);
      expect(async () => await writingService.updateWriting(id, { title: 'title' })).rejects.toThrowError(error);
    });
  });

  describe('deleteWriting', () => {
    const id = '1';

    it('findOne의 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      const error = new EntityNotFoundError(WritingModel, id);
      repositoryMock.findOne.mockReturnValue(null);
      expect(async () => await writingService.deleteWriting(id)).rejects.toThrowError(error);
    });

    it('게시글을 찾은 경우 repository.delete를 호출 한다', async () => {
      const writing: WritingModel = { content: 'content', title: 'title', id: '1', createdAt: new Date() };
      repositoryMock.findOne.mockReturnValue(writing);
      await writingService.deleteWriting(id);
      expect(repositoryMock.delete).toHaveBeenCalledWith(id);
    });

    it('예상치 못하게 findOne에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.findOne.mockRejectedValue(error);
      expect(async () => await writingService.deleteWriting(id)).rejects.toThrowError(error);
    });

    it('예상치 못하게 delete에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.delete.mockRejectedValue(error);
      expect(async () => await writingService.deleteWriting(id)).rejects.toThrowError(error);
    });
  });
});
