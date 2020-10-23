import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['src/'],
  clearMocks: true,
  collectCoverageFrom: ['**/*.ts?(x)', '!**/*.d.ts'],
  snapshotResolver: './jest/snapshotResolver.js',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  }
};

export default config;
