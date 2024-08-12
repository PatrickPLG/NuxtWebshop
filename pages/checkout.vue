<script setup lang="ts">
import EmptyCart from '~/components/EmptyCart.vue';

const cartStore = useCartStore();
</script>


<template>
  <div v-if="cartStore.Cart.length > 0">
    <div class="flex justify-center items-center">
      <CheckoutCard />
    </div>
  </div>
  <div v-else>
    <EmptyCart />
  </div>
</template>