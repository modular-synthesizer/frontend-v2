import localesConfig from "./locales.config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  imports: {
    dirs: ['core/**', 'stories/**', 'types/**', 'utils/**'],
    presets: [
      { from: "@jsynple/core", imports: ['Module', 'Synthesizer',] }
    ]
  },

  runtimeConfig: {
    public: {
      api_uri: process.env.API_URL || 'https://synple.app/api',
      processors_url: process.env.PROCESSORS_URL || 'https://modular-synthesizer.github.io/processors'
    }
  },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  modules: ['@nuxtjs/i18n', '@vueuse/nuxt', '@nuxt/test-utils/module'],

  i18n: { ...localesConfig, defaultLocale: 'fr' },

  ssr: false,
})