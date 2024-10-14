<script setup lang="ts">
import type { Product } from '~/types/product';
import { useToast } from 'primevue/usetoast';
import { useCartStore } from '~/stores/cart';
import { useFavoritesStore } from '~/stores/favorites';

const props = defineProps<{ product: Product, buttonLabel?: string }>();
const toast = useToast();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

function addToCart(product: Product, quantity: number) {
    if (quantity === 0 || quantity === null) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Quantity cannot be 0', life: 3000 });
        return;
    }
    cartStore.addProduct(product, quantity);
    toast.add({ severity: 'success', summary: 'Added to cart', detail: `${quantity}x ${product.title}`, life: 3000 });
}

function toggleFavorite(product: Product) {
    if (favoritesStore.isFavorite(product.id)) {
        favoritesStore.removeFavorite(product.id);
        toast.add({ severity: 'info', summary: 'Removed from favorites', detail: product.title, life: 3000 });
    } else {
        favoritesStore.addFavorite(product);
        toast.add({ severity: 'success', summary: 'Added to favorites', detail: product.title, life: 3000 });
    }
}
</script>

<template>
    <Button :label="props.buttonLabel"
        @click="addToCart(props.product, props.product.quantity ? props.product.quantity : 1)"
        icon="pi pi-shopping-cart" class="w-full" />
    <Button icon="pi pi-heart" class="w-full" @click="toggleFavorite(props.product)" />
</template>