import WorkExperienceEntryCard from "@/components/page/resume/edit/WorkExperienceEntryCard";
import type { WorkExperienceEntry } from "@/shared/types/resumeEditor";
import { PlusOutlined } from "@ant-design/icons";

type WorkExperienceSectionEditorProps = {
  entries: WorkExperienceEntry[];
  onCollapseAll: () => void;
  onToggleExpanded: (id: string) => void;
  onPatchEntry: (id: string, patch: Partial<WorkExperienceEntry>) => void;
  onUpdateHighlight: (entryId: string, index: number, value: string) => void;
  onRemoveHighlight: (entryId: string, index: number) => void;
  onAddHighlight: (entryId: string) => void;
  onUpdateTechnologies: (entryId: string, technologies: string[]) => void;
  onAddEntry: () => void;
};

export default function WorkExperienceSectionEditor({
  entries,
  onCollapseAll,
  onToggleExpanded,
  onPatchEntry,
  onUpdateHighlight,
  onRemoveHighlight,
  onAddHighlight,
  onUpdateTechnologies,
  onAddEntry,
}: WorkExperienceSectionEditorProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#E5E3DE] bg-white px-5 py-4 sm:px-6">
        <div>
          <h1 className="text-lg font-semibold text-pageTitle">Work experience</h1>
          <p className="mt-1 text-sm text-subtle">
            Most recent first. Lead each bullet with a verb and a number where you can.
          </p>
        </div>
        <button
          type="button"
          onClick={onCollapseAll}
          className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Collapse all
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-3">
          {entries.map((entry) => (
            <WorkExperienceEntryCard
              key={entry.id}
              entry={entry}
              onToggleExpanded={() => onToggleExpanded(entry.id)}
              onPatch={(patch) => onPatchEntry(entry.id, patch)}
              onUpdateHighlight={(index, value) => onUpdateHighlight(entry.id, index, value)}
              onRemoveHighlight={(index) => onRemoveHighlight(entry.id, index)}
              onAddHighlight={() => onAddHighlight(entry.id)}
              onUpdateTechnologies={(technologies) => onUpdateTechnologies(entry.id, technologies)}
            />
          ))}

          <button
            type="button"
            onClick={onAddEntry}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#CFCCC5] bg-white px-4 py-3.5 text-sm font-medium text-subtle transition-colors hover:border-primary hover:text-primary"
          >
            <PlusOutlined />
            Add work experience
          </button>
        </div>
      </div>
    </div>
  );
}
