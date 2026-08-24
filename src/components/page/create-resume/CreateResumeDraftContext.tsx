import { createContext, useMemo, useState, type ReactNode } from "react";
import type {
  CreateMethod,
  CreateResumeDraft,
  WizardStep,
  WizardView,
} from "./createResumeTypes";

export type CreateResumeDraftContextValue = {
  draft: CreateResumeDraft;
  setMethod: (method: CreateMethod) => void;
  patchDetails: (
    patch: Partial<
      Pick<CreateResumeDraft, "name" | "targetJobTitle" | "experienceLevel" | "industry">
    >,
  ) => void;
  setTemplateId: (templateId: string | null) => void;
  setStep: (step: WizardStep) => void;
  setView: (view: WizardView) => void;
};

const INITIAL_DRAFT: CreateResumeDraft = {
  step: 1,
  view: "wizard",
  method: null,
  name: "",
  targetJobTitle: "",
  experienceLevel: null,
  industry: null,
  templateId: null,
};

export const CreateResumeDraftContext = createContext<CreateResumeDraftContextValue | null>(null);

export function CreateResumeDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<CreateResumeDraft>(INITIAL_DRAFT);

  const value = useMemo<CreateResumeDraftContextValue>(
    () => ({
      draft,
      setMethod: (method) => setDraft((prev) => ({ ...prev, method })),
      patchDetails: (patch) => setDraft((prev) => ({ ...prev, ...patch })),
      setTemplateId: (templateId) => setDraft((prev) => ({ ...prev, templateId })),
      setStep: (step) => setDraft((prev) => ({ ...prev, step, view: "wizard" })),
      setView: (view) => setDraft((prev) => ({ ...prev, view })),
    }),
    [draft],
  );

  return (
    <CreateResumeDraftContext.Provider value={value}>{children}</CreateResumeDraftContext.Provider>
  );
}
