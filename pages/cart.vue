<template>
  <div v-if="cart.length > 0">
    <div class="grid grid-cols-3">
      <div class="col-start-2 text-center justify-self-center mt-3 text-lg font-medium">
        Total: <span class="font-bold">${{ total.toFixed(2) }}</span>
      </div>
      <div class="col-start-3 justify-self-end mt-2 mr-4">
        <NuxtLink to="/checkout" class="">
          <Button label="Proceed to Checkout" icon="pi pi-shopping-cart" class="" />
        </NuxtLink>
      </div>
    </div>
    <DataView :value="cart">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
              <div class="md:w-40 relative">
                <img class="block xl:block mx-auto rounded w-full" :src="item.image" :alt="item.name" />
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                  <div>
                    <div class="text-lg font-medium mt-2">
                      {{ item.title }}
                    </div>
                    <div class="mt-6">
                      <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">Quantity</span>
                      <!-- Add v-model: item.quantity -->
                      <div class="flex flex-col mt-2 w-20 h-12">
                        <InputNumber inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid
                          class="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <span class="text-xl font-semibold">${{ item.price }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-trash" severity="danger" @click="removeFromCart(item.id)" label="Remove" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>

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
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';
const toast = useToast();
const cartStore = useCartStore();
const cart = computed(() => cartStore.cart);
const total = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
function removeFromCart(id: number) {
  cartStore.removeProduct(id);
  toast.add({ severity: 'success', summary: 'Removed from cart', life: 3000 });
}
</script>
