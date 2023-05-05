import { VitePluginNode } from 'vite-plugin-node'
import { type UserConfig, defineConfig } from 'vitest/config'

export const viteConfig: UserConfig = {
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      tsCompiler: 'swc'
    })
  ],
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
    // setupFiles: [],
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      all: true,
      cleanOnRerun: true,
      // statements: 90,
      // branches: 90,
      reporter: ['text', 'html-spa', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['**/*.{d,spec}.ts', 'src/main.ts', 'src/app.module.ts']
    }
  }
}

export default defineConfig(viteConfig)
