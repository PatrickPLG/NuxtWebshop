<script setup lang="ts">
import api from '~/services/api';
import type { Product } from '~/types/product';

const products: Ref<Product[]> = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.getProducts();
    products.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

</script>

<template>
  <Hero title="Webshop website" description="The best place to shop for your needs!" image="/images/hero-1.png" />
  <div v-if="isLoading">
    <SkeletonProductGrid />
  </div>
  <div v-else>
    <ProductGrid :products="products" />
  </div>
</template>