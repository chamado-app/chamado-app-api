import { defineConfig } from 'vitest/config'

import { viteConfig } from './vite.config'

export default defineConfig({
  ...viteConfig,
  test: { ...viteConfig.test, include: ['src/**/*.e2e-spec.ts'] }
})
