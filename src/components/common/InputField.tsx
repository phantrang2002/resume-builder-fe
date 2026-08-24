import { ExclamationCircleOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { InputHTMLAttributes, ReactNode, useState } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: ReactNode;
  labelExtra?: ReactNode;
  showPasswordToggle?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">;

export default function InputField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  labelExtra,
  showPasswordToggle = false,
  type = "text",
  className,
  disabled,
  ...inputProps
}: InputFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPasswordToggle && passwordVisible ? "text" : type;

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className={["text-sm font-medium", disabled ? "text-gray-400" : "text-[#524D44]"].join(" ")}
        >
          {label}
        </label>
        {labelExtra}
      </div>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className={[
            "h-10 w-full rounded-lg border px-4 text-sm text-[gray-900] outline-none transition-[color,box-shadow]",
            "placeholder:text-inputMuted",
            disabled ? "cursor-not-allowed bg-[#EFEEEB] text-gray-500" : "bg-white",
            error
              ? "border border-error focus:border-error focus:shadow-[0_0_0_1px_theme(colors.error)] focus:ring-0"
              : "border border-[var(--color-border-default,#CFCCC5)] focus:border-inputFocus focus:shadow-[0_0_0_1px_theme(colors.inputFocus)] focus:ring-0",
            isPasswordField && showPasswordToggle ? "pr-11" : "",
          ].join(" ")}
          {...inputProps}
        />

        {isPasswordField && showPasswordToggle && (
          <button
            type="button"
            disabled={disabled}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPasswordVisible((visible) => !visible)}
          >
            {passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
          <ExclamationCircleOutlined className="text-xs" />
          <span>{error}</span>
        </p>
      ) : (
        hint && <p className="mt-1.5 text-sm text-subtle">{hint}</p>
      )}
    </div>
  );
}
