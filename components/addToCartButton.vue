<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/types/product';

const props = defineProps<{ product: Product, buttonLabel?: string }>();


const toast = useToast();
const cartStore = useCartStore();


function addToCart(product: Product, quantity: number) {
    console.log('Adding to cart:', product, quantity);
    if (quantity === 0 || quantity === null) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Quantity cannot be 0', life: 3000 });
        return;
    }
    cartStore.addProduct(product, quantity);
    toast.add({ severity: 'success', summary: 'Added to cart', detail: `${quantity}x ${product.title}`, life: 3000 });
}
</script>

<template>
    <Toast />
    <Button :label="props.buttonLabel"
        @click="addToCart(props.product, props.product.quantity ? props.product.quantity : 1)"
        icon="pi pi-shopping-cart" class="w-full" />
</template>