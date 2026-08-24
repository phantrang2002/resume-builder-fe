import { CreateResumeDraftProvider } from "@/components/page/create-resume/CreateResumeDraftContext";
import CreateResumeHeader from "@/components/page/create-resume/CreateResumeHeader";
import CreateResumeStepper from "@/components/page/create-resume/CreateResumeStepper";
import CreatingErrorView from "@/components/page/create-resume/CreatingErrorView";
import CreatingView from "@/components/page/create-resume/CreatingView";
import DetailsStep from "@/components/page/create-resume/DetailsStep";
import MethodStep from "@/components/page/create-resume/MethodStep";
import TemplatePreviewView from "@/components/page/create-resume/TemplatePreviewView";
import TemplateStep from "@/components/page/create-resume/TemplateStep";
import { useCreateResumeDraft } from "@/components/page/create-resume/useCreateResumeDraft";
import { getMockTemplateById } from "@/shared/constants";
import { useCallback, useState } from "react";

type CreatePhase = "wizard" | "creating" | "error";

function CreateResumeWizard() {
  const { draft, setStep, setView } = useCreateResumeDraft();
  const [phase, setPhase] = useState<CreatePhase>("wizard");

  const selectedTemplate = getMockTemplateById(draft.templateId);
  const resumeName = draft.name.trim() || "Untitled resume";
  const templateName = selectedTemplate?.name ?? "Selected";
  const isBusy = phase === "creating";

  const handleCreateResume = useCallback(() => {
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

  const handleRetry = useCallback(() => {
    if (!draft.templateId) {
      return;
    }
    setPhase("creating");
  }, [draft.templateId]);

  const handleBackFromError = useCallback(() => {
    setPhase("wizard");
    setView("wizard");
    setStep(3);
  }, [setStep, setView]);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <CreateResumeHeader cancelDisabled={isBusy} />
      <CreateResumeStepper hasError={phase === "error"} />

      {phase === "creating" && selectedTemplate ? (
        <CreatingView
          resumeName={resumeName}
          templateName={templateName}
          template={selectedTemplate}
          onComplete={handleCreateComplete}
        />
      ) : phase === "error" ? (
        <CreatingErrorView onRetry={handleRetry} onBack={handleBackFromError} />
      ) : draft.view === "preview" ? (
        <TemplatePreviewView onCreateResume={handleCreateResume} />
      ) : draft.step === 1 ? (
        <MethodStep />
      ) : draft.step === 2 ? (
        <DetailsStep />
      ) : (
        <TemplateStep onCreateResume={handleCreateResume} />
      )}
    </div>
  );
}

export default function CreateResumePage() {
  return (
    <CreateResumeDraftProvider>
      <CreateResumeWizard />
    </CreateResumeDraftProvider>
  );
}
