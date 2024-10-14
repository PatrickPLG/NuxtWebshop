// pages/account.vue
<template>
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function login() {
  try {
    const response = await axios.post('https://localhost:8081/api/auth/login', {
      username: username.value,
      password: password.value,
    });
    const token = response.data.token;
    authStore.setToken(token);
    router.push('/account/dashboard');
  } catch (error) {
    console.error(error);
  }
}

async function register() {
  try {
    const response = await axios.post('https://localhost:8081/api/auth/register', {
      username: username.value,
      password: password.value,
    });
    const token = response.data.token;
    authStore.setToken(token);
    router.push('/account/dashboard');
  } catch (error) {
    console.error(error);
  }
}
</script>