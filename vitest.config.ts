import { resolve } from 'path'

import swc from 'unplugin-swc'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [swc.vite()],
  optimizeDeps: {
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger'
    ]
  },
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, 'src/**/*.test.ts'],
    root: resolve(__dirname),
    environment: 'node',
    // setupFiles: [],
    coverage: {
      provider: 'istanbul',
      all: true,
      cleanOnRerun: true,
      // statements: 90,
      // branches: 90,
      reporter: ['text', 'html-spa', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: [
        '**/*.{d,spec}.ts',
        'src/main.ts',
        'src/app.module.ts',
        'src/{config,database}/**/*.*'
      ]
    }
  }
})
