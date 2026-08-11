import { jwtDecode } from "jwt-decode";
import { axiosRequest } from "./client";

function resolveScope(explicitScope) {
  if (explicitScope) return explicitScope;
  return window.location.pathname.startsWith("/admin") ? "admin" : "client";
}

function keys(scope) {
  return scope === "admin"
    ? { access: "admin_access_token", refresh: "admin_refresh_token" }
    : { access: "access_token", refresh: "refresh_token" };
}

export function saveTokens(accessToken, refreshToken, scope) {
  const { access, refresh } = keys(resolveScope(scope));
  localStorage.setItem(access, accessToken);
  if (refreshToken) localStorage.setItem(refresh, refreshToken);
}

export function destroyToken(scope) {
  const { access, refresh } = keys(resolveScope(scope));
  localStorage.removeItem(access);
  localStorage.removeItem(refresh);
  window.location.reload();
}

export function getRefreshToken(scope) {
  const { refresh } = keys(resolveScope(scope));
  return localStorage.getItem(refresh);
}

export function getToken(scope) {
  try {
    const { access } = keys(resolveScope(scope));
    return jwtDecode(localStorage.getItem(access));
  } catch (error) {
    return null;
  }
}

export async function login(email, password, scope) {
  const { data } = await axiosRequest.post("/Account/login", {
    email,
    password,
  });
  saveTokens(data.data.accessToken, data.data.refreshToken, scope);
  return data.data;
}

export function logout(scope) {
  destroyToken(scope);
}

export async function register(email, password, firstName, lastName) {
  const { data } = await axiosRequest.post("/Account/register", {
    email,
    password,
    firstName,
    lastName,
  });
  return data;
}

export async function getMe() {
  const { data } = await axiosRequest.get("/Account/me");
  return data.data;
}

export async function updateProfile(payload) {
  const { data } = await axiosRequest.put("/Account/profile", payload);
  return data.data;
}

export async function changePassword(currentPassword, newPassword) {
  const { data } = await axiosRequest.put("/Account/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
}
