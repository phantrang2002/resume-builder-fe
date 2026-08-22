import type { RootState } from "@/app/store";
import { USER_ROLE } from "@/shared/constants";

export const selectSession = (state: RootState) => state.auth.session;
export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.session);
export const selectIsSessionBootstrapped = (state: RootState) => state.auth.isBootstrapped;
export const selectIsAdmin = (state: RootState) => state.auth.session?.role === USER_ROLE.ADMIN;

export const selectDisplayName = (state: RootState) => {
  const session = state.auth.session;
  if (!session) {
    return "";
  }
  const fullName = [session.firstName, session.lastName].filter(Boolean).join(" ").trim();
  return fullName || session.email;
};
