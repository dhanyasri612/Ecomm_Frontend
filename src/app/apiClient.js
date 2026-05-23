import axios from "axios";

/**
 * Normalizes the API base URL so requests always hit /api/v1/...
 * Accepts any of these on Vercel: host, host/api, host/v1, host/api/v1
 */
function normalizeApiBaseUrl(raw) {
  const fallback = "/api";

  if (!raw?.trim()) {
    return fallback;
  }

  const trimmed = raw.trim().replace(/\/$/, "");

  if (!trimmed.startsWith("http")) {
    return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
  }

  try {
    const { origin } = new URL(trimmed);
    return `${origin}/api`;
  } catch {
    return fallback;
  }
}

export const apiBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};
