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
};

export default api;
