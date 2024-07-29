import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { Product } from "~/types/product";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


const api = {
  getProducts(): Promise<AxiosResponse<Product[]>> {
    return apiClient.get<Product[]>("/products");
  },
  getProduct(id: number): Promise<AxiosResponse<Product>> {
    return apiClient.get<Product>(`/products/${id}`);
  },
  getProductByCategory(category: string): Promise<AxiosResponse<Product[]>> {
    return apiClient.get<Product[]>(`/products/category/${category}`);
  },
  async getAllCategories(): Promise<AxiosResponse<{ category: string, icon: string }[]>> {
    const response = await apiClient.get<string[]>("/products/categories");
    const categoriesWithIcons = response.data.map(category => ({
      category: capitalizeFirstLetter(category),
      icon: getCategoryIcon(category)
    }));
    return {
      ...response,
      data: categoriesWithIcons
    };
  },
};

export default api;