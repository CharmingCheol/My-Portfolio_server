import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EntityNotFoundError } from 'typeorm';

import HttpExceptionFilter from 'utils/httpExceptionFilter';
import WritingModel from 'model/writing';

const mockJson = jest.fn().mockReturnThis();
const mockStatus = jest.fn().mockReturnThis();
const mockArgumentsHost = {
  switchToHttp: jest.fn().mockImplementation(() => ({
    getResponse: jest.fn().mockImplementation(() => ({
      status: mockStatus,
      json: mockJson,
    })),
  })),
};

describe('HttpExceptionFilter', () => {
  let service: HttpExceptionFilter;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();
    service = moduleRef.get(HttpExceptionFilter);
    jest.clearAllMocks();
  });

  it('EntityNotFoundError 발생 시 에러 코드와 메시지를 반환 한다', () => {
    const exception = new EntityNotFoundError(WritingModel, 1);
    const argumentsHost = mockArgumentsHost as unknown as ArgumentsHost;
    service.catch(exception, argumentsHost);
    expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toBeCalledWith({ message: exception.message });
  });

  it('예상치 못한 에러가 발생한 경우 500 에러 코드와 메시지를 반환 한다', () => {
    const exception = new Error('error');
    const argumentsHost = mockArgumentsHost as unknown as ArgumentsHost;
    service.catch(exception, argumentsHost);
    expect(mockStatus).toBeCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockJson).toBeCalledWith({ message: exception.message });
  });
});
