import type { USER_ROLE } from "@/shared/constants";

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type ApiEnvelope<T = unknown> = {
  status: "success" | "failed" | "error";
  message: string;
  code: number;
  data?: T;
};

export type AuthTokens = {
  access: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type SignupParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  emailFlg: boolean;
};

export type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupResponseData = {
  accountCreated: {
    id: number;
    email: string;
    role: UserRole;
    status: string;
  };
  profileCreated: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

export type SignupFieldErrors = Partial<Record<keyof SignupFormValues, string>>;

export type LoginResponseData = {
  account: { id: number };
  token: AuthTokens;
};

export type RefreshResponseData = {
  token: AuthTokens;
};

export type UserProfile = {
  id: number;
  email: string;
  role: UserRole;
  status: string;
  enrolled?: string;
  createdAt: string;
  updatedAt: string;
  profile?: {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string | null;
    avatar?: { url: string } | null;
  } | null;
};

export type ForgotPasswordParams = {
  email: string;
};

export type ResetPasswordParams = {
  code: string;
  password: string;
  confirmPassword: string;
};

export type LoginFieldErrors = Partial<Record<keyof LoginParams, string>>;

export type HttpQuery = Record<string, string | number | boolean | string[] | undefined | null>;

export type HttpRequestConfig = {
  params?: HttpQuery;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
};

export class HttpError extends Error {
  status: number;
  path: string;
  data: unknown;

  constructor(message: string, status: number, path: string, data: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.path = path;
    this.data = data;
  }
}

export type AppQueryArg = {
  url: string;
  method?: string;
  params?: HttpQuery;
  body?: unknown;
};

export type HttpClient = {
  get: <T>(url: string, config?: HttpRequestConfig) => Promise<T>;
  post: <T>(url: string, config?: HttpRequestConfig) => Promise<T>;
  put: <T>(url: string, config?: HttpRequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: HttpRequestConfig) => Promise<T>;
};

export type DataResponse<T> = ApiEnvelope<T>;

export type {
  CreateMethod,
  CreatePhase,
  CreateResumeDraft,
  CreateResumeLocationState,
  ExperienceLevel,
  WizardStep,
  WizardView,
} from "./resume";

