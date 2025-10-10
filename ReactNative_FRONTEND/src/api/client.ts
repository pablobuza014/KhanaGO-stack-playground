import axios from "axios";
import Constants from "expo-constants";

// Lee las vars inyectadas por Expo (app.config.js)
const extra =
  (Constants?.expoConfig?.extra ??
    // compatibilidad con versiones antiguas de Expo
    (Constants as any)?.manifest?.extra ??
    (Constants as any)?.manifestExtra) ||
  {};

const API_BASE_URL = (extra as any).API_BASE_URL as string | undefined;
const API_BASE_PATH = (extra as any).API_BASE_PATH as string | undefined;

// Valores por defecto si no hay .env
const baseURL = API_BASE_URL ?? "http://127.0.0.1:8000";
const basePath = (API_BASE_PATH ?? "").replace(/\/+$/, "");

// Cliente Axios
const api = axios.create({
  baseURL: `${baseURL}${basePath}`,
  timeout: 10000,
});

// CRUD Gymkhanas
export const GymkhanaAPI = {
  list: (params?: { q?: string; skip?: number; limit?: number }) =>
    api.get("/gymkhanas", { params }).then((r) => r.data),

  get: (id: number) => api.get(`/gymkhanas/${id}`).then((r) => r.data),

  create: (payload: any) => api.post("/gymkhanas", payload).then((r) => r.data),

  update: (id: number, payload: any) =>
    api.put(`/gymkhanas/${id}`, payload).then((r) => r.data),

  remove: (id: number) => api.delete(`/gymkhanas/${id}`),
};

export default api;
