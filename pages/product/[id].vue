<script setup lang="ts">
import api from '~/services/api';
const route = useRoute();
const product = ref();
onMounted(async () => {
  try {
    const response = await api.getProduct(parseInt(route.params.id.toString()));
    product.value = response.data;
    product.value.quantity = 1;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

</script>

<template>
  <div v-if="product">
    <ProductDetailPage :product="product" />
  </div>
  <div v-else>
    <SkeletonProductDetailPage />
  </div>
</template>