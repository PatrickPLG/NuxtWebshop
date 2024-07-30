<script setup lang="ts">
import { ref, computed } from 'vue';
import EmptyCart from '~/components/EmptyCart.vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
</script>


<template>
  <div v-if="cart.length > 0">
    <div class="flex justify-center items-center">
      <CheckoutCard />
    </div>
  </div>
  <div v-else>
    <EmptyCart />
  </div>
</template>