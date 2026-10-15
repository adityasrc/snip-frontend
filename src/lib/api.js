import axios from "axios";
import { clearAuth } from "./utils";

export const API_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || "http://localhost:10000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
