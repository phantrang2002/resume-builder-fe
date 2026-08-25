import CreateResumeHeader from "@/components/page/resume/new/CreateResumeHeader";
import CreateResumeStepper from "@/components/page/resume/new/CreateResumeStepper";
import CreatingErrorView from "@/components/page/resume/new/CreatingErrorView";
import CreatingView from "@/components/page/resume/new/CreatingView";
import DetailsStep from "@/components/page/resume/new/DetailsStep";
import MethodStep from "@/components/page/resume/new/MethodStep";
import TemplatePreviewView from "@/components/page/resume/new/TemplatePreviewView";
import TemplateStep from "@/components/page/resume/new/TemplateStep";
import {
  CreateResumeDraftProvider,
} from "@/hooks/resume/useCreateResumeDraft";
import useCreateResumeWizard from "@/hooks/resume/useCreateResumeWizard";

function CreateResumeWizard() {
  const {
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
  } = useCreateResumeWizard();

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <CreateResumeHeader cancelDisabled={isBusy} />
      <CreateResumeStepper hasError={phase === "error"} />

      {phase === "creating" ? (
        <CreatingView
          resumeName={resumeName}
          templateName={templateName}
          template={selectedTemplate}
          onComplete={handleCreateComplete}
        />
      ) : phase === "error" ? (
        <CreatingErrorView onRetry={retryCreate} onBack={backFromError} />
      ) : draft.view === "preview" ? (
        <TemplatePreviewView onCreateResume={startCreate} />
      ) : draft.step === 1 ? (
        <MethodStep />
      ) : draft.step === 2 ? (
        <DetailsStep />
      ) : (
        <TemplateStep onCreateResume={startCreate} />
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
