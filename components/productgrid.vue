<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
    products: Object,
})

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
                        <Image :src="product.image" alt="Image" preview />
                        <Tag icon="pi pi-dollar" :value="product.price.toFixed(2)" severity="primary"
                            class="absolute dark:!bg-surface-900" style="left: 4px; top: 4px"></Tag>
                    </div>
                </template>
                <template #title>{{ truncateTitle(product.title, 20) }}</template>
                <template #subtitle>{{ product.category }}</template>
                <template #footer>
                    <div class="flex gap-4 mt-1">
                        <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" /> -->
                        <NuxtLink class="w-full" :to="{ name: 'product-id', params: { id: product.id } }">
                            <Button label="View" icon="pi pi-search" class="w-full" />
                        </NuxtLink>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
