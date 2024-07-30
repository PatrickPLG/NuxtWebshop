<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
</script>

<template>
  <div v-if="cart.length > 0">
    <div class="flex justify-center items-center mb-5">
      <CartTable />
    </div>
  </div>
  <div v-else>
    <EmptyCart />
  </div>
</template>