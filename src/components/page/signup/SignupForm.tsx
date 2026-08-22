import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationError } from "yup";
import { Button, Input } from "antd";
import { ROUTER_PATH } from "@/shared/constants";
import { yupErrorsToRecord } from "@/shared/helpers";
import type { SignupFieldErrors, SignupParams } from "@/shared/types";
import { signupSchema } from "@/shared/validations/auth.schema";

type SignupFormProps = {
  loading: boolean;
  onSubmit: (values: SignupParams) => Promise<void>;
};

export default function SignupForm({ loading, onSubmit }: SignupFormProps) {
  const [form, setForm] = useState<SignupParams>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    let validated: SignupParams;
    try {
      validated = signupSchema.validateSync(form, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(yupErrorsToRecord(error));
      }
      return;
    }

    setFieldErrors({});
    await onSubmit(validated);
  };

  const updateField = (field: keyof SignupParams, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form className="mt-8 flex w-full flex-col items-center" onSubmit={handleSubmit}>
      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              size="large"
              value={form.firstName}
              autoComplete="given-name"
              placeholder="First name"
              status={fieldErrors.firstName ? "error" : undefined}
              onChange={(event) => updateField("firstName", event.target.value)}
            />
            {fieldErrors.firstName && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.firstName}</p>
            )}
          </div>

          <div>
            <Input
              size="large"
              value={form.lastName}
              autoComplete="family-name"
              placeholder="Last name"
              status={fieldErrors.lastName ? "error" : undefined}
              onChange={(event) => updateField("lastName", event.target.value)}
            />
            {fieldErrors.lastName && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Input
            size="large"
            value={form.email}
            autoComplete="email"
            placeholder="Email"
            status={fieldErrors.email ? "error" : undefined}
            onChange={(event) => updateField("email", event.target.value)}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <Input.Password
            size="large"
            value={form.password}
            autoComplete="new-password"
            placeholder="Password (min 8 characters)"
            status={fieldErrors.password ? "error" : undefined}
            onChange={(event) => updateField("password", event.target.value)}
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
        Sign up
      </Button>

      <Link
        to={ROUTER_PATH.LOGIN}
        className="mt-6 text-sm font-medium text-primary hover:underline"
      >
        Already have an account? Log in
      </Link>
    </form>
  );
}
