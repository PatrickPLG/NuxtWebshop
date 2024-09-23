<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from '#imports';
import api from '~/services/api';

const categories = ref<{ label: string, icon: string, route: string }[]>([]);
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        route: '/'
    },
    {
        label: 'Category',
        icon: 'pi pi-bars',
        items: []
    },
    {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        route: '/cart'
    },
]);

onMounted(async () => {
    try {
        const response = await api.getAllCategories();
        categories.value = response.data.map(category => ({
            label: category.category,
            icon: category.icon,
            route: `/category/${category.category.toLowerCase()}`
        }));
        // Add categories to the 'Category' submenu
        const categoryMenu = items.value.find(item => item.label === 'Category');
        if (categoryMenu && categoryMenu.items) {
            (categoryMenu.items as { label: string; icon: string; route: string }[]).push(...categories.value);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
});

const route = useRoute();
const isIndexPage = computed(() => route.path === '/');
</script>

<template>
    <Toast />
    <div :class="[{ 'mb-4': !isIndexPage }, 'sticky top-0 z-50 shadow-md bg-white']" class="card">
        <Menubar :model="items" class="rounded-none w-full flex flex-wrap">
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate" class="flex items-center p-2">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action"
                    class="flex items-center p-2">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
                </a>
            </template>
        </Menubar>
    </div>
</template>
