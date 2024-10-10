import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { Product } from "~/types/product";

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

const api = {
  getProducts(): Promise<AxiosResponse<Product[]>> {
    return apiClient.get<Product[]>("/products");
  },
  getProduct(id: number): Promise<AxiosResponse<Product>> {
    return apiClient.get<Product>(`/products/${id}`);
  },
  getProductByCategory(categoryId: number): Promise<AxiosResponse<Product[]>> {
    return apiClient.get<Product[]>(`/categories/${categoryId}/products`);
  },
  async getAllCategories(): Promise<AxiosResponse<{ category: string; icon: string; id: number }[]>> {
    const response = await apiClient.get<{ id: number; name: string }[]>("/categories");
    const categoriesWithIcons = response.data.map((category) => ({
      category: capitalizeFirstLetter(category.name),
      icon: getCategoryIcon(category.name),
      id: category.id,
    }));
    return {
      ...response,
      data: categoriesWithIcons,
    };
  },
};

export default api;