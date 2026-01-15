import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ future cookie support
});

/* ======================
   REQUEST INTERCEPTOR
====================== */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   RESPONSE INTERCEPTOR
====================== */
let isRedirecting = false; // 🔥 prevents multiple toasts

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !isRedirecting) {
      isRedirecting = true;

      toast.error(
        status === 401
          ? "Session expired. Please login again."
          : "Admin access required"
      );

      localStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/auth";
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default api;
