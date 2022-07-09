import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';

import WritingService from 'service/writing';
import WritingModel from 'model/writing';
import { WritingRequestDto, WritingResponseDto } from 'dto/writing';
import { BadRequestException } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory = jest.fn(() => ({
  find: jest.fn((entity) => entity),
  findOne: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  delete: jest.fn((entity) => entity),
}));

describe('WritingService', () => {
  let writingService: WritingService;
  let repositoryMock: MockType<Repository<WritingModel>>;

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

    it('findWritingsByPageNumber 메서드 호출 시 repository.find가 호출 된다', () => {
      const size = 10;
      const options = { take: size, skip: (pageNumber - 1) * size, order: { createdAt: 'DESC' } };
      writingService.findWritingsByPageNumber(pageNumber);
      expect(repositoryMock.find).toHaveBeenCalledWith(options);
    });

    it('메서드 반환 값으로 게시글 리스트를 반환 한다', async () => {
      const writings = Array(10)
        .fill(0)
        .map<WritingResponseDto>(() => ({ title: 'title', content: 'content', createdAt: new Date(), id: '1' }));
      repositoryMock.find.mockReturnValue(writings);
      expect(await writingService.findWritingsByPageNumber(pageNumber)).toStrictEqual(writings);
    });

    it('find 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      repositoryMock.findAndCount.mockReturnValue([[]]);
      expect(async () => await writingService.findWritingsByPageNumber(pageNumber)).rejects.toThrowError(
        new EntityNotFoundError(WritingModel, pageNumber),
      );
    });

    it('예상치 못하게 find에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.find.mockRejectedValue(error);
      expect(async () => await writingService.findWritingsByPageNumber(pageNumber)).rejects.toThrowError(error);
    });
  });

  describe('findWritingById', () => {
    const id = '1';

    it('findWritingById 호출 시 repository.findOne이 호출 된다', () => {
      writingService.findWritingById(id);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ id });
    });

    it('메서드 반환 값으로 게시글이 반환 된다', async () => {
      const result: WritingResponseDto = { title: 'title', content: 'content', createdAt: new Date(), id };
      repositoryMock.findOne.mockReturnValue(result);
      expect(await writingService.findWritingById(id)).toStrictEqual(result);
    });

    it('findOne 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(async () => await writingService.findWritingById(id)).rejects.toThrowError(
        new EntityNotFoundError(WritingModel, id),
      );
    });

    it('예상치 못하게 findOne에서 문제가 생길 경우 에러를 던진다', () => {
      const error = new Error('unexcepted error');
      repositoryMock.findOne.mockRejectedValue(error);
      expect(async () => await writingService.findWritingById(id)).rejects.toThrowError(error);
    });
  });

  describe('createWriting', () => {
    const data: WritingRequestDto = { content: 'content', title: 'title' };
    const result: WritingResponseDto = { content: data.content, title: data.title, id: '1', createdAt: new Date() };

    it('createWriting 메서드 호출 시 repository.save가 호출 된다', () => {
      writingService.createWriting(data);
      expect(repositoryMock.save).toHaveBeenCalledWith(data);
    });

    it('create 호출 시 게시글이 정상적으로 추가된다', async () => {
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
    const foundWriting: WritingResponseDto = {
      content: 'content',
      title: 'title',
      id: '1',
      createdAt: new Date(),
    };

    it('updateWriting 호출 시 repository.udpate가 호출 된다', () => {
      writingService.updateWriting(id, { content: 'content', title: 'title' });
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ id });
    });

    it('findOne의 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(
        async () => await writingService.updateWriting(id, { content: 'content', title: 'title' }),
      ).rejects.toThrowError(new EntityNotFoundError(WritingModel, id));
    });

    describe('업데이트 데이터가 findOne으로 찾은 게시글에 포함되어 있는 경우 BadRequestException를 던진다', () => {
      it('content data', () => {
        repositoryMock.findOne.mockReturnValue(foundWriting);
        expect(async () => await writingService.updateWriting(id, { content: 'content' })).rejects.toThrowError(
          new BadRequestException(),
        );
      });

      it('title data', () => {
        repositoryMock.findOne.mockReturnValue(foundWriting);
        expect(async () => await writingService.updateWriting(id, { title: 'title' })).rejects.toThrowError(
          new BadRequestException(),
        );
      });

      it('full data', () => {
        repositoryMock.findOne.mockReturnValue(foundWriting);
        expect(
          async () => await writingService.updateWriting(id, { content: 'content', title: 'title' }),
        ).rejects.toThrowError(new BadRequestException());
      });
    });

    it('게시글을 찾은 경우 repository.save를 호출 한다', async () => {
      const updateData: Partial<WritingRequestDto> = { content: 'cvcvcv', title: 'asasas' };
      repositoryMock.findOne.mockReturnValue(foundWriting);
      await writingService.updateWriting(id, updateData);
      expect(repositoryMock.save).toHaveBeenCalledWith({ ...foundWriting, ...updateData });
    });

    it('updateData에 맞게 게시글 데이터가 업데이트 된다', async () => {
      const updateData: Partial<WritingRequestDto> = { content: 'cvcvcv', title: 'asasas' };
      repositoryMock.findOne.mockReturnValue(foundWriting);
      repositoryMock.save.mockReturnValue({ ...foundWriting, ...updateData });
      const result = await writingService.updateWriting(id, updateData);
      expect(result).toStrictEqual({ ...foundWriting, ...updateData });
    });

    it('예상치 못하게 findOne에서 문제가 생길 경우 에러를 던진다', () => {
      repositoryMock.findOne.mockRejectedValue(new Error('unexcepted error'));
      expect(async () => await writingService.updateWriting(id, { content: 'content' })).rejects.toThrowError(
        'unexcepted error',
      );
    });

    it('예상치 못하게 save에서 문제가 생길 경우 에러를 던진다', () => {
      repositoryMock.save.mockRejectedValue(new Error('unexcepted error'));
      expect(async () => await writingService.updateWriting(id, { title: 'title' })).rejects.toThrowError(
        'unexcepted error',
      );
    });
  });

  describe('deleteWriting', () => {
    const id = '1';
    const foundWriting: WritingResponseDto = { content: 'content', title: 'title', id: '1', createdAt: new Date() };

    it('updateWriting 호출 시 repository.udpate가 호출 된다', () => {
      writingService.deleteWriting(id);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ id });
    });

    it('findOne의 검색 결과가 없을 경우 EntityNotFoundError를 throw 한다', () => {
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(async () => await writingService.deleteWriting(id)).rejects.toThrow(
        new EntityNotFoundError(WritingModel, id),
      );
    });

    it('게시글을 찾은 경우 repository.delete를 호출 한다', async () => {
      repositoryMock.findOne.mockReturnValue(foundWriting);
      await writingService.deleteWriting(id);
      expect(repositoryMock.delete).toHaveBeenCalledWith(id);
    });

    it('예상치 못하게 findOne에서 문제가 생길 경우 에러를 던진다', () => {
      repositoryMock.findOne.mockRejectedValue(new Error('unexcepted error'));
      expect(async () => await writingService.deleteWriting(id)).rejects.toThrowError('unexcepted error');
    });

    it('예상치 못하게 delete에서 문제가 생길 경우 에러를 던진다', () => {
      repositoryMock.delete.mockRejectedValue(new Error('unexcepted error'));
      expect(async () => await writingService.deleteWriting(id)).rejects.toThrowError('unexcepted error');
    });
  });
});
