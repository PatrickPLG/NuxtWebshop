<script setup lang="ts">

const cartStore = useCartStore();
</script>

<template>
  <div class="h-screen">
    <div v-if="cartStore.Cart.length > 0">
      <div class="">
        <div class="flex justify-center items-center">
          <CartTable />
        </div>
      </div>
    </div>
    <div v-else>
      <EmptyCart />
    </div>
  </div>
</template>