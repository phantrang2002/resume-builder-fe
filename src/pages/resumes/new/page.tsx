import type { CreateResumeLocationState } from "@/components/page/create-resume/createResumeTypes";
import { CreateResumeDraftProvider } from "@/components/page/create-resume/CreateResumeDraftContext";
import CreateResumeHeader from "@/components/page/create-resume/CreateResumeHeader";
import CreateResumeStepper from "@/components/page/create-resume/CreateResumeStepper";
import CreatingOverlay from "@/components/page/create-resume/CreatingOverlay";
import DetailsStep from "@/components/page/create-resume/DetailsStep";
import MethodStep from "@/components/page/create-resume/MethodStep";
import TemplatePreviewView from "@/components/page/create-resume/TemplatePreviewView";
import TemplateStep from "@/components/page/create-resume/TemplateStep";
import { useCreateResumeDraft } from "@/components/page/create-resume/useCreateResumeDraft";
import { getMockTemplateById, resumeEditPath } from "@/shared/constants";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateResumeWizard() {
  const navigate = useNavigate();
  const { draft } = useCreateResumeDraft();
  const [isCreating, setIsCreating] = useState(false);

  const selectedTemplate = getMockTemplateById(draft.templateId);
  const resumeName = draft.name.trim() || "Untitled resume";
  const templateName = selectedTemplate?.name ?? "Selected";

  const handleCreateResume = useCallback(() => {
    if (isCreating || !draft.templateId) {
      return;
    }
    setIsCreating(true);
  }, [draft.templateId, isCreating]);

  const handleCreateComplete = useCallback(() => {
    const id = crypto.randomUUID();
    const state: CreateResumeLocationState = {
      draftSnapshot: draft,
      templateName,
    };
    navigate(resumeEditPath(id), { state });
  }, [draft, navigate, templateName]);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <CreateResumeHeader cancelDisabled={isCreating} />
      {draft.view === "wizard" ? <CreateResumeStepper /> : null}

      {draft.view === "preview" ? (
        <TemplatePreviewView onCreateResume={handleCreateResume} />
      ) : draft.step === 1 ? (
        <MethodStep />
      ) : draft.step === 2 ? (
        <DetailsStep />
      ) : (
        <TemplateStep onCreateResume={handleCreateResume} />
      )}

      {isCreating ? (
        <CreatingOverlay
          resumeName={resumeName}
          templateName={templateName}
          onComplete={handleCreateComplete}
        />
      ) : null}
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
