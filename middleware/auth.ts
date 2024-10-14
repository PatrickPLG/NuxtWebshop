// middleware/auth.ts
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const authStore = useAuthStore();
    if (!authStore.token) {
      return navigateTo('/account/login');
    }
  }
});