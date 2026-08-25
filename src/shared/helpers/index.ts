import { toast } from "@/shared/helpers/toast";

export function yupErrorsToRecord(error: import("yup").ValidationError): Record<string, string> {
  const record: Record<string, string> = {};
  error.inner.forEach((inner) => {
    if (inner.path && !record[inner.path]) {
      record[inner.path] = inner.message;
    }
  });
  return record;
}

export function buildApiPath(endpoint: string): string {
  const normalized = endpoint.replace(/^\/+/u, "");
  return `api/${normalized}`;
}

export function getApiEnvelopeSuccess(payload: unknown): boolean | undefined {
  if (!payload || typeof payload !== "object" || !("status" in payload)) {
    return undefined;
  }
  return (payload as { status: string }).status === "success";
}

export function getApiEnvelopeMessage(payload: unknown): string | undefined {
  if (payload && typeof payload === "object" && "message" in payload) {
    const message = (payload as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }
  return undefined;
}

export function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    const message = getApiEnvelopeMessage((error as { data: unknown }).data);
    if (message) {
      return message;
    }
  }
  return "Something went wrong. Please try again.";
}

export function showRequestErrorToast(error: unknown): void {
  toast.error(getApiErrorMessage(error));
}

/** Truncate plain text to `maxLength` characters, appending an ellipsis when shortened. */
export function truncateText(text: string, maxLength: number): string {
  const value = text.trim();
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength).trimEnd()}…`;
}

/** Resolve API-relative media paths (e.g. `/assets/...` or `/api/assets/...`) against the API origin. */
export function resolveMediaUrl(path: string | null | undefined): string {
  if (!path) {
    return "";
  }
  if (/^(?:https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Same-origin `/api/...` paths can use the Vite proxy without forcing an absolute host.
  if (normalizedPath.startsWith("/api/")) {
    const apiBase = (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "";
    if (!apiBase) {
      return normalizedPath;
    }
    return `${apiBase.replace(/\/$/, "")}${normalizedPath}`;
  }

  const apiBase = (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "";
  const devTarget = (import.meta.env.VITE_DEV_API_TARGET as string | undefined)?.trim() || "";
  const origin = apiBase || devTarget;
  if (!origin) {
    return normalizedPath;
  }

  return `${origin.replace(/\/$/, "")}${normalizedPath}`;
}

/** Parse draft template id (`"2"`) into a positive number, or `null` when invalid. */
export function parseTemplateId(value: string | null | undefined): number | null {
  if (!value) {
    return null;
  }
  const id = Number(value);
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }
  return id;
}

/** Format API month values like `2023-03` → `Mar 2023`. */
export function formatPreviewDate(value: string | null | undefined): string {
  if (!value) {
    return "";
  }
  if (/^\d{4}-\d{2}$/u.test(value)) {
    const [year, month] = value.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    }
  }
  return value;
}

export function setTokenExpiredFlag(): void {
  sessionStorage.setItem("token_expired", "true");
}

export * from "./accessTokenMemory";
