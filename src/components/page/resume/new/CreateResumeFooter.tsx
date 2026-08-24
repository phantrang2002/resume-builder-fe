import type { ReactNode } from "react";

type CreateResumeFooterProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
};

export default function CreateResumeFooter({ left, center, right }: CreateResumeFooterProps) {
  return (
    <footer className="sticky bottom-0 z-10 shrink-0 border-t border-[#E5E3DE] bg-white px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">{left}</div>
        {center ? (
          <div className="order-first text-center text-sm text-subtle sm:order-none">{center}</div>
        ) : null}
        <div className="flex flex-wrap items-center justify-end gap-2">{right}</div>
      </div>
    </footer>
  );
}

type FooterButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
};

export function FooterButton({
  children,
  onClick,
  disabled = false,
  variant = "secondary",
  type = "button",
  className = "",
}: FooterButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary disabled:bg-primary/50"
      : variant === "ghost"
        ? "text-subtle hover:bg-gray-50 hover:text-pageTitle focus-visible:outline-gray-400"
        : "border border-gray-300 bg-white text-pageTitle hover:bg-gray-50 focus-visible:outline-gray-400 disabled:opacity-50";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed",
        variantClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
