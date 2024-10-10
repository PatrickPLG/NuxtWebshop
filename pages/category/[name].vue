<script setup lang="ts">
import api from '~/services/api';
import type { Product } from '~/types/product';

const products: Ref<Product[]> = ref([]);
const route = useRoute();
const isLoading = ref(true);

onMounted(async () => {
    try {
        console.log(route.params);
        const categoryId = parseInt(route.params.name as string, 10);
        const response = await api.getProductByCategory(categoryId);
        products.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
</script>
<template>
    <div v-if="isLoading">
        <SkeletonProductGrid />
    </div>
    <div v-else>
        <ProductGrid :products="products" />
    </div>
</template>