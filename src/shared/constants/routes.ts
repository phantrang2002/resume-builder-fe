export const ROUTER_PATH = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  RESUMES_NEW: "/resumes/new",
  RESUME_EDIT: "/resumes/:id/edit",
  NOT_FOUND: "/404",
} as const;

export function resumeEditPath(id: string): string {
  return `/resumes/${id}/edit`;
}

export const PRIVATE_DEFAULT_ROUTE = ROUTER_PATH.DASHBOARD;

export const SESSION_PROBE_SKIP_ROUTES = [
  ROUTER_PATH.LOGIN,
  ROUTER_PATH.SIGNUP,
  ROUTER_PATH.FORGOT_PASSWORD,
  ROUTER_PATH.RESET_PASSWORD,
] as const;

export const TOKEN_EXPIRED_MESSAGE = "Your session has expired. Please log in again.";
export const NO_ACCESS_PERMISSION_MESSAGE = "You do not have permission to access this page.";

export const USER_ROLE = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
} as const;
