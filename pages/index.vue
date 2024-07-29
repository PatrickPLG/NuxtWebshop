<script setup lang="ts">
import api from '~/services/api';
import type { Product } from '~/types/product';

const products: Ref<Product[]> = ref([]);

onMounted(async () => {
  try {
    const response = await api.getProducts();
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

</script>

<template>
  <div class="grid grid-cols-2 text-800 mb-12">
    <div class="place-content-center ml-5 text-center">
      <p class="block text-6xl font-bold mb-1">Webshop website</p>
      <p class="block text-2xl mr-20">The best place to shop for your needs!</p>

    </div>
    <div class="mr-5">
      <img src="public/hero-1.png" class="w-full" alt="" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
  </div>
  <Productgrid :products="products" />
</template>