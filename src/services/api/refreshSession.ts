import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import { clearSession } from "@/app/features/auth/authSlice";
import client from "@/services/http/client";
import { buildApiPath, setAccessToken, clearAccessToken, setTokenExpiredFlag } from "@/shared/helpers";
import { API_ENDPOINT } from "@/shared/constants";
import type { DataResponse, RefreshResponseData } from "@/shared/types";

export const REFRESH_TOKEN_PATH = buildApiPath(API_ENDPOINT.AUTH_REFRESH);

class AsyncMutex {
  private tail = Promise.resolve<void>(undefined);

  runExclusive<T>(fn: () => Promise<T>): Promise<T> {
    const next = this.tail.then(() => fn());
    this.tail = next.then(
      () => undefined,
      () => undefined,
    );
    return next;
  }
}

const refreshMutex = new AsyncMutex();

type RootStateWithAuth = {
  auth: {
    session: unknown;
  };
};

/**
 * Clears the session, but announces an expiry only if there was one to expire.
 * The startup probe runs with an empty session, so treating its 401 as an expiry
 * would greet first-time visitors on `/login` with a token-expired toast.
 */
export function clearSessionAsExpired(
  dispatch: BaseQueryApi["dispatch"],
  getState: BaseQueryApi["getState"],
): void {
  const wasAuthenticated = Boolean((getState() as RootStateWithAuth).auth.session);
  clearAccessToken();
  dispatch(clearSession());
  if (wasAuthenticated) {
    setTokenExpiredFlag();
  }
}

async function performRefresh(
  dispatch: BaseQueryApi["dispatch"],
  getState: BaseQueryApi["getState"],
): Promise<boolean> {
  try {
    const res = await client.post<DataResponse<RefreshResponseData>>(REFRESH_TOKEN_PATH, {
      body: {},
    });

    const access = res.data?.token?.access;
    if (!access) {
      clearSessionAsExpired(dispatch, getState);
      return false;
    }

    setAccessToken(access);
    return true;
  } catch {
    clearSessionAsExpired(dispatch, getState);
    return false;
  }
}

export function refreshAccessTokenExclusive(
  dispatch: BaseQueryApi["dispatch"],
  getState: BaseQueryApi["getState"],
): Promise<boolean> {
  return refreshMutex.runExclusive(() => performRefresh(dispatch, getState));
}
