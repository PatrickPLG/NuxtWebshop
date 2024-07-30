<script setup lang="ts">
import type { User } from '~/types/user';
const toast = useToast();
const props = defineProps<{
    user: User;
}>();

const cartStore = useCartStore();

function submitOrder(user: User) {
    if (!user.name || !user.email || !user.phone || !user.address) {
        toast.add({ severity: 'error', summary: 'Validation Error', detail: 'All fields are required', life: 3000 });
        return;
    }
    cartStore.clearCart();
    toast.add({ severity: 'success', summary: 'Order placed!', life: 3000 });
}
</script>

<template>
    <Button label="Submit order" class="w-full" @click="submitOrder(user)" />
</template>