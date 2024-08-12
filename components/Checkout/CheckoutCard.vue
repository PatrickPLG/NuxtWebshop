<script setup lang="ts">
import type { User } from '~/types/user';
const cartStore = useCartStore();
const user = ref<User>({
    name: '',
    email: '',
    phone: '',
    address: ''
});
</script>

<template>
    <Card class="w-7/12 p-6 shadow-lg rounded-lg">
        <template #title>
            <div class="flex items-center">
                <i class="pi pi-shopping-cart mr-2"></i>
                Checkout Order
            </div>
        </template>
        <template #subtitle>
            <div class="text-gray-600">
                {{ cartStore.totalQuantity }} products totaling ${{ cartStore.cartTotal.toFixed(2) }}
            </div>
        </template>
        <template #content>
            <CheckoutContent v-model:user="user" />
        </template>
        <template #footer>
            <div class="flex justify-end gap-4 mt-4">
                <CancelOrderButton />
                <CheckoutOrderButton :user="user" />
            </div>
        </template>
    </Card>
</template>