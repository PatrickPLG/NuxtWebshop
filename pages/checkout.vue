<script setup lang="ts">
import EmptyCart from '~/components/EmptyCart.vue';

const { cart } = useCart();
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