<script setup lang="ts">

const props = defineProps<{
    title: string;
    description: string;
    image: string;
}>();

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 text-800 mb-12">
        <div class="flex flex-col justify-center items-center text-center p-5 md:ml-5">
            <p class="block text-3xl md:text-6xl font-bold mb-2">{{ title }}</p>
            <p class="block text-lg md:text-2xl mb-4 md:mr-20">{{ description }}</p>
        </div>
        <div class="flex justify-center md:mr-5 p-5">
            <img :src="image" class="w-full md:w-auto" alt="" :class="{ 'clip-path-polygon': true }" />
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 768px) {
    .clip-path-polygon {
        clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);
    }
}
</style>