import { defineNuxtPlugin } from '#app';
import { useCartStore } from '~/stores/cart';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const cartStore = useCartStore();
    cartStore.$patch({
      cart: JSON.parse(localStorage.getItem('cart') || '[]')
    });
  }
});