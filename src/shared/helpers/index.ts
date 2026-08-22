import { toast } from "react-toastify";

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

export function setTokenExpiredFlag(): void {
  sessionStorage.setItem("token_expired", "true");
}

export * from "./accessTokenMemory";
