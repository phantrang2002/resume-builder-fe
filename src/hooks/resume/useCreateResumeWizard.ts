import { getMockTemplateById } from "@/shared/constants";
import type { CreatePhase } from "@/shared/types";
import { useCallback, useState } from "react";
import useCreateResumeDraft from "./useCreateResumeDraft";

export default function useCreateResumeWizard() {
  const { draft, setStep, setView } = useCreateResumeDraft();
  const [phase, setPhase] = useState<CreatePhase>("wizard");

  const selectedTemplate = getMockTemplateById(draft.templateId);
  const resumeName = draft.name.trim() || "Untitled resume";
  const templateName = selectedTemplate?.name ?? "Selected";
  const isBusy = phase === "creating";

  const startCreate = useCallback(() => {
    if (phase === "creating" || !draft.templateId) {
      return;
    }
    setStep(3);
    setPhase("creating");
  }, [draft.templateId, phase, setStep]);

  const handleCreateComplete = useCallback(() => {
    // Temporary: always land on the create-error screen instead of the editor.
    setPhase("error");
  }, []);

  const retryCreate = useCallback(() => {
    if (!draft.templateId) {
      return;
    }
    setPhase("creating");
  }, [draft.templateId]);

  const backFromError = useCallback(() => {
    setPhase("wizard");
    setView("wizard");
    setStep(3);
  }, [setStep, setView]);

  return {
    draft,
    phase,
    selectedTemplate,
    resumeName,
    templateName,
    isBusy,
    startCreate,
    handleCreateComplete,
    retryCreate,
    backFromError,
  };
}
