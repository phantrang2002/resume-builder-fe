import type { ResumeStatus } from "@/shared/types";
import { formatResumeStatus } from "@/shared/helpers";

export type StatusBadgeVariant =
  | "draft"
  | "default"
  | "ready"
  | "incomplete"
  | "failed"
  | "ats-friendly";

const VARIANT_STYLES: Record<StatusBadgeVariant, string> = {
  draft: "border-[#E3E1DC] bg-[#EFEEEB] text-secondary",
  default: "border-[#DBEAFE] bg-[#EFF6FF] text-[#1E40AF]",
  ready: "border-[#D1FAE5] bg-[#ECFDF5] text-[#065F46]",
  incomplete: "border-[#FFEDD5] bg-[#FFF7ED] text-[#9A3412]",
  failed: "border-[#FEE2E2] bg-[#FEF2F2] text-[#991B1B]",
  "ats-friendly": "border-[#DBEAFE] bg-[#EFF6FF] text-[#1E40AF]",
};

const VARIANT_LABELS: Record<StatusBadgeVariant, string> = {
  draft: "Draft",
  default: "Default",
  ready: "Ready",
  incomplete: "Incomplete",
  failed: "Failed",
  "ats-friendly": "ATS-friendly",
};

type StatusBadgeProps = {
  variant: StatusBadgeVariant;
  label?: string;
  className?: string;
};

export function resumeStatusToBadgeVariant(status: ResumeStatus): StatusBadgeVariant {
  switch (status) {
    case "READY":
      return "ready";
    case "ARCHIVED":
      return "draft";
    default:
      return "draft";
  }
}

export function getStatusBadgeLabel(variant: StatusBadgeVariant): string {
  return VARIANT_LABELS[variant];
}

export default function StatusBadge({ variant, label, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-sm border px-[8px] py-[3px] text-xs font-medium leading-none",
        VARIANT_STYLES[variant],
        className,
      ].join(" ")}
    >
      {label ?? VARIANT_LABELS[variant]}
    </span>
  );
}

export function ResumeStatusBadge({
  status,
  className,
}: {
  status: ResumeStatus;
  className?: string;
}) {
  return (
    <StatusBadge
      variant={resumeStatusToBadgeVariant(status)}
      label={formatResumeStatus(status)}
      className={className}
    />
  );
}
