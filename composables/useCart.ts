import { useCartStore } from '~/stores/cart';

export function useCart() {
  const cartStore = useCartStore();
  const cart = computed(() => cartStore.cart);
  return {
    cartStore,
    cart,
  };
}