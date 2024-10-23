import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { Product } from "~/types/product";
import { useAuthStore } from '~/stores/auth';

// Function to retrieve token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Create an Axios instance configured for your backend API
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:8081/api", // Your backend API base URL
  withCredentials: false, // Adjust if your backend requires credentials (e.g., for cookies)
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the Authorization header in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle token expiration
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      const errorDescription = error.response.headers['www-authenticate'];
      console.log('Interceptor:', errorDescription);
      if (errorDescription && errorDescription.includes('invalid_token')) {
        const authStore = useAuthStore();
        authStore.clearToken();
        authStore.logout();
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  getProducts(): Promise<AxiosResponse<Product[]>> {
    return apiClient.get('/products');
  },
  getProduct(id: number): Promise<AxiosResponse<Product>> {
    return apiClient.get(`/products/${id}`);
  },
  getProductByCategory(categoryId: number): Promise<AxiosResponse<Product[]>> {
    return apiClient.get(`/categories/${categoryId}/products`);
  },
  async getAllCategories(): Promise<AxiosResponse<{ category: string; icon: string; id: number }[]>> {
    return apiClient.get('/categories');
  },
};

export default api;