export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;

export const DEFAULT_HTTP_TIMEOUT_MS = 30_000;

export const API_ENDPOINT = {
  AUTH_LOGIN: "auth/login",
  AUTH_REFRESH: "auth/refresh",
  AUTH_LOGOUT: "auth/logout",
  AUTH_ME: "auth/me",
  AUTH_SIGNUP: "auth/signup",
  AUTH_FORGOT_PASSWORD: "auth/forgot-password",
  AUTH_RESET_PASSWORD: "auth/reset-password",
} as const;

/** Paths that do not require a Bearer access token. */
export const PUBLIC_API_PATHS = [
  API_ENDPOINT.AUTH_LOGIN,
  API_ENDPOINT.AUTH_REFRESH,
  API_ENDPOINT.AUTH_LOGOUT,
  API_ENDPOINT.AUTH_SIGNUP,
  API_ENDPOINT.AUTH_FORGOT_PASSWORD,
  API_ENDPOINT.AUTH_RESET_PASSWORD,
] as const;

/** GET paths allowed before Redux session is hydrated (bootstrap probe). */
export const SESSION_BOOTSTRAP_API_PATHS = [API_ENDPOINT.AUTH_ME] as const;

export const API_PREFIX = "api";
