// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
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
            preset: Aura
        }
    }
  },
  css: ['primeicons/primeicons.css'],
  plugins: [
    '~/plugins/initCartStore.client.ts'
  ],
})