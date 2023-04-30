import { readFileSync } from 'fs'
import { join } from 'path'

const config = JSON.parse(readFileSync(join(__dirname, '.swcrc'), 'utf-8'))

export default {
  roots: ['<rootDir>'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  transform: {
    '^.+\\.ts$': ['@swc/jest', { ...config }]
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
