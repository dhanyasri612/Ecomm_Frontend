import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "/api";
let baseUrl = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

// Ensure remote API URLs include /api (e.g. https://your-api.onrender.com/api)
if (baseUrl.startsWith("http") && !baseUrl.endsWith("/api")) {
  baseUrl = `${baseUrl}/api`;
}

export const apiBaseUrl = baseUrl;

export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};
