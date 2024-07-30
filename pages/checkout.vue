<template>
  <Toast />
  <div v-if="cart.length > 0">
    <div class="flex justify-center items-center">
      <Card class="w-7/12 p-6 shadow-lg rounded-lg">
        <template #title>
          <div class="flex items-center">
            <i class="pi pi-shopping-cart mr-2"></i>
            Checkout Order
          </div>
        </template>
        <template #subtitle>
          <div class="text-gray-600">
            {{ totalQuantity }} products totaling ${{ cartTotal.toFixed(2) }}
          </div>
        </template>
        <template #content>
          <div class="p-fluid space-y-4">
            <div class="field">
              <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
              <IconField>
                <InputIcon class="pi pi-user" />
                <InputText id="name" v-model="user.name" class="pl-10 w-full" />
              </IconField>
              <small v-if="!user.name" class="p-error">Name is required.</small>
            </div>
            <div class="field">
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <IconField>
                <InputIcon class="pi pi-envelope" />
                <InputText id="email" v-model="user.email" class="pl-10 w-full" />
              </IconField>
              <small v-if="!user.email" class="p-error">Email is required.</small>
            </div>
            <div class="field">
              <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
              <IconField>
                <InputIcon class="pi pi-phone" />
                <InputMask id="phone" v-model="user.phone" mask="(999) 999-9999" class="pl-10 w-full" />
              </IconField>
              <small v-if="!user.phone" class="p-error">Phone is required.</small>
            </div>
            <div class="field">
              <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
              <IconField>
                <InputIcon class="pi pi-home" />
                <InputText id="address" v-model="user.address" class="pl-10 w-full" />
              </IconField>
              <small v-if="!user.address" class="p-error">Address is required.</small>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-4 mt-4">
            <Button label="Cancel order" severity="danger" outlined class="w-full" @click="cancelOrder" />
            <Button label="Submit order" class="w-full" @click="submitOrder" />
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
import { ref, computed } from 'vue';
import { useCartStore } from '~/stores/cart';

const toast = useToast();
const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
const user = ref({ name: '', email: '', phone: '', address: '' });
const cartTotal = computed(() =>
  cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0)
);
const totalQuantity = computed(() => {
  return cart.value.reduce((total, product) => total + product.quantity, 0);
});
function submitOrder() {
  if (!user.value.name || !user.value.email || !user.value.phone || !user.value.address) {
    toast.add({ severity: 'error', summary: 'Validation Error', detail: 'All fields are required', life: 3000 });
    return;
  }
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