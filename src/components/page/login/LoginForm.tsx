import ActionButton from "@/components/common/ActionButton";
import CheckboxField from "@/components/common/CheckboxField";
import FormAlert from "@/components/common/FormAlert";
import InputField from "@/components/common/InputField";
import { ROUTER_PATH } from "@/shared/constants";
import { getApiErrorMessage, yupErrorsToRecord } from "@/shared/helpers";
import type { LoginFieldErrors } from "@/shared/types";
import { loginSchema } from "@/shared/validations/auth.schema";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationError } from "yup";

type LoginFormValues = {
  email: string;
  password: string;
};

type AuthFormError = {
  title: string;
  message: string;
};

type LoginFormProps = {
  loading: boolean;
  onSubmit: (values: LoginFormValues) => Promise<void>;
};

const AUTH_ERROR_TITLE = "We couldn't sign you in";
const PASSWORD_AUTH_ERROR = "Check your password and try again.";
const DEFAULT_AUTH_ERROR_MESSAGE =
  "That email and password don't match. You have 3 attempts left before the account is locked for 15 minutes.";

export default function LoginForm({ loading, onSubmit }: LoginFormProps) {
  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [authError, setAuthError] = useState<AuthFormError | null>(null);

  const clearAuthError = () => {
    if (authError) {
      setAuthError(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    let validated: LoginFormValues;
    try {
      validated = loginSchema.validateSync(form, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(yupErrorsToRecord(error));
      }
      return;
    }

    setFieldErrors({});
    setAuthError(null);

    try {
      await onSubmit(validated);
    } catch (error) {
      const apiMessage = getApiErrorMessage(error);
      setAuthError({
        title: AUTH_ERROR_TITLE,
        message:
          apiMessage === "Something went wrong. Please try again."
            ? DEFAULT_AUTH_ERROR_MESSAGE
            : apiMessage,
      });
      setFieldErrors({ password: PASSWORD_AUTH_ERROR });
    }
  };

  return (
    <form className="mt-7 flex w-full flex-col" noValidate onSubmit={handleSubmit}>
      {authError && <FormAlert title={authError.title} message={authError.message} />}

      <div className={authError ? "mt-4 flex flex-col gap-4" : "flex flex-col gap-4"}>
        <InputField
          id="login-email"
          label="Email address"
          type="email"
          value={form.email}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={loading}
          error={fieldErrors.email}
          onChange={(value) => {
            setForm((prev) => ({ ...prev, email: value }));
            clearAuthError();
            if (fieldErrors.email) {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
        />

        <InputField
          id="login-password"
          label="Password"
          type="password"
          value={form.password}
          autoComplete="current-password"
          placeholder="Enter your password"
          showPasswordToggle
          disabled={loading}
          error={fieldErrors.password}
          labelExtra={
            <Link
              to={ROUTER_PATH.FORGOT_PASSWORD}
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          }
          onChange={(value) => {
            setForm((prev) => ({ ...prev, password: value }));
            clearAuthError();
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
          }}
        />
      </div>

      <CheckboxField
        id="keep-signed-in"
        className="mt-4"
        checked={keepSignedIn}
        disabled={loading}
        label="Keep me signed in for 30 days"
        onChange={setKeepSignedIn}
      />

      <ActionButton type="submit" loading={loading} className="mt-5">
        Sign in
      </ActionButton>

      <p className="mt-5 text-center text-sm text-subtle">
        New to Rezum?{" "}
        <Link to={ROUTER_PATH.SIGNUP} className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
