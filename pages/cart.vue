<template>

  <div v-if="cart.length > 0">
    <Toast />
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
                  <InputNumber v-model="slotProps.data.quantity" inputId="minmax-buttons" mode="decimal" showButtons
                    :min="0" :max="100" class="" style="" />
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
                <Button icon="pi pi-trash" severity="danger" @click="removeFromCart(slotProps.data.id)" label="" />
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
            <NuxtLink to="/checkout" class="">
              <Button label="Proceed to Checkout" icon="pi pi-shopping-cart" class="w-64" />
            </NuxtLink>
          </div>
        </template>
      </Card>
    </div>
  </div>
  <div v-else>
    <div class="text-center">
      <h1 class="text-2xl font-semibold">Your cart is empty</h1>
      <NuxtLink to="/">
        <Button label="Go to Shop" icon="pi pi-shopping-cart" class="mt-4" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';

const toast = useToast();
const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);

const cartTotal = computed(() =>
  cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
);
const totalQuantity = computed(() => {
  return cart.value.reduce((total, product) => total + product.quantity, 0);
});
watch(
  () => useCartStore().cart,
  (newCart) => {
    useCartStore().saveCart();
  },
  { deep: true }
);
function removeFromCart(id: number) {
  cartStore.removeProduct(id);
  toast.add({ severity: 'success', summary: 'Removed from cart', life: 3000 });
}

function cancelOrder() {
  console.log('Order cancelled');
  cartStore.clearCart();
  toast.add({ severity: 'info', summary: 'Order cancelled', life: 3000 });
}

watch(cart, (newCart) => {
  newCart.forEach(item => {
    if (item.quantity === 0) {
      removeFromCart(item.id);
    }
  });
}, { deep: true });
</script>