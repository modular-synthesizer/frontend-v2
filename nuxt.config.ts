import localesConfig from "./locales.config"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  imports: { dirs: [ 'core/**', 'stories/**', 'types/**', 'utils/**' ] },

  runtimeConfig: {
    public: {
      api_uri: process.env.API_URL || 'https://synple.app/api',
    }
  },
  
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  modules: [ '@nuxtjs/i18n', '@vueuse/nuxt' ],

  i18n: { ...localesConfig, defaultLocale: 'fr' },

  ssr: false,
})