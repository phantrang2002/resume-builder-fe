import InputField from "@/components/common/InputField";
import TagInputField from "@/components/page/resume/edit/TagInputField";
import type { WorkExperienceEntry } from "@/shared/types/resumeEditor";
import {
  CloseOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  HolderOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import type { ReactNode } from "react";

type WorkExperienceEntryCardProps = {
  entry: WorkExperienceEntry;
  onToggleExpanded: () => void;
  onPatch: (patch: Partial<WorkExperienceEntry>) => void;
  onUpdateHighlight: (index: number, value: string) => void;
  onRemoveHighlight: (index: number) => void;
  onAddHighlight: () => void;
  onUpdateTechnologies: (technologies: string[]) => void;
};

function formatDateRange(entry: WorkExperienceEntry): string {
  const end = entry.currentlyWorking ? "Present" : entry.endDate;
  return [entry.startDate, end].filter(Boolean).join(" – ");
}

export default function WorkExperienceEntryCard({
  entry,
  onToggleExpanded,
  onPatch,
  onUpdateHighlight,
  onRemoveHighlight,
  onAddHighlight,
  onUpdateTechnologies,
}: WorkExperienceEntryCardProps) {
  if (!entry.expanded) {
    return (
      <article className="rounded-xl border border-[#E5E3DE] bg-white">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <button
            type="button"
            aria-label="Drag to reorder"
            className="cursor-grab text-subtle"
          >
            <HolderOutlined />
          </button>
          <button
            type="button"
            onClick={onToggleExpanded}
            className="min-w-0 flex-1 text-left"
          >
            <p className="truncate text-sm font-semibold text-pageTitle">{entry.jobTitle}</p>
            <p className="truncate text-xs text-subtle">
              {[entry.company, formatDateRange(entry)].filter(Boolean).join(" · ")}
            </p>
          </button>
          <div className="flex shrink-0 items-center gap-1">
            <IconButton ariaLabel="Duplicate entry">
              <CopyOutlined />
            </IconButton>
            <IconButton ariaLabel="Delete entry">
              <DeleteOutlined />
            </IconButton>
            <IconButton ariaLabel="Expand entry" onClick={onToggleExpanded}>
              <DownOutlined className="text-xs" />
            </IconButton>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-xl border border-[#E5E3DE] bg-white shadow-[0_1px_3px_rgba(31,29,25,0.06)]">
      <div className="flex items-center gap-3 border-b border-[#EFEEEB] px-4 py-3.5">
        <button type="button" aria-label="Drag to reorder" className="cursor-grab text-subtle">
          <HolderOutlined />
        </button>
        <button type="button" onClick={onToggleExpanded} className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-semibold text-pageTitle">{entry.jobTitle}</p>
          <p className="truncate text-xs text-subtle">
            {[entry.company, formatDateRange(entry)].filter(Boolean).join(" · ")}
          </p>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <IconButton ariaLabel="Duplicate entry">
            <CopyOutlined />
          </IconButton>
          <IconButton ariaLabel="Delete entry">
            <DeleteOutlined />
          </IconButton>
          <IconButton ariaLabel="Collapse entry" onClick={onToggleExpanded}>
            <UpOutlined className="text-xs" />
          </IconButton>
        </div>
      </div>

      <div className="space-y-4 px-4 py-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id={`${entry.id}-job-title`}
            label="Job title"
            value={entry.jobTitle}
            onChange={(value) => onPatch({ jobTitle: value })}
          />
          <InputField
            id={`${entry.id}-company`}
            label="Company"
            value={entry.company}
            onChange={(value) => onPatch({ company: value })}
          />
          <InputField
            id={`${entry.id}-location`}
            label="Location"
            value={entry.location}
            onChange={(value) => onPatch({ location: value })}
          />
          <InputField
            id={`${entry.id}-start-date`}
            label="Start date"
            value={entry.startDate}
            onChange={(value) => onPatch({ startDate: value })}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            id={`${entry.id}-end-date`}
            label="End date"
            value={entry.currentlyWorking ? "Present" : entry.endDate}
            onChange={(value) => onPatch({ endDate: value, currentlyWorking: false })}
            disabled={entry.currentlyWorking}
          />
          <label className="flex items-end gap-2 pb-2.5 text-sm text-secondary">
            <input
              type="checkbox"
              checked={entry.currentlyWorking}
              onChange={(event) =>
                onPatch({
                  currentlyWorking: event.target.checked,
                  endDate: event.target.checked ? "Present" : entry.endDate,
                })
              }
              className="size-4 rounded border-[#CFCCC5] text-primary focus:ring-inputFocus"
            />
            I currently work here
          </label>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-secondary">Highlights</p>
          <div className="space-y-2">
            {entry.highlights.map((highlight, index) => (
              <div key={`${entry.id}-highlight-${index}`} className="flex items-start gap-2">
                <button
                  type="button"
                  aria-label="Drag highlight"
                  className="mt-2.5 cursor-grab text-subtle"
                >
                  <HolderOutlined className="text-xs" />
                </button>
                <textarea
                  value={highlight}
                  onChange={(event) => onUpdateHighlight(index, event.target.value)}
                  rows={2}
                  className="min-h-[44px] flex-1 resize-y rounded-md border border-[#CFCCC5] px-3 py-2 text-sm text-pageTitle outline-none transition-[color,box-shadow] placeholder:text-inputMuted focus:border-inputFocus focus:shadow-[0_0_0_1px_theme(colors.inputFocus)]"
                />
                <button
                  type="button"
                  aria-label="Remove highlight"
                  onClick={() => onRemoveHighlight(index)}
                  className="mt-2.5 text-subtle transition-colors hover:text-error"
                >
                  <CloseOutlined className="text-xs" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={onAddHighlight}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <PlusOutlined />
            Add a highlight
          </button>
        </div>

        <TagInputField
          id={`${entry.id}-technologies`}
          label="Technologies"
          tags={entry.technologies}
          onChange={onUpdateTechnologies}
        />
      </div>
    </article>
  );
}

function IconButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-md text-subtle transition-colors hover:bg-gray-50 hover:text-pageTitle"
    >
      {children}
    </button>
  );
}
