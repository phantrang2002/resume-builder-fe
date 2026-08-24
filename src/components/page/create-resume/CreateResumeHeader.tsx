import { ROUTER_PATH } from "@/shared/constants";
import { useNavigate } from "react-router-dom";
import { useCreateResumeDraft } from "./useCreateResumeDraft";

type CreateResumeHeaderProps = {
  cancelDisabled?: boolean;
};

export default function CreateResumeHeader({ cancelDisabled = false }: CreateResumeHeaderProps) {
  const navigate = useNavigate();
  const { draft } = useCreateResumeDraft();
  const title = draft.step > 1 && draft.name.trim() ? draft.name.trim() : "New resume";

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#E5E3DE] bg-white px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="inline-flex shrink-0 items-baseline gap-1.5 font-serif text-[20px] font-semibold leading-none tracking-tight text-[#333333]">
          Rezum
          <span className="size-[5px] shrink-0 rounded-full bg-primary" aria-hidden="true" />
        </div>
        <span className="truncate text-sm font-medium text-pageTitle">{title}</span>
      </div>
      <button
        type="button"
        disabled={cancelDisabled}
        onClick={() => navigate(ROUTER_PATH.DASHBOARD)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-subtle transition-colors hover:bg-gray-50 hover:text-pageTitle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancel
      </button>
    </header>
  );
}
