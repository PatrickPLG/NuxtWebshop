<template>
    <div class="py-8">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row -mx-4">
                <div class="md:flex-1 px-4">
                    <div class="rounded-lg mb-4">
                        <Skeleton class="w-full h-96" />
                    </div>
                </div>
                <div class="md:flex-1 px-4">
                    <Skeleton width="70%" height="2rem" class="mb-4" />
                    <Skeleton width="50%" height="1rem" class="mb-4" />
                    <div class="flex mb-4">
                        <Skeleton width="30%" height="1.5rem" class="mr-4" />
                        <Skeleton width="30%" height="1.5rem" />
                    </div>
                    <div class="mb-4">
                        <Skeleton width="50%" height="1.5rem" class="mb-2" />
                        <Skeleton width="100%" height="4rem" />
                    </div>
                    <div class="grid grid-cols-2 mb-4">
                        <Skeleton width="100%" height="3rem" />
                        <div class="ml-4">
                            <Skeleton width="100%" height="3rem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>
