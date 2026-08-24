import { ROUTER_PATH } from "@/shared/constants";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateResumeDraft } from "./useCreateResumeDraft";

type CreateResumeHeaderProps = {
  cancelDisabled?: boolean;
};

export default function CreateResumeHeader({ cancelDisabled = false }: CreateResumeHeaderProps) {
  const navigate = useNavigate();
  const { draft } = useCreateResumeDraft();
  const title = draft.step > 1 && draft.name.trim() ? draft.name.trim() : "New resume";

  const goToDashboard = () => navigate(ROUTER_PATH.DASHBOARD);

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#E5E3DE] bg-white px-5 py-3.5 sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          disabled={cancelDisabled}
          aria-label="Back to dashboard"
          onClick={goToDashboard}
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-[#6B7280] transition-colors hover:bg-gray-50 hover:text-pageTitle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeftOutlined className="text-sm text-secondary" />
        </button>

        <span className="shrink-0 font-serif text-[22px] font-semibold leading-none tracking-tight text-[#1a1a1a]">
          Rezum
        </span>

        <span className="hidden h-5 w-px shrink-0 bg-[#E5E3DE] sm:block" aria-hidden="true" />

        <span className="truncate text-[15px] font-normal text-secondary">{title}</span>
      </div>

      <button
        type="button"
        disabled={cancelDisabled}
        onClick={goToDashboard}
        className="rounded-md px-1 py-1 text-[15px] font-normal text-secondary transition-colors hover:text-pageTitle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>
    </header>
  );
}
