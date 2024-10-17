import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import type { Product } from '~/types/product';

interface DecodedToken {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Product[]>([]);
  const userId = ref<string | null>(null);

  onMounted(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      console.log(decoded);
      userId.value = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      console.log('User ID:', userId.value);
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
      await axios.post('https://localhost:8081/api/favorites', { UserID: userId.value, ProductID: product.id });
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