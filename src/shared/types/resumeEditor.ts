export type EditorSectionId =
  | "personal_details"
  | "professional_summary"
  | "work_experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "references";

export type EditorSectionStatus = "complete" | "empty" | "warning" | "hidden";

export type EditorSectionMeta = {
  id: EditorSectionId;
  label: string;
  count?: number;
  status: EditorSectionStatus;
};

export type WorkExperienceEntry = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  highlights: string[];
  technologies: string[];
  expanded: boolean;
};

export type ResumeEditorState = {
  title: string;
  activeSectionId: EditorSectionId;
  sections: EditorSectionMeta[];
  workExperience: WorkExperienceEntry[];
  completionPercent: number;
  emptySectionCount: number;
};
