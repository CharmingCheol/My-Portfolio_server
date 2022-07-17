module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    'controller/(.*)': '<rootDir>/src/controller/$1',
    'dto/(.*)': '<rootDir>/src/dto/$1',
    'filter/(.*)': '<rootDir>/src/filter/$1',
    'model/(.*)': '<rootDir>/src/model/$1',
    '^model': '<rootDir>/src/model/index',
    'module/(.*)': '<rootDir>/src/module/$1',
    'pipe/(.*)': '<rootDir>/src/pipe/$1',
    'service/(.*)': '<rootDir>/src/service/$1',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
    '^app.module': '<rootDir>/src/app.module.ts',
  },
};
