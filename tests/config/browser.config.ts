import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['tests/browser/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    browser: {
      provider: "webdriverio",
      enabled: true,
      instances: [
        { browser: "chrome" },
      ]
    },
  },
})