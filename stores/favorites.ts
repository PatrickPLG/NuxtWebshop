import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import type { Product } from '~/types/product';

interface DecodedToken {
  id: number;
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Product[]>([]);
  const userId = ref<number | null>(null);

  onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      userId.value = decoded.id;
      fetchFavorites();
    }
  });

  async function fetchFavorites() {
    if (userId.value) {
      const response = await axios.get(`https://localhost:8081/api/favorites/${userId.value}`);
      favorites.value = response.data;
    }
  }

  async function addFavorite(product: Product) {
    if (!favorites.value.find((item) => item.id === product.id)) {
      favorites.value.push(product);
      await axios.post('https://localhost:8081/api/favorites', { userId: userId.value, productId: product.id });
    }
  }

  async function removeFavorite(productId: number) {
    favorites.value = favorites.value.filter((item) => item.id !== productId);
    await axios.delete(`https://localhost:8081/api/favorites/${userId.value}/${productId}`);
  }

  function isFavorite(productId: number) {
    return favorites.value.some((item) => item.id === productId);
  }

  return { favorites, addFavorite, removeFavorite, isFavorite, fetchFavorites };
});