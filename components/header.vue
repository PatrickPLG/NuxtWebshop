<template>
    <header class="bg-gray-800 text-white py-4 px-6">
        <div class="container mx-auto flex items-center justify-between">
            <h1 class="text-2xl font-bold">My Website</h1>
            <nav>
                <ul class="flex space-x-4">
                    <li><a href="#" class="hover:text-gray-300">Home</a></li>
                    <li><a href="#" class="hover:text-gray-300">About</a></li>
                    <li><a href="#" class="hover:text-gray-300">Services</a></li>
                    <li><a href="#" class="hover:text-gray-300">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>
/* Add any custom styles here */
</style>