// stores/auth.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);

  if (typeof window !== 'undefined') {
    token.value = localStorage.getItem('token');
  }

  function setToken(newToken: string) {
    token.value = newToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', newToken);
    }
  }

  function clearToken() {
    token.value = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  function logout() {
    clearToken();
    navigateTo('/account/login');
  }

  return { token, setToken, clearToken, logout };
});