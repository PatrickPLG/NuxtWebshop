import { defineStore } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const errorMessage = ref<string | null>(null);
  const router = useRouter();

  // Initialize token from localStorage on the client side
  onMounted(() => {
    if (typeof window !== 'undefined') {
      token.value = localStorage.getItem('token');
    }
  });

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function clearToken() {
    token.value = '';
    localStorage.removeItem('token');
  }

  const isLoggedIn = computed(() => !!token.value);

  async function login(username: string, password: string) {
    try {
      const response = await axios.post('https://localhost:8081/api/auth/login', {
        username,
        password,
      });
      const newToken = response.data.token;
      setToken(newToken);
      router.push('/account/dashboard');
    } catch (error: any) {
      console.log(errorMessage.value);
      if (error.response && error.response.data) {
        console.log(error.response.data);
        errorMessage.value = error.response.data;
      }
    }
  }

  async function register(username: string, password: string) {
    try {
      const response = await axios.post('https://localhost:8081/api/auth/register', {
        username,
        password,
      });
      const newToken = response.data.token;
      setToken(newToken);
      router.push('/account/dashboard');
    } catch (error: any) {
      if (error.response && error.response.data) {
        errorMessage.value = error.response.data.message;
      }
    }
  }

  async function logout() {
    clearToken();
    router.push('/');
  }

  return { token, setToken, clearToken, isLoggedIn, login, register, logout, errorMessage };
});