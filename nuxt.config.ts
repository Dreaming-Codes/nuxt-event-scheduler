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
    ],
    auth: {
        isEnabled: true,
        basePath: '/api/auth',
    },
    appConfig: {
        "TITLE": "FORUM MEUCCI",
        "LANG": "it",
        "DESCRIPTION": "Pagina di registrazione per il forum dell'ITIS Meucci",
    },
    nitro: {
      compressPublicAssets: true,
    },
    css: ['~/assets/main.scss'],
    components: { global: true, dirs: ['~/components'] },
    tailwindcss: {
        config: {
            darkMode: 'class',
            content: []
        }
    },
    colorMode: {
        classSuffix: '',
        preference: 'dark',
        fallback: 'dark',
    }
})
