import type { BaseQueryFn, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "@/app/features/ui/uiSlice";
import {
  REFRESH_TOKEN_PATH,
  clearSessionAsExpired,
  refreshAccessTokenExclusive,
} from "@/services/api/refreshSession";
import { executeClientRequest } from "@/services/http/executeClientRequest";
import { buildApiPath } from "@/shared/helpers";
import { HTTP_METHOD, HTTP_STATUS } from "@/shared/constants";
import type { AppQueryArg } from "@/shared/types";
import { HttpError } from "@/shared/types";

function isRefreshTokenPath(path: string): boolean {
  return path === REFRESH_TOKEN_PATH;
}

function httpErrorToFetchError(error: HttpError): FetchBaseQueryError {
  return {
    status: error.status,
    data: error.data ?? error.message,
  };
}

function toFetchError(error: unknown): FetchBaseQueryError {
  if (error instanceof HttpError) {
    return httpErrorToFetchError(error);
  }
  return {
    status: "FETCH_ERROR" as const,
    error: String(error),
  };
}

const appBaseQuery: BaseQueryFn<AppQueryArg, unknown, FetchBaseQueryError> = async (args, api) => {
  const method = args.method ?? HTTP_METHOD.GET;
  const shouldShowGlobalLoading = method !== HTTP_METHOD.GET;

  if (shouldShowGlobalLoading) {
    api.dispatch(startLoading());
  }

  try {
    const path = buildApiPath(args.url);
    const { params, body } = args;

    try {
      const data = await executeClientRequest({ method, path, params, body });
      return { data };
    } catch (error) {
      if (!(error instanceof HttpError) || error.status !== HTTP_STATUS.UNAUTHORIZED) {
        return { error: toFetchError(error) };
      }

      if (isRefreshTokenPath(path)) {
        clearSessionAsExpired(api.dispatch, api.getState);
        return { error: httpErrorToFetchError(error) };
      }

      const refreshed = await refreshAccessTokenExclusive(api.dispatch, api.getState);
      if (!refreshed) {
        return { error: httpErrorToFetchError(error) };
      }

      try {
        const data = await executeClientRequest({ method, path, params, body });
        return { data };
      } catch (retryError) {
        if (retryError instanceof HttpError && retryError.status === HTTP_STATUS.UNAUTHORIZED) {
          clearSessionAsExpired(api.dispatch, api.getState);
        }
        return { error: toFetchError(retryError) };
      }
    }
  } finally {
    if (shouldShowGlobalLoading) {
      api.dispatch(stopLoading());
    }
  }
};

export default appBaseQuery;
