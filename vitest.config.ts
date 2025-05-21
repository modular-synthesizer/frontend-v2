import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
  }
})