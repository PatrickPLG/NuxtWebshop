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
  <!-- <div>
    <NuxtRouteAnnouncer />
    
  </div> -->
  <div class="p-component">
    <Navbar />
    <NuxtPage />
    <Footer />
  </div>
</template>
