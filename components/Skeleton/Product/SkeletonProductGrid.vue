<script setup lang="ts">

</script>

<template>
    <div class="ml-5 mr-5">
        <div class="flex justify-end mb-4">
            <Skeleton width="12rem" height="2.5rem" />
        </div>
        <div class="grid grid-cols-3 gap-10">
            <div v-for="n in 6" :key="n">
                <Card>
                    <template #header>
                        <Skeleton class="h-96 w-full" />
                    </template>
                    <template #title>
                        <Skeleton width="70%" />
                    </template>
                    <template #subtitle>
                        <Skeleton width="50%" />
                    </template>
                    <template #footer>
                        <div class="flex gap-4 mt-1">
                            <Skeleton width="100%" height="2.5rem" />
                            <Skeleton width="100%" height="2.5rem" />
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>
