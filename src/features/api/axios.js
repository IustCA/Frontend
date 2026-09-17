import axios from "axios";

const TOKEN_STORAGE_KEY = "access_token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  headers: { "Content-Type": "application/json" },
});
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() || null : null;
};

export const clearAccessToken = () => {
  document.cookie = `${TOKEN_STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.dispatchEvent(new Event("auth-change"));
};

export const setAuthTokens = ({ access, refresh } = {}) => {
  if (access) {
    document.cookie = `${TOKEN_STORAGE_KEY}=${access}; max-age=${60 * 60 * 24 * 7}; path=/; SameSite=Lax;`;
  }
  if (refresh) {
    document.cookie = `refresh_token=${refresh}; max-age=${60 * 60 * 24 * 30}; path=/; SameSite=Lax;`;
  }
  window.dispatchEvent(new Event("auth-change"));
};
const getAccessToken = () => getCookie(TOKEN_STORAGE_KEY);

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 498) {
      clearAccessToken();
    }
    return Promise.reject(error);
  },
);

export default api;
