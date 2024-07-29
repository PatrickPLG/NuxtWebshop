<template>
    <Toast />
    <div>
      <div v-for="item in cart" :key="item.id">
        <p>{{ item.title }}</p>
        <p>{{ item.price }}</p>
      </div>
      <form @submit.prevent="submitOrder">
        <input type="text" v-model="user.name" placeholder="Name" />
        <input type="email" v-model="user.email" placeholder="Email" />
        <button type="submit">Place Order</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useCartStore } from '~/stores/cart';
  
  const toast = useToast();
  const cartStore = useCartStore();
  const cart = computed(() => cartStore.cart);
  const user = ref({ name: '', email: '' });
  
  function submitOrder() {
    console.log('Order submitted', cart.value, user.value);
    cartStore.clearCart();
    toast.add({ severity: 'success', summary: 'Order placed!', life: 3000 });
  }
  </script>
  