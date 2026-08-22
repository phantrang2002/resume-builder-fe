import { FormEvent, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ValidationError } from "yup";
import { Button, Input } from "antd";
import { useResetPasswordMutation } from "@/services/api";
import { ROUTER_PATH } from "@/shared/constants";
import { yupErrorsToRecord } from "@/shared/helpers";
import { resetPasswordSchema } from "@/shared/validations/auth.schema";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = useMemo(() => searchParams.get("code") ?? "", [searchParams]);

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!code) {
      setFieldErrors({ code: "Reset code is missing from the URL." });
      return;
    }

    try {
      const validated = resetPasswordSchema.validateSync(form, { abortEarly: false });
      setFieldErrors({});
      const response = await resetPassword({
        code,
        password: validated.password,
        confirmPassword: validated.confirmPassword,
      }).unwrap();
      toast.success(response.message);
      navigate(ROUTER_PATH.LOGIN, { replace: true });
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(yupErrorsToRecord(error));
      }
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-pageTitle">Reset password</h1>
        <p className="mt-2 text-sm text-gray-500">Enter your new password</p>
      </div>
      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Input.Password
            size="large"
            value={form.password}
            placeholder="New password"
            status={fieldErrors.password ? "error" : undefined}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, password: event.target.value }));
            }}
          />
          {fieldErrors.password && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.password}</p>
          )}
        </div>

        <div>
          <Input.Password
            size="large"
            value={form.confirmPassword}
            placeholder="Confirm password"
            status={fieldErrors.confirmPassword ? "error" : undefined}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, confirmPassword: event.target.value }));
            }}
          />
          {fieldErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {fieldErrors.code && (
          <p className="text-sm text-red-500">{fieldErrors.code}</p>
        )}

        <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
          Reset password
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link to={ROUTER_PATH.LOGIN} className="text-sm text-primary hover:underline">
          Back to login
        </Link>
      </div>
    </div>
  );
}
