<template>
  <Toast />
  <div v-if="cart.length > 0">
    <div class="flex justify-center items-center h-screen">
      <Card class="w-11/12">
        <template #content>
          <DataTable :value="cart" tableStyle="min-width: 50rem">
            <template #header>
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="text-xl font-bold">Order details</span>
              </div>
            </template>
            <Column field="title" header="Name"></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img :src="slotProps.data.image" :alt="slotProps.data.image" class="w-24 rounded" />
              </template>
            </Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="price" header="Price">
              <template #body="slotProps">
                <span>${{ (slotProps.data.price * slotProps.data.quantity).toFixed(2) }}</span>
              </template>
            </Column>
            <template #footer> In total there are {{ totalQuantity }} products, totaling $<span class="text-bold">{{
              cartTotal.toFixed(2) }}</span>.
            </template>
          </DataTable>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="Cancel order" severity="danger" outlined class="w-full" @click="cancelOrder" />
            <Button label="Confirm order" class="w-full" @click="submitOrder" />
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
const user = ref({ name: '', email: '' });

const cartTotal = computed(() =>
  cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
);
const totalQuantity = computed(() => {
  return cart.value.reduce((total, product) => total + product.quantity, 0);
});
function submitOrder() {
  console.log('Order submitted', cart.value, user.value);
  cartStore.clearCart();
  toast.add({ severity: 'success', summary: 'Order placed!', life: 3000 });
}

function cancelOrder() {
  console.log('Order cancelled');
  cartStore.clearCart();
  toast.add({ severity: 'info', summary: 'Order cancelled', life: 3000 });
}
</script>