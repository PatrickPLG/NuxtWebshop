<script setup lang="ts">
import { ref, computed } from 'vue';
import Dropdown from 'primevue/dropdown';
import type { Product } from '~/types/product';

const props = defineProps<{
    products: Product[];
}>();

console.log('ProductGrid props:', props.products[0]);
const truncateTitle = (title: string, maxLength: number) => {
    maxLength = maxLength || 20;
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};

const sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Low to High', value: 'priceAsc' },
    { label: 'Price: High to Low', value: 'priceDesc' },
    { label: 'Title: A to Z', value: 'titleAsc' },
    { label: 'Title: Z to A', value: 'titleDesc' },
];

const selectedSortOption = ref('default');

const sortedProducts = computed(() => {
    if (selectedSortOption.value === 'default') {
        return props.products;
    }
    return [...props.products].sort((a, b) => {
        switch (selectedSortOption.value) {
            case 'priceAsc':
                return a.price - b.price;
            case 'priceDesc':
                return b.price - a.price;
            case 'titleAsc':
                return a.title.localeCompare(b.title);
            case 'titleDesc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });
});
</script>

<template>
    <div class="ml-5 mr-5">
        <div class="flex justify-end mb-4">
            <Select v-model="selectedSortOption" :options="sortOptions" optionLabel="label" optionValue="value"
                placeholder="Sort By" class="w-48" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div v-for="product in sortedProducts" :key="product.id">
                
                <Card style="" class="">
                    <template #header>
                        <div
                            class="relative mx-auto h-96 w-full overflow-hidden rounded-tr-md rounded-tl-md flex items-center justify-center">
                            <Image :src="product.imageUrl" alt="Image" preview class="h-full" />
                            <Tag icon="pi pi-dollar" :value="product.price.toFixed(2)" severity="primary"
                                class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
                        </div>
                    </template>
                    <template #title>{{ truncateTitle(product.title, 20) }}</template>
                    <template #subtitle>{{ product.category }}</template>
                    <template #footer>
                        <div class="flex gap-4 mt-1">
                            <NuxtLink class="w-full" :to="{ name: 'product-id', params: { id: product.id } }">
                                <Button label="See more" severity="secondary" icon="pi pi-search" class="w-full" />
                            </NuxtLink>
                            <ProductAddToCartButton :product="product" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
        <ScrollTop icon="pi pi-arrow-up" />
    </div>
</template>