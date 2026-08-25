import {
  CloseCircleFilled,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { InputHTMLAttributes, ReactNode } from "react";

type SearchFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  hideLabel?: boolean;
  error?: string;
  hint?: ReactNode;
  labelExtra?: ReactNode;
  allowClear?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange" | "type">;

export default function SearchField({
  id,
  value,
  onChange,
  label = "Search",
  hideLabel = false,
  error,
  hint,
  labelExtra,
  allowClear = true,
  className,
  disabled,
  placeholder = "Search…",
  ...inputProps
}: SearchFieldProps) {
  const showClear = allowClear && Boolean(value) && !disabled;

  return (
    <div className={className}>
      {(!hideLabel || labelExtra) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor={id}
            className={[
              "text-sm font-medium",
              hideLabel ? "sr-only" : "",
              disabled ? "text-gray-400" : "text-[#524D44]",
            ].join(" ")}
          >
            {label}
          </label>
          {labelExtra}
        </div>
      )}

      {hideLabel && !labelExtra ? (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <SearchOutlined
          aria-hidden
          className={[
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm",
            disabled ? "text-gray-400" : "text-inputMuted",
          ].join(" ")}
        />
        <input
          id={id}
          type="search"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className={[
            "h-10 w-full rounded-md border py-2 pl-9 text-sm text-gray-900 outline-none transition-[color,box-shadow]",
            "placeholder:text-inputMuted",
            // Hide native WebKit clear — we render our own
            "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
            showClear ? "pr-9" : "pr-3",
            disabled ? "cursor-not-allowed bg-[#EFEEEB] text-gray-500" : "bg-white",
            error
              ? "border border-error focus:border-error focus:shadow-[0_0_0_1px_theme(colors.error)] focus:ring-0"
              : "border border-[var(--color-border-default,#CFCCC5)] focus:border-inputFocus focus:shadow-[0_0_0_1px_theme(colors.inputFocus)] focus:ring-0",
          ].join(" ")}
          {...inputProps}
        />

        {showClear ? (
          <button
            type="button"
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-inputMuted transition-colors hover:text-subtle"
            onClick={() => onChange("")}
          >
            <CloseCircleFilled className="text-sm" />
          </button>
        ) : null}
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
