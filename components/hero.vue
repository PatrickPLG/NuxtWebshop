<script setup lang="ts">

const props = defineProps<{
    title: string;
    description: string;
    image: string;
}>();

</script>

<template>
    <div class="grid grid-cols-2 text-800 mb-12">
        <div class="place-content-center ml-5 text-center">
            <p class="block text-6xl font-bold mb-1">{{ title }}</p>
            <p class="block text-2xl mr-20">{{ description }}</p>
        </div>
        <div class="mr-5">
            <img :src="image" class="w-full" alt="" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
        </div>
    </div>
</template>