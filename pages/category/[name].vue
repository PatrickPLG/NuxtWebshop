<script setup lang="ts">
import api from '~/services/api';
import type { Product } from '~/types/product';

const products: Ref<Product[]> = ref([]);
const route = useRoute();

onMounted(async () => {
    try {
        const response = await api.getProductByCategory(route.params.name.toString());
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
});
</script>
<template>
    <ProductGrid :products="products" />
</template>