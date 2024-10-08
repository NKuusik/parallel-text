// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
    coverage: {
      provider: 'istanbul',
      exclude: ['webpack.*', '*.config.*', 'node_modules/**','dist/**', 'src/tests/**', 'src/styles/**'],
      reporter: ['text', 'html'], // <-- ***
      },
    },
    plugins: [vue()],
});
