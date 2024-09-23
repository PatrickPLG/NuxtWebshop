<script setup lang="ts">

const toast = useToast();

const cartStore = useCartStore();
function cancelOrder() {
    cartStore.clearCart();
    toast.add({ severity: 'info', summary: 'Order cancelled', life: 3000 });
}
</script>

<template>
    <Button label="Cancel order" severity="danger" outlined class="w-full md:w-auto" @click="cancelOrder" />
</template>