import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

import vitestConfig from './vitest.config'

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'src/**/*.spec.ts']
    }
  })
)
