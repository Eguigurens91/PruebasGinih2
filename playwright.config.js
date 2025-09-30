const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './ui',
  timeout: 30_000,
  use: {
    baseURL: 'https://demoqa.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
    ['list']
  ],
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});