import { ConsoleLogger } from '@nestjs/common';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

export const loggerMockFactory: () => MockType<ConsoleLogger> = jest.fn(() => ({
  setContext: jest.fn((entity) => entity),
  log: jest.fn((entity) => entity),
  error: jest.fn((entity) => entity),
}));
