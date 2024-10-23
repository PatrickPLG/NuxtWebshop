<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt Webshop',
  description: 'Shop all our needs',
})

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico'
    }
  ]
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <Navbar />
    </header>
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
