import { CheckOutlined } from "@ant-design/icons";
import { InputHTMLAttributes, ReactNode } from "react";

type CheckboxFieldProps = {
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type" | "checked" | "onChange">;

export default function CheckboxField({
  id,
  label,
  checked,
  onChange,
  className,
  disabled,
  ...inputProps
}: CheckboxFieldProps) {
  return (
    <label
      htmlFor={id}
      className={[
        "flex items-start gap-3",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
        {...inputProps}
      />

      <span
        aria-hidden="true"
        className={[
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20 peer-focus-visible:ring-offset-1",
          checked ? "border-primary bg-primary" : "border-gray-300 bg-white",
        ].join(" ")}
      >
        {checked && <CheckOutlined className="text-[10px] text-white" />}
      </span>

      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
