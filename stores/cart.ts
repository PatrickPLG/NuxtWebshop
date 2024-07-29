import { defineStore } from "pinia";
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
      state.cart.reduce((total, item) => total + item.price, 0),
    itemCount: (state: CartState): number =>
      state.cart.reduce((count, item) => count, 0),
  },
  actions: {
    addProduct(product: Product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORE_NAME, JSON.stringify(this.cart));
      }
    },
    removeProduct(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORE_NAME, JSON.stringify(this.cart));
      }
    },
    clearCart() {
      this.cart = [];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORE_NAME, JSON.stringify(this.cart));
      }
    },
  },
});