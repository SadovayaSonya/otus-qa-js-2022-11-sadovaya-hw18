import {defineConfig} from '@playwright/test';

const config = defineConfig({
    use: {
        headless: false,
        viewport: {width: 1920, height: 1080},
        ignoreHTTPSErrors: true,
        baseURL: 'https://vk.com/',
        slowMo: 1000,
    },
    retries: 2,
    testDir: 'specs',
});
export default config;