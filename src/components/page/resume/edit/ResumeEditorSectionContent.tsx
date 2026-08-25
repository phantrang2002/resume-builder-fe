import WorkExperienceSectionEditor from "@/components/page/resume/edit/WorkExperienceSectionEditor";
import type { EditorSectionId, WorkExperienceEntry } from "@/shared/types/resumeEditor";

type ResumeEditorSectionContentProps = {
  activeSectionId: EditorSectionId;
  workExperience: WorkExperienceEntry[];
  onCollapseAllWorkEntries: () => void;
  onToggleWorkEntryExpanded: (id: string) => void;
  onPatchWorkEntry: (id: string, patch: Partial<WorkExperienceEntry>) => void;
  onUpdateHighlight: (entryId: string, index: number, value: string) => void;
  onRemoveHighlight: (entryId: string, index: number) => void;
  onAddHighlight: (entryId: string) => void;
  onUpdateTechnologies: (entryId: string, technologies: string[]) => void;
  onAddWorkEntry: () => void;
};

const SECTION_LABELS: Record<EditorSectionId, string> = {
  personal_details: "Personal details",
  professional_summary: "Professional summary",
  work_experience: "Work experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certifications: "Certifications",
  languages: "Languages",
  references: "References",
};

export default function ResumeEditorSectionContent({
  activeSectionId,
  workExperience,
  onCollapseAllWorkEntries,
  onToggleWorkEntryExpanded,
  onPatchWorkEntry,
  onUpdateHighlight,
  onRemoveHighlight,
  onAddHighlight,
  onUpdateTechnologies,
  onAddWorkEntry,
}: ResumeEditorSectionContentProps) {
  if (activeSectionId === "work_experience") {
    return (
      <WorkExperienceSectionEditor
        entries={workExperience}
        onCollapseAll={onCollapseAllWorkEntries}
        onToggleExpanded={onToggleWorkEntryExpanded}
        onPatchEntry={onPatchWorkEntry}
        onUpdateHighlight={onUpdateHighlight}
        onRemoveHighlight={onRemoveHighlight}
        onAddHighlight={onAddHighlight}
        onUpdateTechnologies={onUpdateTechnologies}
        onAddEntry={onAddWorkEntry}
      />
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-[#E5E3DE] bg-white px-5 py-4 sm:px-6">
        <h1 className="text-lg font-semibold text-pageTitle">{SECTION_LABELS[activeSectionId]}</h1>
        <p className="mt-1 text-sm text-subtle">This section editor will be available in a future update.</p>
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <p className="max-w-sm text-center text-sm text-subtle">
          Switch to <span className="font-medium text-secondary">Work experience</span> to explore the
          fully built editor panel.
        </p>
      </div>
    </div>
  );
}
