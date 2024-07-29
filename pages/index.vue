<script setup lang="ts">
import api from '~/services/api';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Image from 'primevue/image';
import Tag from 'primevue/tag';
import type { Product } from '~/types/product';

const products: Ref<Product[]> = ref([]);

onMounted(async () => {
  try {
    const response = await api.getProducts();
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

const truncateTitle = (title: string, maxLength: number) => {
  maxLength = maxLength || 20;
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};
</script>

<template>
  <div class="grid grid-cols-3 gap-10 ml-5 mr-5">
    <div v-for="product in products" :key="product.id">
      <Card style="" class="">
        <template #header>
          <div class="relative mx-auto h-64 w-full overflow-hidden rounded-tr-md rounded-tl-md">
            <Image :src="product.image" alt="Image" preview  />
            <Tag icon="pi pi-dollar" :value="product.price" severity="secondary" class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
          </div>
        </template>
        <template #title>{{ truncateTitle(product.title, 20) }}</template>
        <template #subtitle>{{ product.category }}</template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" /> -->
                <NuxtLink class="w-full":to="{ name: 'product-id', params: { id: product.id } }">
                  <Button label="View" icon="pi pi-search" class="w-full" />
                </NuxtLink>
            </div>
        </template>
      </Card>
    </div>
  </div>
</template>