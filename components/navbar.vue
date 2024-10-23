<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import api from '~/services/api';
import { useAuthStore } from '~/stores/auth';
import LoginRegisterModal from '~/components/LoginRegisterModal.vue';

const categories = ref([]);
const dropdownOpen = ref(false);
const dropdownRef = ref(null);
const router = useRouter();
const authStore = useAuthStore();
const loginRegisterModalRef = ref(null);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(async () => {
  try {
    const response = await api.getAllCategories();
    categories.value = response.data.map(category => ({
      label: category.category,
      icon: category.icon,
      id: category.id,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Category',
    icon: 'pi pi-bars',
    items: []
  },
  {
    label: 'Account',
    icon: 'pi pi-user',
    command: () => {
      console.log(authStore.isLoggedIn);
      if (authStore.isLoggedIn) {
        router.push('/account/dashboard');
      } else {
        loginRegisterModalRef.value.visible = true;
      }
    }
  },
  {
    label: 'Cart',
    icon: 'pi pi-shopping-cart',
    command: () => router.push('/cart')
  }
]);

watch(categories, (newCategories) => {
  items.value[1].items = newCategories.map(category => ({
    label: category.label,
    icon: category.icon,
    command: () => router.push(`/category/${category.id}`)
  }));
});
</script>

<template>
  <nav class="bg-white shadow-md p-2 rounded-none sticky top-0 z-50">
    <Menubar :model="items" class="flex justify-between items-center rounded-none" />
    <LoginRegisterModal ref="loginRegisterModalRef" />
  </nav>
</template>