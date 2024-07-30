<script setup lang="ts">
const props = defineProps({
    label: String,
    icon: String,
    link: String,
});
</script>

<template>
    <NuxtLink :to="link" class="">
        <Button :label="label" :icon="icon" class="w-full" />
    </NuxtLink>
</template>