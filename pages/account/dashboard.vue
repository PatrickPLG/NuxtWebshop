<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '~/stores/auth';
import { useFavoritesStore } from '~/stores/favorites';

definePageMeta({
  middleware: ['auth'],
});

const user = ref(null);
const isLoading = ref(true);
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();

async function getUserData() {
  if (typeof window !== 'undefined' && authStore.token) {
    try {
      const token = authStore.token;
      const response = await axios.get('https://localhost:8081/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user.value = response.data;
      isLoading.value = false;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  } else {
    isLoading.value = false;
  }
}

onMounted(() => {
  getUserData();
  favoritesStore.fetchFavorites();
});
</script>

<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <p>Loading...</p>
  </div>
  <div v-else class="container mx-auto p-4">
    <h1 v-if="user" class="text-2xl font-bold mb-4">Welcome, {{ user }}</h1>
    <p v-else>Please log in to view your dashboard.</p>
    <button @click="authStore.logout" class="p-button p-component p-button-danger mb-4">Logout</button>
    
    <div v-if="favoritesStore.favorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="product in favoritesStore.favorites" :key="product.id" class="p-card">
        <template #header>
          <img :src="product.imageUrl" alt="Product Image" class="w-full h-48 object-cover">
        </template>
        <template #title>
          {{ product.title }}
        </template>
        <template #content>
          <p>{{ product.description }}</p>
          <p class="font-bold">${{ product.price }}</p>
        </template>
        <template #footer>
          <Button label="Remove from Favorites" icon="pi pi-times" class="p-button-danger" @click="favoritesStore.removeFavorite(product.id)" />
        </template>
      </Card>
    </div>
    <div v-else>
      <p>You have no favorite items.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>