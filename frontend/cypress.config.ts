import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false,
    experimentalCompileOptions: {
      include: ['**/*.{ts,tsx}'],
      compiler: 'tsc',
    },
    baseUrl: 'http://localhost:3000',
    browser: 'chrome',
  },
});
