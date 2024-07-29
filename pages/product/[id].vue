<script setup lang="ts">
import api from '~/services/api';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/types/product';

const toast = useToast();
const route = useRoute();
const product = ref();
const cartStore = useCartStore();

onMounted(async () => {
try {
  const response = await api.getProduct(parseInt(route.params.id.toString()));
  product.value = response.data;
  console.log('Product:', product.value);
} catch (error) {
  console.error('Error fetching products:', error);
}
});

function addToCart(product: Product) {
  cartStore.addProduct(product);
  toast.add({ severity: 'success', summary: 'Added to cart', detail: product.title, life: 3000 });
}
</script>

<template>
    <Toast />
    <div v-if="product">
      <div class=" py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                    <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                        <img class="w-full h-full object-cover" :src="product.image" alt="Product Image">
                    </div>
                </div>
                <div class="md:flex-1 px-4">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ product.title }}</h2>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {{ product.category }}
                    </p>
                    <div class="flex mb-4">
                        <div class="mr-4">
                            <span class="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                            <span class="text-gray-600 dark:text-gray-300"> ${{ product.price }}</span>
                        </div>
                        <div>
                            <span class="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                            <span class="text-gray-600 dark:text-gray-300"> In Stock</span>
                        </div>
                    </div>
                    <div class="mb-4">
                        <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                            {{ product.description }}
                        </p>
                    </div>
                    <div class="mb-4">
                      <Button label="Add to cart" @click="addToCart(product)" icon="pi pi-shopping-cart" class="w-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>

      <!-- <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}</p>
      <img :src="product.image" alt="product image">
      <button @click="addToCart(product)">Add to Cart</button> -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </template>

  