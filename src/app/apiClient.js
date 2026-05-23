import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "/api";
const baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export const apiBaseUrl = baseUrl;

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};
