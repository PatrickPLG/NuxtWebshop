import { defineStore } from "pinia";
import { watch } from 'vue';
import type { Product } from '~/types/product';

const STORE_NAME = "cart";
interface CartState {
  cart: Product[];
}

const getCart = () => {
  if (typeof localStorage !== 'undefined') {
    const cart = localStorage.getItem(STORE_NAME);
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

export const useCartStore = defineStore(STORE_NAME, {
  state: (): CartState => ({
    cart: getCart(),
  }),
  getters: {
    cartTotal: (state: CartState): number =>
      state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
    itemCount: (state: CartState): number =>
      state.cart.reduce((count, item) => count + item.quantity, 0),
  },
  actions: {
    addProduct(product: Product, quantity: number) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity });
      }
      this.saveCart();
    },
    removeProduct(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      this.saveCart();
    },
    clearCart() {
      this.cart = [];
      this.saveCart();
    },
    saveCart() {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORE_NAME, JSON.stringify(this.cart));
      }
    }
  },
});