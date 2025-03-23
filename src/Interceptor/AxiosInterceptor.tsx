import axios, { InternalAxiosRequestConfig } from "axios";
import { navigateToLogin } from "../Services/AuthService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  // baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setupResponseInterceptor = (
  navigate: any,
  dispatch: any,
) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const storedToken = localStorage.getItem("token")
      if (error.response?.status == 401 && storedToken != null) {
        navigateToLogin(navigate, dispatch);
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
