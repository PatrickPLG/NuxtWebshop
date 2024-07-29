<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const emit = defineEmits(['remove']);

function removeFromCart(id: number) {
    emit('remove', id);
}
</script>

<template>
    <div>
        <img :src="item.image" alt="product image" />
        <p>{{ item.title }}</p>
        <p>{{ item.price }}</p>
        <!-- <input type="number" v-model="item.quantity" /> -->
        <button @click="removeFromCart(item.id)">Remove</button>
    </div>
</template>
