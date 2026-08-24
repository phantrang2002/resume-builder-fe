export type CreateMethod = "scratch" | "template" | "import";
export type ExperienceLevel = "student" | "junior" | "mid" | "senior";
export type WizardStep = 1 | 2 | 3;
export type WizardView = "wizard" | "preview";

export type CreateResumeDraft = {
  step: WizardStep;
  view: WizardView;
  method: CreateMethod | null;
  name: string;
  targetJobTitle: string;
  experienceLevel: ExperienceLevel | null;
  industry: string | null;
  templateId: string | null;
};

export type CreateResumeLocationState = {
  draftSnapshot: CreateResumeDraft;
  templateName?: string;
};
