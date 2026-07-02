/**
 * KusiGo — Cliente HTTP base
 * Todos los módulos de API importan `api` desde aquí.
 */
import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

// ── Adjunta el JWT en cada request si existe ────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("kusigo_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Manejo global de 401: limpia sesión y redirige al login del terapeuta ───
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("kusigo_token");
      // El App.tsx reacciona al evento para ir a "t-login"
      window.dispatchEvent(new Event("kusigo:unauthorized"));
    }
    return Promise.reject(err);
  }
);
