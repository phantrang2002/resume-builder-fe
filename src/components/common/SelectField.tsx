import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ReactNode, SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  hint?: ReactNode;
  labelExtra?: ReactNode;
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "value" | "onChange">;

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  hint,
  labelExtra,
  placeholder,
  className,
  disabled,
  ...selectProps
}: SelectFieldProps) {
  const hasValue = Boolean(value);

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
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className={[
            "h-10 w-full appearance-none rounded-md border px-4 pr-10 text-sm outline-none transition-[color,box-shadow]",
            disabled ? "cursor-not-allowed bg-[#EFEEEB] text-gray-500" : "cursor-pointer bg-white",
            hasValue ? "text-pageTitle" : "text-inputMuted",
            error
              ? "border border-error focus:border-error focus:shadow-[0_0_0_1px_theme(colors.error)] focus:ring-0"
              : "border border-[var(--color-border-default,#CFCCC5)] focus:border-inputFocus focus:shadow-[0_0_0_1px_theme(colors.inputFocus)] focus:ring-0",
          ].join(" ")}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled={false}>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <DownOutlined
          aria-hidden
          className={[
            "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs",
            disabled ? "text-gray-400" : "text-subtle",
          ].join(" ")}
        />
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
