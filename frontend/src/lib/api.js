/* eslint-disable no-constant-binary-expression */
import axios from "axios";

const api = axios.create({
  baseURL:
    `${import.meta.env.VITE_SERVER_API}/api` || "http://192.168.0.111:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    console.error("Request error: ", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err?.response?.data?.error === "InvalidToken") {
      localStorage.removeItem("token");
    } else if (err?.response?.data?.error === "TokenExpired") {
      localStorage.removeItem("token");
    }
    return Promise.reject(err?.response?.data?.message || err);
  },
);

export default api;
