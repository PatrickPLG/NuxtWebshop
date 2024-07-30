<script lang="ts">

</script>

<template>
    <div class="flex justify-center items-center mb-5">
        <Card class="w-11/12">
            <template #content>
                <DataTable :value="cart" tableStyle="min-width: 50rem">
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
                            In total there are {{ totalQuantity }} products, totaling $<span class="text-bold">{{
                                cartTotal.toFixed(2) }}</span>.
                        </div>
                    </template>
                </DataTable>
            </template>
            <template #footer>
                <div class="flex justify-end items-end gap-4 mt-1">
                    <Button label="Cancel order" severity="danger" outlined class="w-32" @click="cancelOrder" />
                    <ButtonLink label="Proceed to Checkout" icon="pi pi-shopping-cart" link="/checkout" />
                </div>
            </template>
        </Card>
    </div>
</template>