import axios from "axios";

function currentScope() {
  return window.location.pathname.startsWith("/admin") ? "admin" : "client";
}

function tokenKeys() {
  return currentScope() === "admin"
    ? { access: "admin_access_token", refresh: "admin_refresh_token" }
    : { access: "access_token", refresh: "refresh_token" };
}

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosRequest.interceptors.request.use(
  (config) => {
    const { access } = tokenKeys();
    const accessToken = localStorage.getItem(access);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let pendingQueue = [];

function resolveQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)));
  pendingQueue = [];
}

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRoute =
      originalRequest?.url?.includes("/Account/login") ||
      originalRequest?.url?.includes("/Account/register") ||
      originalRequest?.url?.includes("/Account/refresh-token");

    if (error.response?.status !== 401 || isAuthRoute || originalRequest._retry) {
      return Promise.reject(error);
    }

    const { access, refresh } = tokenKeys();
    const refreshToken = localStorage.getItem(refresh);
    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosRequest(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/Account/refresh-token`,
        { refreshToken }
      );
      const { accessToken, refreshToken: newRefreshToken } = data.data;

      localStorage.setItem(access, accessToken);
      localStorage.setItem(refresh, newRefreshToken);

      resolveQueue(null, accessToken);
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosRequest(originalRequest);
    } catch (refreshError) {
      resolveQueue(refreshError, null);
      localStorage.removeItem(access);
      localStorage.removeItem(refresh);
      window.location.href = currentScope() === "admin" ? "/login" : "/NewLoginPage";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export const FILE_BASE_URL = import.meta.env.VITE_APP_API_URL.replace(/\/api\/?$/, "");

export function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${FILE_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export default axiosRequest;