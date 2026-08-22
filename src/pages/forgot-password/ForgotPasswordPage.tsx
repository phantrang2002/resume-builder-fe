import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ValidationError } from "yup";
import { Button, Input } from "antd";
import { useForgotPasswordMutation } from "@/services/api";
import { ROUTER_PATH } from "@/shared/constants";
import { yupErrorsToRecord } from "@/shared/helpers";
import { forgotPasswordSchema } from "@/shared/validations/auth.schema";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string }>({});
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const validated = forgotPasswordSchema.validateSync({ email }, { abortEarly: false });
      setFieldErrors({});
      const response = await forgotPassword(validated).unwrap();
      toast.success(response.message);
    } catch (error) {
      if (error instanceof ValidationError) {
        setFieldErrors(yupErrorsToRecord(error));
      }
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-pageTitle">Forgot password</h1>
        <p className="mt-2 text-sm text-gray-500">Enter your email to receive a reset link</p>
      </div>
      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Input
            size="large"
            value={email}
            placeholder="Email"
            status={fieldErrors.email ? "error" : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              if (fieldErrors.email) {
                setFieldErrors({});
              }
            }}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.email}</p>
          )}
        </div>

        <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
          Send reset link
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
