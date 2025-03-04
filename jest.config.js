module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/', '/__tests__/setup.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      isolatedModules: true
    }],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['text'],
  // FiveM関連のモジュールをモック化
  moduleNameMapper: {
    '@citizenfx/(.*)': '<rootDir>/src/__mocks__/@citizenfx/$1.ts',
    '@nativewrappers/(.*)': '<rootDir>/src/__mocks__/@nativewrappers/$1.ts',
  },
  // グローバル変数の設定
  globals: {
    // FiveM グローバル関数のモック
    GetCurrentResourceName: () => 'typescript-test',
    GetParentResourceName: () => 'typescript-test',
    on: function() {},
    onNet: function() {},
    emit: function() {},
    emitNet: function() {},
  },
}; 