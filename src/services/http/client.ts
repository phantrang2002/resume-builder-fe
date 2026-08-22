import { store } from "@/app/store";
import { clearSession } from "@/app/features/auth/authSlice";
import {
  DEFAULT_HTTP_TIMEOUT_MS,
  HTTP_METHOD,
  PUBLIC_API_PATHS,
  SESSION_BOOTSTRAP_API_PATHS,
} from "@/shared/constants";
import {
  getApiEnvelopeMessage,
  getApiEnvelopeSuccess,
  getAccessToken,
  clearAccessToken,
  setTokenExpiredFlag,
} from "@/shared/helpers";
import type { HttpClient, HttpQuery, HttpRequestConfig } from "@/shared/types";
import { HttpError } from "@/shared/types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

function normalizeApiPath(path: string): string {
  return path.replace(/^\/+/u, "");
}

function isPublicApiPath(path: string): boolean {
  const normalized = normalizeApiPath(path);
  return PUBLIC_API_PATHS.some((publicPath) => {
    const candidate = normalizeApiPath(publicPath);
    return normalized === candidate || normalized.endsWith(candidate);
  });
}

function isSessionBootstrapRequest(method: string, path: string): boolean {
  if (method !== HTTP_METHOD.GET) {
    return false;
  }
  const normalized = normalizeApiPath(path);
  return SESSION_BOOTSTRAP_API_PATHS.some(
    (bootstrapPath) => normalized === normalizeApiPath(bootstrapPath),
  );
}

function serializeQuery(params?: HttpQuery): string {
  if (!params) {
    return "";
  }

  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => search.append(`${key}[]`, String(item)));
    } else {
      search.append(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

function buildUrl(path: string, params?: HttpQuery): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return `${path}${serializeQuery(params)}`;
  }

  const base = BASE_URL.replace(/\/+$/g, "");
  const normalizedPath = path.replace(/^\/+/g, "");
  return `${base}/${normalizedPath}${serializeQuery(params)}`;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function buildAuthHeaders(existing: Record<string, string>, path: string): Record<string, string> {
  if (isPublicApiPath(path)) {
    return existing;
  }

  const accessToken = getAccessToken();
  if (!accessToken) {
    return existing;
  }

  return {
    ...existing,
    Authorization: `Bearer ${accessToken}`,
  };
}

export function clearSessionAsExpired(): void {
  clearAccessToken();
  store.dispatch(clearSession());
  setTokenExpiredFlag();
}

async function request<T>(method: string, path: string, config?: HttpRequestConfig): Promise<T> {
  const state = store.getState();
  const session = state.auth.session;
  const isPublic = isPublicApiPath(path);
  const hasToken = Boolean(getAccessToken());

  if (!isPublic && !isSessionBootstrapRequest(method, path) && !session && !hasToken) {
    throw new HttpError("canceled", 0, path, "canceled");
  }

  const url = buildUrl(path, config?.params);
  const controller = new AbortController();
  const timeoutMs = config?.timeoutMs ?? DEFAULT_HTTP_TIMEOUT_MS;
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = buildAuthHeaders({ ...(config?.headers ?? {}) }, path);

    let body: FormData | string | undefined;
    if (config?.body !== undefined) {
      if (config.body instanceof FormData) {
        body = config.body;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(config.body);
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
      signal: controller.signal,
      cache: "no-store",
      credentials: "include",
    });

    const payload = await parseResponseBody(response);

    if (
      response.ok &&
      payload &&
      typeof payload === "object" &&
      getApiEnvelopeSuccess(payload) === false
    ) {
      const envelope = payload as { message?: string };
      throw new HttpError(
        getApiEnvelopeMessage(envelope) ?? "Request failed",
        response.status,
        path,
        payload,
      );
    }

    if (!response.ok) {
      const envelopeMessage = getApiEnvelopeMessage(payload);
      throw new HttpError(
        envelopeMessage ?? `Request failed with status ${response.status}`,
        response.status,
        path,
        payload,
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new HttpError("timeout exceeded", 408, path, null);
    }
    throw error;
  } finally {
    window.clearTimeout(timer);
  }
}

const client: HttpClient = {
  get: <T>(url: string, config?: HttpRequestConfig) => request<T>("GET", url, config),
  post: <T>(url: string, config?: HttpRequestConfig) => request<T>("POST", url, config),
  put: <T>(url: string, config?: HttpRequestConfig) => request<T>("PUT", url, config),
  delete: <T>(url: string, config?: HttpRequestConfig) => request<T>("DELETE", url, config),
};

export default client;
