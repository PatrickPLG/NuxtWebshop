<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '~/services/api';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/types/product';

const route = useRoute();
const product = ref();
const cartStore = useCartStore();

onMounted(async () => {
try {
  const response = await api.getProduct(parseInt(route.params.id.toString()));
  product.value = response.data;
  console.log('Product:', product.value);
} catch (error) {
  console.error('Error fetching products:', error);
}
});

function addToCart(product: Product) {
  cartStore.addProduct(product);
}
</script>

<template>
    <div v-if="product">
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}</p>
      <img :src="product.image" alt="product image">
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>

  