<script setup>
  import { ref, onMounted } from 'vue';
  import api from '~/services/api';
  
  const categories = ref([]);
  const dropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };
  
  onMounted(async () => {
    try {
      const response = await api.getAllCategories();
      categories.value = response.data.map(category => ({
        label: category.category,
        icon: category.icon,
        id: category.id,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
  </script>

<template>
    <nav class="bg-white shadow-md p-4 flex justify-between items-center">
      <div class="flex space-x-4">
        <NuxtLink to="/" class="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
          <i class="pi pi-home"></i>
          <span>Home</span>
        </NuxtLink>
        <div class="relative">
          <button @click="toggleDropdown" class="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
            <i class="pi pi-bars"></i>
            <span>Category</span>
          </button>
          <div v-if="dropdownOpen" class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
            <ul>
              <li v-for="category in categories" :key="category.id" class="px-4 py-2 hover:bg-gray-100">
                <NuxtLink :to="`/category/${category.id}`" class="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                  <i :class="category.icon"></i>
                  <span>{{ category.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex space-x-4">
        <NuxtLink to="/account/dashboard" class="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
          <i class="pi pi-user"></i>
          <span>Account</span>
        </NuxtLink>
        <NuxtLink to="/cart" class="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
          <i class="pi pi-shopping-cart"></i>
          <span>Cart</span>
        </NuxtLink>
      </div>
    </nav>
</template>
  
  