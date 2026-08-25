import type { EditorSectionMeta } from "@/shared/types/resumeEditor";

/** Default section list for the editor sidebar — counts/statuses are derived from API + local edits. */
export const EDITOR_SECTION_DEFINITIONS: Omit<EditorSectionMeta, "count" | "status">[] = [
  { id: "personal_details", label: "Personal details" },
  { id: "professional_summary", label: "Professional summary" },
  { id: "work_experience", label: "Work experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "references", label: "References" },
];

export function buildEditorSections(options: {
  completionRatio: number;
  sectionCount: number;
  workExperienceCount: number;
}): EditorSectionMeta[] {
  const filledCount = Math.round((options.completionRatio / 100) * options.sectionCount);
  const emptyCount = Math.max(0, options.sectionCount - filledCount);

  return EDITOR_SECTION_DEFINITIONS.map((section, index) => {
    const isFilled = index < filledCount;
    const isEmpty = index >= options.sectionCount - emptyCount && emptyCount > 0;

    let status: EditorSectionMeta["status"] = isFilled ? "complete" : "empty";
    if (section.id === "certifications" && isEmpty) {
      status = "warning";
    }
    if (section.id === "references") {
      status = "hidden";
    }

    const count =
      section.id === "work_experience" && options.workExperienceCount > 0
        ? options.workExperienceCount
        : undefined;

    return { ...section, status, count };
  });
}

export function estimateEmptySectionCount(completionRatio: number, sectionCount: number): number {
  return Math.max(0, sectionCount - Math.round((completionRatio / 100) * sectionCount));
}
