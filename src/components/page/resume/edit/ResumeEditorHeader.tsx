import ActionButton from "@/components/common/ActionButton";
import UserAvatar, { getUserInitials } from "@/components/common/UserAvatar";
import { selectSession } from "@/app/features/auth/authSelector";
import { useAppSelector } from "@/app/store/hooks";
import StatusBadge from "@/components/common/StatusBadge";
import { ROUTER_PATH } from "@/shared/constants";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type ResumeEditorHeaderProps = {
  title: string;
  onTitleChange: (value: string) => void;
  saveStatus: "saved" | "saving";
};

function HeaderDivider() {
  return <span className="hidden h-5 w-px shrink-0 bg-[#E5E3DE] sm:block" aria-hidden="true" />;
}

export default function ResumeEditorHeader({
  title,
  onTitleChange,
  saveStatus,
}: ResumeEditorHeaderProps) {
  const navigate = useNavigate();
  const session = useAppSelector(selectSession);
  const initials = getUserInitials(session?.firstName, session?.lastName, session?.email);

  const goBack = () => navigate(ROUTER_PATH.RESUMES);

  return (
    <header className="flex min-w-0 shrink-0 items-center gap-2 border-b border-[#E5E3DE] bg-white px-4 py-3 sm:gap-3 sm:px-5">
      <button
        type="button"
        aria-label="Back to my resumes"
        onClick={goBack}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-secondary transition-colors hover:bg-gray-50 hover:text-pageTitle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
      >
        <ArrowLeftOutlined className="text-sm" />
      </button>

      <span className="shrink-0 font-serif text-[22px] font-semibold leading-none tracking-tight text-[#1a1a1a]">
        Rezum
      </span>

      <HeaderDivider />

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <label className="flex min-w-0 w-[120px] items-center gap-2 rounded-sm border border-[#E5E3DE] bg-white px-2.5 py-1.5 sm:w-[160px] md:w-[200px] lg:w-[240px] xl:w-[280px]">
          <input
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            aria-label="Resume title"
            className="min-w-0 flex-1 truncate border-none bg-transparent text-sm font-normal text-pageTitle outline-none focus:ring-0"
          />
          <EditOutlined className="shrink-0 text-sm text-subtle" aria-hidden="true" />
        </label>

        <StatusBadge variant="draft" className="hidden shrink-0 sm:inline-flex" />

        <span
          className="hidden shrink-0 items-center gap-1.5 text-sm text-subtle md:flex"
          title={saveStatus === "saved" ? "All changes saved" : undefined}
        >
          {saveStatus === "saved" ? (
            <>
              <CheckCircleOutlined className="text-success" />
              <span className="hidden xl:inline">All changes saved</span>
            </>
          ) : (
            "Saving…"
          )}
        </span>
      </div>

      <HeaderDivider />

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="hidden h-10 shrink-0 items-center whitespace-nowrap rounded-md border border-[#CFCCC5] bg-white px-3 text-sm font-medium text-secondary transition-colors hover:bg-gray-50 lg:inline-flex"
        >
          Preview
        </button>

        <ActionButton fullWidth={false} className="h-10 whitespace-nowrap px-3 font-medium lg:px-3.5">
          <span className="hidden lg:inline">Export PDF</span>
          <span className="lg:hidden">Export</span>
        </ActionButton>

        <HeaderDivider />

        <UserAvatar initials={initials} size="sm" />
      </div>
    </header>
  );
}
