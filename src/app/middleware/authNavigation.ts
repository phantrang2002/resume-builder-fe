import { ROUTER_PATH } from "@/shared/constants";

type HomeRedirectParams = {
  isAuthenticated: boolean;
};

type PublicRedirectParams = {
  isAuthenticated: boolean;
};

type ProtectedRedirectParams = {
  isAuthenticated: boolean;
};

type AdminRedirectParams = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export function resolveHomeRedirect({ isAuthenticated }: HomeRedirectParams): string {
  return isAuthenticated ? ROUTER_PATH.DASHBOARD : ROUTER_PATH.LOGIN;
}

export function resolvePublicRedirect({ isAuthenticated }: PublicRedirectParams): string | null {
  return isAuthenticated ? ROUTER_PATH.DASHBOARD : null;
}

export function resolveProtectedRedirect({ isAuthenticated }: ProtectedRedirectParams): string | null {
  return isAuthenticated ? null : ROUTER_PATH.LOGIN;
}

export function resolveAdminRedirect({ isAuthenticated, isAdmin }: AdminRedirectParams): string | null {
  if (!isAuthenticated) {
    return ROUTER_PATH.LOGIN;
  }
  return isAdmin ? null : ROUTER_PATH.DASHBOARD;
}
