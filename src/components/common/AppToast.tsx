import type { ReactNode } from "react";
import {
  ToastCloseIcon,
  ToastErrorIcon,
  ToastInfoIcon,
  ToastSuccessIcon,
} from "@/components/common/ToastIcons";

export type AppToastVariant = "success" | "error" | "info";

type AppToastProps = {
  variant: AppToastVariant;
  title: string;
  description?: string;
  onClose?: () => void;
};

const variantIcons: Record<AppToastVariant, { icon: ReactNode; iconColor: string }> = {
  success: {
    icon: <ToastSuccessIcon />,
    iconColor: "text-[#2F5F48]",
  },
  error: {
    icon: <ToastErrorIcon />,
    iconColor: "text-[#9E4437]",
  },
  info: {
    icon: <ToastInfoIcon />,
    iconColor: "text-primary",
  },
};

export default function AppToast({ variant, title, description, onClose }: AppToastProps) {
  const { icon, iconColor } = variantIcons[variant];

  return (
    <div
      role="status"
      className="relative box-border w-[360px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#E3E1DC] bg-white pb-3 pl-[14px] pt-3 shadow-[0px_16px_40px_-8px_#1F1D1929,0px_2px_6px_-1px_#1F1D190F]"
    >
      <div className="grid grid-cols-[18px_minmax(0,1fr)] items-start gap-x-[10px]">
        <span className={`row-start-1 inline-flex h-[18px] w-[18px] shrink-0 ${iconColor}`}>
          {icon}
        </span>

        <p className="row-start-1 min-w-0 pr-6 text-sm font-semibold leading-snug text-pageTitle">
          {title}
        </p>

        {description ? (
          <p className="col-start-2 row-start-2 mt-1 min-w-0 pr-6 text-sm font-normal leading-relaxed text-[#666666]">
            {description}
          </p>
        ) : null}
      </div>

      {onClose ? (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onClose}
          className="absolute right-[14px] top-3 text-muted transition-colors hover:text-subtle"
        >
          <ToastCloseIcon />
        </button>
      ) : null}
    </div>
  );
}
