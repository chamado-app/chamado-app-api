import jestConfig from './jest.config'

export default {
  ...jestConfig,
  testMatch: ['**/*.e2e-spec.ts']
}
