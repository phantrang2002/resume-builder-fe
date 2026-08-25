import ActionButton from "@/components/common/ActionButton";
import { FileTextOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "@/shared/constants";

export default function ResumesEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-center justify-center py-10 sm:py-16">
      <div className="relative w-full max-w-[560px] rounded-2xl bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible text-[#D8D5CE]"
          aria-hidden
        >
          <rect
            width="100%"
            height="100%"
            rx="16"
            ry="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="flex justify-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#EFEEEB]">
            <FileTextOutlined className="text-xl text-subtle" aria-hidden />
          </span>
        </div>

        <h2 className="mt-[14px] text-[22px] font-semibold text-[#1F1D19]">Nothing here yet</h2>
        <p className="mx-auto mt-[14px] max-w-[400px] text-sm leading-relaxed text-secondary">
          Every resume you create shows up here. You can duplicate one to tailor it for a specific
          role without touching the original.
        </p>

        <ActionButton
          fullWidth={false}
          onClick={() => navigate(ROUTER_PATH.RESUMES_NEW)}
          className="mt-[14px] px-5 font-medium"
        >
          Create a resume
        </ActionButton>
      </div>
    </div>
  );
}

export function ResumesFilteredEmptyState() {
  return (
    <div className="rounded-2xl border border-[#E3E1DC] bg-white px-6 py-10 text-center">
      <p className="text-sm text-subtle">No resumes match your filters.</p>
    </div>
  );
}
