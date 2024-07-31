<script setup lang="ts">

const toast = useToast();
const { cart, cartStore } = useCart();

function removeFromCart(id: number) {
    cartStore.removeProduct(id);
    toast.add({ severity: 'success', summary: 'Removed from cart', life: 3000 });
}
watch(cart, (newCart) => {
    newCart.forEach(item => {
        if (item.quantity === 0) {
            removeFromCart(item.id);
        }
    });
}, { deep: true });
</script>


<template>
    <Card class="w-11/12 shadow-lg rounded-lg">
        <template #content>
            <DataTable :value="cart" tableStyle="min-width: 50rem" class="">
                <template #header>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="text-xl font-bold">Cart summery</span>
                    </div>
                </template>
                <Column field="title" header="Product name"></Column>
                <Column header="">
                    <template #body="slotProps">
                        <img :src="slotProps.data.image" :alt="slotProps.data.image" class="w-24 rounded" />
                    </template>
                </Column>
                <Column field="quantity" header="Quantity">
                    <template #body="slotProps">
                        <div class="">
                            <InputNumber v-model="slotProps.data.quantity" inputId="minmax-buttons" mode="decimal"
                                showButtons :min="0" :max="100" class="" style="" />
                        </div>
                    </template>
                </Column>
                <Column field="price" header="Price">
                    <template #body="slotProps">
                        <span>${{ (slotProps.data.price * slotProps.data.quantity).toFixed(2) }}</span>
                    </template>
                </Column>
                <Column field="remove">
                    <template #body="slotProps">
                        <Button icon="pi pi-trash" severity="danger" @click="removeFromCart(slotProps.data.id)"
                            label="" />
                    </template>
                </Column>
                <template #footer>
                    <div class="flex justify-end items-end">
                        In total there are {{ cartStore.totalQuantity }} products, totaling $<span class="text-bold">{{
                            cartStore.cartTotal.toFixed(2) }}</span>.
                    </div>
                </template>
            </DataTable>
        </template>
        <template #footer>
            <CartFooter />
        </template>
    </Card>
</template>