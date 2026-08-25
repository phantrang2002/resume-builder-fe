import ActionButton from "@/components/common/ActionButton";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getApiErrorMessage } from "@/shared/helpers";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const SUPPORT_EMAIL = "support@rezum.app";

const SERVER_ERROR_DESCRIPTION =
  "The server didn't respond. Your work is safe — nothing was lost. Check your connection and try again.";

type ResumesErrorMeta = {
  requestId?: string;
  errorCode: string;
};

type ResumesErrorStateProps = {
  error: unknown;
  onRetry: () => void;
  isRetrying?: boolean;
};

function readRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") {
    return null;
  }
  return value as Record<string, unknown>;
}

function isServerError(error: unknown): boolean {
  const fetchError = readRecord(error) as FetchBaseQueryError | null;
  if (!fetchError || !("status" in fetchError)) {
    return true;
  }

  if (fetchError.status === "FETCH_ERROR" || fetchError.status === "PARSING_ERROR") {
    return true;
  }

  if (typeof fetchError.status === "number") {
    return fetchError.status >= 500;
  }

  return false;
}

function getResumesErrorDescription(error: unknown): string {
  if (isServerError(error)) {
    return SERVER_ERROR_DESCRIPTION;
  }

  return getApiErrorMessage(error);
}

function getResumesErrorMeta(error: unknown): ResumesErrorMeta {
  const fetchError = readRecord(error) as FetchBaseQueryError | null;
  if (!fetchError || !("status" in fetchError)) {
    return { errorCode: "DEPENDENCY_UNAVAILABLE" };
  }

  if (fetchError.status === "FETCH_ERROR") {
    return { errorCode: "DEPENDENCY_UNAVAILABLE" };
  }

  if (fetchError.status === "PARSING_ERROR") {
    return { errorCode: "RESPONSE_PARSE_ERROR" };
  }

  if (typeof fetchError.status === "number") {
    const envelope = readRecord(fetchError.data);
    const inner = readRecord(envelope?.data) ?? envelope;
    const requestId =
      typeof inner?.requestId === "string"
        ? inner.requestId
        : typeof envelope?.requestId === "string"
          ? envelope.requestId
          : undefined;
    const errorCode =
      typeof inner?.errorCode === "string"
        ? inner.errorCode
        : typeof envelope?.errorCode === "string"
          ? envelope.errorCode
          : fetchError.status >= 500
            ? "DEPENDENCY_UNAVAILABLE"
            : `HTTP_${fetchError.status}`;

    return { requestId, errorCode };
  }

  return { errorCode: "DEPENDENCY_UNAVAILABLE" };
}

function formatErrorMeta({ requestId, errorCode }: ResumesErrorMeta): string {
  return requestId ? `Request ${requestId} · ${errorCode}` : errorCode;
}

export default function ResumesErrorState({
  error,
  onRetry,
  isRetrying = false,
}: ResumesErrorStateProps) {
  const meta = getResumesErrorMeta(error);
  const description = getResumesErrorDescription(error);

  return (
    <div
      className="flex flex-1 items-center justify-center py-[52px] sm:py-16"
      role="alert"
      aria-labelledby="resumes-error-title"
    >
      <div className="w-full max-w-[560px] rounded-xl border border-errorBorder bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
        <div className="flex justify-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-errorBg">
            <ExclamationCircleOutlined className="text-xl text-error" aria-hidden />
          </span>
        </div>

        <h2
          id="resumes-error-title"
          className="mt-5 text-[22px] font-semibold leading-tight tracking-tight text-pageTitle sm:text-[28px]"
        >
          We couldn&apos;t load your resumes
        </h2>
        <p className="mx-auto mt-[14px] max-w-[380px] text-sm leading-relaxed text-secondary">
          {description}
        </p>

        <div className="mt-[14px] flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
          <ActionButton
            fullWidth={false}
            onClick={onRetry}
            loading={isRetrying}
            loadingLabel="Retrying…"
            className="min-w-[120px] px-5 font-medium"
          >
            Try again
          </ActionButton>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sm font-medium text-secondary transition-colors hover:text-primary hover:underline"
          >
            Contact support
          </a>
        </div>

        <p className="mt-[14px] font-mono text-xs tracking-tight text-inputMuted">{formatErrorMeta(meta)}</p>
      </div>
    </div>
  );
}
