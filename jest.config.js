module.exports = {
  // 测试ts代码
  preset: 'ts-jest',
  // node环境
  testEnvironment: 'node',
  // 别名
  moduleNameMapper: {
    '^@/api/gmap$': '<rootDir>/tests/__mocks__/gmap.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // 匹配规则
  testMatch: ['**/tests/*.test.ts'],
  // 测试范围
  collectCoverageFrom: ['src/utils/**/*.ts'],
  // 覆盖率报告输出目录
  coverageDirectory: 'coverage',
};
