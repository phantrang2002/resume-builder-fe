import { useEffect, useRef } from "react";
import { clearSession, markBootstrapped } from "@/app/features/auth/authSlice";
import { selectIsSessionBootstrapped } from "@/app/features/auth/authSelector";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useLazyGetProfileQuery, useRefreshTokenMutation } from "@/services/api";
import { showRequestErrorToast } from "@/shared/helpers";
import { HTTP_STATUS, SESSION_PROBE_SKIP_ROUTES } from "@/shared/constants";

function isUnauthorized(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "status" in error &&
    (error as { status: unknown }).status === HTTP_STATUS.UNAUTHORIZED
  );
}

function shouldSkipProbe(pathname: string): boolean {
  return SESSION_PROBE_SKIP_ROUTES.some((route) => route === pathname);
}

/**
 * Rebuilds Redux session from the HttpOnly refresh cookie by calling
 * POST /api/auth/refresh, then GET /api/auth/me once at startup.
 */
export default function useSessionBootstrap(): boolean {
  const dispatch = useAppDispatch();
  const isBootstrapped = useAppSelector(selectIsSessionBootstrapped);
  const [refreshToken] = useRefreshTokenMutation();
  const [fetchProfile] = useLazyGetProfileQuery();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }
    hasRun.current = true;

    if (shouldSkipProbe(window.location.pathname)) {
      dispatch(markBootstrapped());
      return;
    }

    void (async () => {
      try {
        await refreshToken().unwrap();
        await fetchProfile().unwrap();
      } catch (error) {
        dispatch(clearSession());
        if (!isUnauthorized(error)) {
          showRequestErrorToast(error);
        }
      } finally {
        dispatch(markBootstrapped());
      }
    })();
  }, [dispatch, fetchProfile, refreshToken]);

  return isBootstrapped;
}
