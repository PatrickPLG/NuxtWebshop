<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
const toast = useToast();
const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);

function removeFromCart(id: number) {
  cartStore.removeProduct(id);
  toast.add({ severity: 'success', summary: 'Removed from cart', life: 3000 });
}
</script>

<template>
    <Toast />
    <div v-if="cart.length > 0">
      <div>
        <div v-for="item in cart" :key="item.id">
          <img :src="item.image" alt="product image" />
          <p>{{ item.title }}</p>
          <p>{{ item.price }}</p>
          <!-- <input type="number" v-model="item.quantity" /> -->
          <button @click="removeFromCart(item.id)">Remove</button>
        </div>
      </div>
      <NuxtLink to="/checkout">
        <button>Checkout</button>
      </NuxtLink>
  </div>
  <div v-else>
    <p>No items in cart</p>
  </div>
  </template>
  