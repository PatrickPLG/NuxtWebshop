import { defineStore } from "pinia";
import type { Product } from '~/types/product';

interface CartState {
  cart: Product[];
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    cart: [],
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
      this.cart.push({ ...product });
    },
    removeProduct(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    // updateQuantity(productId: number, quantity: number) {
    //   const product = this.cart.find((item) => item.id === productId);
    //   if (product) {
    //     product.quantity = quantity;
    //   }
    // },
    clearCart() {
      this.cart = [];
    },
  },
});
