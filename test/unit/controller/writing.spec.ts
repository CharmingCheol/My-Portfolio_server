import { Test } from '@nestjs/testing';

import WritingController from 'controller/writing';
import WritingService from 'service/writing';
import { WritingRequestDto, WritingResponseDto } from 'dto/writing';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const serviceMockFactory = jest.fn(() => ({
  findWritingsByPageNumber: jest.fn((entity) => entity),
  findWritingById: jest.fn((entity) => entity),
  createWriting: jest.fn((entity) => entity),
  updateWriting: jest.fn((entity) => entity),
  deleteWriting: jest.fn((entity) => entity),
}));

describe('WritingController', () => {
  let writingController: WritingController;
  let writingService: MockType<WritingService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [WritingController],
      providers: [WritingService, { provide: WritingService, useFactory: serviceMockFactory }],
    }).compile();
    writingController = moduleRef.get(WritingController);
    writingService = moduleRef.get(WritingService);
  });

  describe('findOne', () => {
    const id = '1';

    it('controller.findOne 호출 시 service.findWritingById가 호출 된다', () => {
      writingController.findOne(id);
      expect(writingService.findWritingById).toHaveBeenCalledWith(id);
    });

    it('service.findWritingById 값을 반환 한다', async () => {
      const writing: WritingResponseDto = { content: 'content', id: '1', title: 'title', createdAt: new Date() };
      writingService.findWritingById.mockReturnValue(writing);
      const result = await writingController.findOne(id);
      expect(result).toStrictEqual(writing);
    });
  });

  describe('pagination', () => {
    const page = 1;

    it('controller.pagination 호출 시 service.findWritingsByPageNumber가 호출 된다', () => {
      writingController.pagination(page);
      expect(writingService.findWritingsByPageNumber).toHaveBeenCalledWith(page);
    });

    it('service.pagination 값을 반환 한다', async () => {
      const writings = Array(10)
        .fill(0)
        .map<WritingResponseDto>(() => ({ title: 'title', content: 'content', createdAt: new Date(), id: '1' }));
      writingService.findWritingsByPageNumber.mockReturnValue([writings, writings.length]);
      const result = await writingController.pagination(page);
      expect(result).toStrictEqual([writings, writings.length]);
    });
  });

  describe('create', () => {
    const data: WritingRequestDto = { title: 'title', content: 'content' };

    it('controller.crate 호출 시 service.createWriting가 호출 된다', () => {
      writingController.create(data);
      expect(writingService.createWriting).toHaveBeenCalledWith(data);
    });

    it('service.createWriting 값을 반환 한다', async () => {
      const writing: WritingResponseDto = { ...data, id: '1', createdAt: new Date() };
      writingService.createWriting.mockReturnValue(writing);
      const result = await writingController.create(data);
      expect(result).toStrictEqual(writing);
    });
  });

  describe('update', () => {
    const id = '1';
    const data: WritingRequestDto = { title: 'title', content: 'content' };

    it('controller.update 호출 시 service.updateWriting가 호출 된다', () => {
      writingController.update(id, data);
      expect(writingService.updateWriting).toHaveBeenCalledWith(id, data);
    });

    it('service.updateWriting 값을 반환 한다', async () => {
      const writing = { ...data, id: '1', createdAt: new Date().toISOString() };
      writingService.updateWriting.mockReturnValue(writing);
      const result = await writingController.update(id, data);
      expect(result).toStrictEqual(writing);
    });
  });

  describe('delete', () => {
    const id = '1';

    it('controller.delete 호출 시 service.deleteWriting가 호출 된다', () => {
      writingController.delete(id);
      expect(writingService.deleteWriting).toHaveBeenCalledWith(id);
    });
  });
});