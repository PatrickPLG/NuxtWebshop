// middleware/auth.ts
import { useAuthStore } from '~/stores/auth';
import {jwtDecode} from 'jwt-decode';
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  interface DecodedToken {
    'exp': number;
  }

  if (authStore.token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(authStore.token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
    }
  }
});