// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@morev/vue-transitions/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxtjs/robots',
    'nuxt-icon',
    '@pinia/nuxt'
  ],
  auth: {
    isEnabled: true,
    origin: process.env.BASE_URL,
    basePath: '/api/auth'
  },
  appConfig: {
    TITLE: 'FORUM MEUCCI',
    LANG: 'it',
    DESCRIPTION: "Pagina di registrazione per il forum dell'ITIS Meucci 2023",
    COUNTDOWN_DAY: '2023-02-20T00:00:00+0100',
    EVENT_DAY: '2023-02-28T08:30:00+0100',
    DAYS: ['Martedì', 'Mercoledì', 'Giovedì'],
    HOURS: ['8:30', '11:00'],
    HOURS_LENGTH: 2.5
  },
  nitro: {
    compressPublicAssets: true
  },
  css: ['~/assets/main.scss'],
  components: { global: true, dirs: ['~/components'] },
  tailwindcss: {
    config: {
      darkMode: 'class',
      content: [],
      plugins: [require('daisyui')]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  }
});
