import { selectSession } from "@/app/features/auth/authSelector";
import { useAppSelector } from "@/app/store/hooks";
import {
  CheckCircleFilled,
  EditOutlined,
  ExportOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";

type ResumeEditorHeaderProps = {
  title: string;
  onTitleChange: (value: string) => void;
  saveStatus: "saved" | "saving";
};

function getInitials(firstName?: string, lastName?: string, email?: string) {
  const fromName = [firstName?.[0], lastName?.[0]].filter(Boolean).join("");
  if (fromName) {
    return fromName.toUpperCase();
  }
  return (email?.[0] ?? "?").toUpperCase();
}

export default function ResumeEditorHeader({
  title,
  onTitleChange,
  saveStatus,
}: ResumeEditorHeaderProps) {
  const session = useAppSelector(selectSession);
  const initials = getInitials(session?.firstName, session?.lastName, session?.email);

  return (
    <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#E5E3DE] bg-white px-4 py-2.5 sm:px-5">
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
        <div className="inline-flex shrink-0 items-baseline gap-1.5 font-serif text-[20px] font-semibold leading-none tracking-tight text-[#333333]">
          Rezum
          <span className="size-[5px] shrink-0 rounded-full bg-primary" aria-hidden="true" />
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            aria-label="Resume title"
            className="min-w-0 max-w-[280px] truncate border-none bg-transparent text-sm font-medium text-pageTitle outline-none focus:ring-0 sm:max-w-[360px]"
          />
          <EditOutlined className="shrink-0 text-xs text-subtle" aria-hidden="true" />
        </div>

        <span className="hidden shrink-0 rounded-md border border-[#E5E3DE] bg-[#FAFAF8] px-2 py-0.5 text-xs font-medium text-secondary sm:inline">
          Draft
        </span>

        <span className="hidden items-center gap-1.5 text-xs text-subtle lg:flex">
          {saveStatus === "saved" ? (
            <>
              <CheckCircleFilled className="text-[#22C55E]" />
              All changes saved
            </>
          ) : (
            "Saving…"
          )}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            aria-label="Undo"
            className="inline-flex size-8 items-center justify-center rounded-md text-subtle transition-colors hover:bg-gray-50 hover:text-pageTitle"
          >
            <UndoOutlined />
          </button>
          <button
            type="button"
            aria-label="Redo"
            className="inline-flex size-8 items-center justify-center rounded-md text-subtle transition-colors hover:bg-gray-50 hover:text-pageTitle"
          >
            <RedoOutlined />
          </button>
        </div>

        <button
          type="button"
          className="hidden h-9 items-center rounded-lg border border-[#E5E3DE] bg-white px-3.5 text-sm font-medium text-secondary transition-colors hover:bg-gray-50 sm:inline-flex"
        >
          Preview
        </button>

        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 sm:px-4"
        >
          <ExportOutlined className="text-sm" />
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">Export</span>
        </button>

        <div
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E8EDF3] text-xs font-semibold text-primary"
          aria-label="User profile"
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
