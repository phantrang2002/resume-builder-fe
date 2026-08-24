import ActionButton from "@/components/common/ActionButton";
import CheckboxField from "@/components/common/CheckboxField";
import InputField from "@/components/common/InputField";
import PasswordStrengthMeter from "@/components/page/signup/PasswordStrengthMeter";
import { ROUTER_PATH } from "@/shared/constants";
import { yupErrorsToRecord } from "@/shared/helpers";
import type { SignupFieldErrors, SignupFormValues, SignupParams } from "@/shared/types";
import { signupSchema } from "@/shared/validations/auth.schema";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationError } from "yup";

type SignupFormProps = {
  loading: boolean;
  onSubmit: (values: SignupParams) => Promise<void>;
};

export default function SignupForm({ loading, onSubmit }: SignupFormProps) {
  const [form, setForm] = useState<SignupFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailTips, setEmailTips] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});

  const updateField = <K extends keyof SignupFormValues>(field: K, value: SignupFormValues[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    let validated: SignupFormValues;
    try {
      validated = signupSchema.validateSync(form, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(yupErrorsToRecord(error));
      }
      return;
    }

    setFieldErrors({});
    await onSubmit({
      email: validated.email,
      password: validated.password,
      firstName: validated.firstName,
      lastName: validated.lastName,
      emailFlg: emailTips,
    });
  };

  const confirmPasswordError =
    fieldErrors.confirmPassword ||
    (form.confirmPassword.length > 0 && form.confirmPassword !== form.password
      ? "Your passwords don't match."
      : undefined);

  return (
    <form className="mt-7 flex w-full flex-col" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            id="signup-first-name"
            label="First name"
            value={form.firstName}
            autoComplete="given-name"
            placeholder="Trang"
            disabled={loading}
            error={fieldErrors.firstName}
            onChange={(value) => updateField("firstName", value)}
          />

          <InputField
            id="signup-last-name"
            label="Last name"
            value={form.lastName}
            autoComplete="family-name"
            placeholder="Phan"
            disabled={loading}
            error={fieldErrors.lastName}
            onChange={(value) => updateField("lastName", value)}
          />
        </div>

        <InputField
          id="signup-email"
          label="Email address"
          type="email"
          value={form.email}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={loading}
          error={fieldErrors.email}
          onChange={(value) => updateField("email", value)}
        />

        <div>
          <InputField
            id="signup-password"
            label="Password"
            type="password"
            value={form.password}
            autoComplete="new-password"
            placeholder="Create a password"
            showPasswordToggle
            disabled={loading}
            error={fieldErrors.password}
            hint="At least 10 characters. Avoid anything you use elsewhere."
            onChange={(value) => {
              updateField("password", value);
              if (fieldErrors.confirmPassword) {
                setFieldErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }
            }}
          />
          <PasswordStrengthMeter password={form.password} />
        </div>

        <InputField
          id="signup-confirm-password"
          label="Confirm password"
          type="password"
          value={form.confirmPassword}
          autoComplete="new-password"
          placeholder="Confirm your password"
          showPasswordToggle
          disabled={loading}
          error={confirmPasswordError}
          onChange={(value) => updateField("confirmPassword", value)}
        />
      </div>

      <CheckboxField
        id="signup-email-tips"
        className="mt-4"
        checked={emailTips}
        disabled={loading}
        label="Email me tips on writing a better CV"
        onChange={setEmailTips}
      />

      <ActionButton type="submit" loading={loading} loadingLabel="Creating account..." className="mt-5">
        Create account
      </ActionButton>

      <p className="mt-5 text-center text-sm text-subtle">
        Already have an account?{" "}
        <Link to={ROUTER_PATH.LOGIN} className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>

      <p className="mt-6 text-center text-xs leading-relaxed text-inputMuted">
        By creating an account you agree to the{" "}
        <a href="#terms" className="underline decoration-inputMuted/60 underline-offset-2 hover:text-subtle">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#privacy" className="underline decoration-inputMuted/60 underline-offset-2 hover:text-subtle">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
