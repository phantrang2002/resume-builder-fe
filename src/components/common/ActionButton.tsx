import { LoadingOutlined } from "@ant-design/icons";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ActionButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ActionButton({
  children,
  loading = false,
  loadingLabel = "Signing you in...",
  fullWidth = true,
  disabled,
  className,
  type = "button",
  ...buttonProps
}: ActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        fullWidth
          ? "flex h-10 w-full"
          : "inline-flex h-10 w-auto shrink-0",
        "items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-colors",
        loading
          ? "bg-primary/75"
          : "bg-primary hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...buttonProps}
    >
      {loading ? (
        <>
          <LoadingOutlined spin className="text-base" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
