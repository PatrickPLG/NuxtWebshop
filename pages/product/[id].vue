<script setup lang="ts">
import api from '~/services/api';
import { useCartStore } from '~/stores/cart';
import type { Product } from '~/types/product';

const toast = useToast();
const route = useRoute();
const product = ref();
const cartStore = useCartStore();

onMounted(async () => {
  try {
    const response = await api.getProduct(parseInt(route.params.id.toString()));
    product.value = response.data;
    product.value.quantity = 1;
    console.log('Product:', product.value);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

function addToCart(product: Product, quantity: number) {
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
  <div v-if="product">
    <div class=" py-8">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
          <div class="md:flex-1 px-4">
            <div class="rounded-lg mb-4">
              <img class="w-full h-full object-cover rounded-sm" :src="product.image" alt="Product Image">
            </div>
          </div>
          <div class="md:flex-1 px-4">
            <h2 class="text-2xl font-bold">{{ product.title }}</h2>
            <p class=" text-sm mb-4">
              {{ product.category }}
            </p>
            <div class="flex mb-4">
              <div class="mr-4">
                <span class="font-bold ">Price:</span>
                <span class=""> ${{ product.price }}</span>
              </div>
              <div>
                <span class="font-bold">Availability:</span>
                <span class=""> In Stock</span>
              </div>
            </div>
            <div class="mb-4">
              <span class="font-bold">Product Description:</span>
              <p class=" text-sm mt-2">
                {{ product.description }}
              </p>
            </div>
            <div class="grid grid-cols-2 mb-4">
              <InputNumber v-model="product.quantity" inputId="minmax-buttons" mode="decimal" showButtons :min="1"
                :max="100" :invalid="product.quantity === null" />
              <Button label="Add to cart" @click="addToCart(product, product.quantity)" icon="pi pi-shopping-cart"
                class="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>