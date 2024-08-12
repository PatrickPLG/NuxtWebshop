import { defineStore } from "pinia";
import { watch } from 'vue';
import type { Product } from '~/types/product';

const STORE_NAME = "cart";
interface CartState {
  cart: Product[];
}

export const useCartStore = defineStore(STORE_NAME, {
  state: (): CartState => ({
    cart: [],
  }),
  persist: true,
  getters: {
    cartTotal: (state: CartState): number =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    totalQuantity: (state: CartState): number =>
      state.cart.reduce((count, item) => count + item.quantity, 0),
    Cart: (state: CartState) => state.cart,

  },
  actions: {
    addProduct(product: Product, quantity: number) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity });
      }
    },
    removeProduct(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.cart = [];
    },
  },
});