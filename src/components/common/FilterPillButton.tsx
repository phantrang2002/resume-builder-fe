import type { ReactNode } from "react";

type FilterPillButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
};

export default function FilterPillButton({
  active,
  onClick,
  children,
  className = "",
}: FilterPillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-9 rounded-md px-3.5 text-sm transition-colors",
        active
          ? "bg-[#1F1D19] font-medium text-white"
          : "border border-[#E5E3DE] bg-white text-pageTitle hover:border-[#CFCCC5]",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
