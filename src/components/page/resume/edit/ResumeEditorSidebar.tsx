import type { EditorSectionId, EditorSectionMeta } from "@/shared/types/resumeEditor";
import {
  BookOutlined,
  CheckOutlined,
  EyeInvisibleOutlined,
  FileTextOutlined,
  GlobalOutlined,
  IdcardOutlined,
  PlusOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  SolutionOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

type ResumeEditorSidebarProps = {
  sections: EditorSectionMeta[];
  activeSectionId: EditorSectionId;
  completionPercent: number;
  emptySectionCount: number;
  onSectionSelect: (id: EditorSectionId) => void;
};

const SECTION_ICONS: Record<EditorSectionId, ReactNode> = {
  personal_details: <IdcardOutlined />,
  professional_summary: <FileTextOutlined />,
  work_experience: <SolutionOutlined />,
  education: <BookOutlined />,
  skills: <ToolOutlined />,
  projects: <ProjectOutlined />,
  certifications: <SafetyCertificateOutlined />,
  languages: <GlobalOutlined />,
  references: <SolutionOutlined />,
};

function SectionStatusIndicator({ section }: { section: EditorSectionMeta }) {
  if (section.status === "complete") {
    return <CheckOutlined className="text-xs text-[#22C55E]" aria-label="Complete" />;
  }
  if (section.status === "warning") {
    return (
      <span
        className="size-2 rounded-full bg-[#F59E0B]"
        aria-label="Needs attention"
      />
    );
  }
  if (section.status === "hidden") {
    return <EyeInvisibleOutlined className="text-xs text-subtle" aria-label="Hidden" />;
  }
  return (
    <span className="size-2 rounded-full border border-[#D4D0C8]" aria-label="Empty" />
  );
}

export default function ResumeEditorSidebar({
  sections,
  activeSectionId,
  completionPercent,
  emptySectionCount,
  onSectionSelect,
}: ResumeEditorSidebarProps) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#E5E3DE] bg-white lg:w-[240px]">
      <div className="border-b border-[#E5E3DE] px-4 py-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle">
          <span>Sections</span>
          <span className="text-secondary">{completionPercent}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EFEEEB]">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        {emptySectionCount > 0 ? (
          <p className="mt-2 text-xs text-subtle">
            {emptySectionCount} section{emptySectionCount === 1 ? "" : "s"} still empty
          </p>
        ) : null}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="space-y-0.5">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onSectionSelect(section.id)}
                  className={[
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    isActive
                      ? "bg-[#EEF3F8] font-medium text-primary"
                      : "font-normal text-secondary hover:bg-[#F7F7F5]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-sm",
                      isActive ? "bg-white text-primary" : "text-subtle",
                    ].join(" ")}
                  >
                    {SECTION_ICONS[section.id]}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{section.label}</span>
                  {section.count != null ? (
                    <span className="shrink-0 text-xs text-subtle">{section.count}</span>
                  ) : null}
                  <SectionStatusIndicator section={section} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[#E5E3DE] p-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#CFCCC5] px-3 py-2.5 text-sm font-medium text-subtle transition-colors hover:border-primary hover:text-primary"
        >
          <PlusOutlined />
          Add section
        </button>
      </div>
    </aside>
  );
}
