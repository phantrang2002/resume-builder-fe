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

export type CreateResumeData = {
  id: number;
};
