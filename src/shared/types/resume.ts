export type CreateMethod = "scratch" | "template" | "import";
export type ExperienceLevel = "intern" | "junior" | "mid" | "senior";
export type ExperienceLevelApi = "INTERN" | "JUNIOR" | "MID" | "SENIOR";
export type WizardStep = 1 | 2 | 3;
export type WizardView = "wizard" | "preview";
export type CreatePhase = "wizard" | "creating" | "error";

export type CreateResumeDraft = {
  step: WizardStep;
  view: WizardView;
  method: CreateMethod | null;
  name: string;
  targetJobTitle: string;
  experienceLevel: ExperienceLevel | null;
  industryId: string | null;
  templateId: string | null;
};

export type CreateResumeLocationState = {
  draftSnapshot: CreateResumeDraft;
  templateName?: string;
};

export type CreateResumeParams = {
  title: string;
  targetJobTitle: string;
  templateId: number;
  experienceLevel?: ExperienceLevelApi;
  industryId?: number;
  cloneFromResumeId?: number;
};

export type CreateResumeData = ResumeListItem;

export type ResumeStatus = "DRAFT" | "READY" | "ARCHIVED";

export type ResumeListItem = {
  id: number;
  title: string;
  targetJobTitle: string;
  status: ResumeStatus;
  templateKey: string;
  templateName: string;
  thumbnailUrl: string;
  updatedAt: string;
  lastExportedAt: string | null;
  sectionCount: number;
  completionRatio: number;
  isTailored: boolean;
};

export type ResumesSummary = {
  total: number;
  tailoredCount: number;
};

export type ResumesData = {
  items: ResumeListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  summary: ResumesSummary;
};

export type ResumeStatusFilter = "all" | Lowercase<ResumeStatus>;

export type ResumeSortKey = "updatedAt";

export type ResumeTemplateFilter = "all" | "modern" | "minimal" | "classic" | "ats";

export type GetResumesParams = {
  search?: string;
  status?: ResumeStatus;
  sort?: ResumeSortKey;
  page?: number;
  pageSize?: number;
};
