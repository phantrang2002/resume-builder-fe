import type { ResumeListItem } from "@/shared/types";
import { ResumeStatusBadge } from "@/components/common/StatusBadge";
import { formatRelativeEditedAt, resolveMediaUrl } from "@/shared/helpers";
import { resumeEditPath } from "@/shared/constants";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  FormOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ResumeCardProps = {
  resume: ResumeListItem;
  viewMode: "grid" | "list";
};

export default function ResumeCard({ resume, viewMode }: ResumeCardProps) {
  const navigate = useNavigate();
  const thumbnailSrc = resolveMediaUrl(resume.thumbnailUrl);

  const goToEditor = () => navigate(resumeEditPath(String(resume.id)));

  const menuItems: MenuProps["items"] = [
    { key: "edit", icon: <EditOutlined />, label: "Edit", onClick: goToEditor },
    { key: "duplicate", icon: <CopyOutlined />, label: "Duplicate", disabled: true },
    { key: "rename", icon: <FormOutlined />, label: "Rename", disabled: true },
    { key: "export", icon: <ExportOutlined />, label: "Export PDF", disabled: true },
    { key: "history", icon: <HistoryOutlined />, label: "Version history", disabled: true },
    { type: "divider" },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: <span className="text-error">Delete</span>,
      disabled: true,
    },
  ];

  if (viewMode === "list") {
    return (
      <article className="flex items-center gap-4 rounded-2xl border border-[#E3E1DC] bg-white p-4 transition-shadow hover:shadow-sm">
        <button type="button" onClick={goToEditor} className="shrink-0">
          <img
            src={thumbnailSrc}
            alt=""
            className="h-[88px] w-[64px] rounded-md border border-[#EFEEEB] object-cover object-top"
          />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <button type="button" onClick={goToEditor} className="min-w-0 text-left">
              <h2 className="truncate text-sm font-semibold text-pageTitle">{resume.title}</h2>
              <p className="mt-1 text-xs text-subtle">{formatRelativeEditedAt(resume.updatedAt)}</p>
            </button>
            <CardMenu menuItems={menuItems} />
          </div>
          <div className="mt-3 flex items-center gap-3">
            <ResumeStatusBadge status={resume.status} />
            <ProgressBar ratio={resume.completionRatio} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-inputMuted bg-white transition-shadow hover:shadow-sm">
      <button type="button" onClick={goToEditor} className="relative bg-lightBg p-4 pb-3">
        <img
          src={thumbnailSrc}
          alt=""
          className="mx-auto aspect-[3/4] w-full max-w-[160px] border border-[#E3E1DC] object-cover object-top shadow-sm"
        />
      </button>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-2">
          <button type="button" onClick={goToEditor} className="min-w-0 flex-1 text-left">
            <h2 className="truncate text-sm font-semibold text-pageTitle">{resume.title}</h2>
          </button>
          <CardMenu menuItems={menuItems} />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <ResumeStatusBadge status={resume.status} />
          <span className="text-xs text-subtle">{formatRelativeEditedAt(resume.updatedAt)}</span>
        </div>

        <div className="mt-auto pt-4">
          <ProgressBar ratio={resume.completionRatio} showLabel />
        </div>
      </div>
    </article>
  );
}

function ProgressBar({ ratio, showLabel = false }: { ratio: number; showLabel?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${showLabel ? "w-full" : "min-w-[120px] flex-1"}`}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EFEEEB]">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${Math.min(100, Math.max(0, ratio))}%` }}
        />
      </div>
      {showLabel ? <span className="shrink-0 text-[11px] text-subtle">{ratio}%</span> : null}
    </div>
  );
}

function CardMenu({ menuItems }: { menuItems: MenuProps["items"] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
      open={open}
      onOpenChange={setOpen}
    >
      <button
        type="button"
        aria-label="Resume options"
        aria-expanded={open}
        className={[
          "inline-flex size-7 shrink-0 items-center justify-center rounded-md transition-colors",
          open
            ? "bg-[#EFEEEB] text-pageTitle"
            : "text-subtle hover:bg-[#EFEEEB] hover:text-pageTitle",
        ].join(" ")}
        onClick={(event) => event.stopPropagation()}
      >
        <EllipsisOutlined />
      </button>
    </Dropdown>
  );
}
