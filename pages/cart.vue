<template>
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
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useCartStore } from '~/stores/cart';
  
  const cartStore = useCartStore();
  const cart = computed(() => cartStore.cart);
  
  function removeFromCart(id) {
    cartStore.removeProduct(id);
  }
  </script>
  