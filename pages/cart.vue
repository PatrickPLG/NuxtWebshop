<script setup lang="ts">

const { cart } = useCart();
</script>

<template>
  <div v-if="cart.length > 0">
    <div class="h-full">
      <div class="flex justify-center items-center">
        <CartTable />
      </div>
    </div>
  </div>
  <div v-else>
    <EmptyCart />
  </div>
</template>