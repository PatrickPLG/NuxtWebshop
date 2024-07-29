// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';
import accordion from '@primevue/themes/aura/accordion';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss'
  ],
  primevue: {
    options: {
        theme: {
            preset: Aura,
            options: {
              prefix: 'p-',
              darkModeSelector: '.light-theme',
              
            }
        }
    }
  },
  css: ['primeicons/primeicons.css'],
  plugins: [
    '~/plugins/initCartStore.client.ts'
  ],
})