import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationError } from "yup";
import { Button, Input } from "antd";
import { ROUTER_PATH } from "@/shared/constants";
import { yupErrorsToRecord } from "@/shared/helpers";
import type { LoginFieldErrors } from "@/shared/types";
import { loginSchema } from "@/shared/validations/auth.schema";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  loading: boolean;
  onSubmit: (values: LoginFormValues) => Promise<void>;
};

export default function LoginForm({ loading, onSubmit }: LoginFormProps) {
  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});

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
    await onSubmit(validated);
  };

  return (
    <form className="mt-8 flex w-full flex-col items-center" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-4">
        <div>
          <Input
            size="large"
            value={form.email}
            autoComplete="email"
            placeholder="Email"
            status={fieldErrors.email ? "error" : undefined}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, email: event.target.value }));
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }
            }}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Input.Password
            size="large"
            value={form.password}
            autoComplete="current-password"
            placeholder="Password"
            status={fieldErrors.password ? "error" : undefined}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, password: event.target.value }));
              if (fieldErrors.password) {
                setFieldErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
          )}
        </div>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        loading={loading}
        className="mt-6 h-12 min-w-[160px] text-base font-medium"
      >
        Log in
      </Button>

      <Link
        to={ROUTER_PATH.FORGOT_PASSWORD}
        className="mt-4 text-sm font-medium text-primary hover:underline"
      >
        Forgot password?
      </Link>

      <Link
        to={ROUTER_PATH.SIGNUP}
        className="mt-3 text-sm font-medium text-primary hover:underline"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </form>
  );
}
