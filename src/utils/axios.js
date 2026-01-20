import axios from "axios";
import { store } from "@/redux/store";
import { logout } from "@/redux/slice/authSlice";
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
  (error) => Promise.reject(error),
);

/* ======================
   RESPONSE INTERCEPTOR
====================== */
let isLoggingOut = false;

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !isLoggingOut) {
      isLoggingOut = true;

      toast.error("Session expired please login again!");
      localStorage.removeItem("token");

      store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default api;
