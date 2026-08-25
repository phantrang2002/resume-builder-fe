import { EXPERIENCE_LEVEL_API_MAP, resumeEditPath } from "@/shared/constants";
import type { CreatePhase, CreateResumeParams, ResumeTemplate } from "@/shared/types";
import { parseTemplateId } from "@/shared/helpers";
import { useCreateResumeMutation } from "@/services/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateResumeDraft from "./useCreateResumeDraft";
import useResumeTemplates from "./useResumeTemplates";

function buildCreateResumeBody(draft: {
  name: string;
  targetJobTitle: string;
  templateId: string | null;
  experienceLevel: keyof typeof EXPERIENCE_LEVEL_API_MAP | null;
  industryId: string | null;
}): CreateResumeParams | null {
  const templateId = parseTemplateId(draft.templateId);
  if (templateId == null) {
    return null;
  }

  const body: CreateResumeParams = {
    title: draft.name.trim() || "Untitled resume",
    targetJobTitle: draft.targetJobTitle.trim(),
    templateId,
  };

  if (draft.experienceLevel) {
    body.experienceLevel = EXPERIENCE_LEVEL_API_MAP[draft.experienceLevel];
  }

  if (draft.industryId) {
    const industryId = Number(draft.industryId);
    if (Number.isFinite(industryId) && industryId > 0) {
      body.industryId = industryId;
    }
  }

  return body;
}

export default function useCreateResumeWizard() {
  const navigate = useNavigate();
  const { draft, setStep, setView } = useCreateResumeDraft();
  const { getTemplateById } = useResumeTemplates();
  const [createResume] = useCreateResumeMutation();
  const [phase, setPhase] = useState<CreatePhase>("wizard");
  const [createdResumeId, setCreatedResumeId] = useState<number | null>(null);
  const [progressDone, setProgressDone] = useState(false);
  const requestSeq = useRef(0);

  const selectedTemplate: ResumeTemplate | undefined = getTemplateById(draft.templateId);
  const resumeName = draft.name.trim() || "Untitled resume";
  const templateName = selectedTemplate?.name ?? "Selected";
  const isBusy = phase === "creating";

  const startCreate = useCallback(async () => {
    if (phase === "creating") {
      return;
    }

    const body = buildCreateResumeBody(draft);
    if (!body) {
      return;
    }

    const seq = ++requestSeq.current;
    setCreatedResumeId(null);
    setProgressDone(false);
    setStep(3);
    setView("wizard");
    setPhase("creating");

    try {
      const envelope = await createResume(body).unwrap();
      if (seq !== requestSeq.current) {
        return;
      }
      const id = envelope.data?.id;
      if (id == null) {
        setPhase("error");
        return;
      }
      setCreatedResumeId(id);
    } catch {
      if (seq !== requestSeq.current) {
        return;
      }
      setPhase("error");
    }
  }, [createResume, draft, phase, setStep, setView]);

  const handleCreateComplete = useCallback(() => {
    setProgressDone(true);
  }, []);

  useEffect(() => {
    if (phase !== "creating" || !progressDone || createdResumeId == null) {
      return;
    }

    navigate(resumeEditPath(String(createdResumeId)), {
      replace: true,
    });
  }, [createdResumeId, navigate, phase, progressDone]);

  const retryCreate = useCallback(() => {
    void startCreate();
  }, [startCreate]);

  const backFromError = useCallback(() => {
    requestSeq.current += 1;
    setCreatedResumeId(null);
    setProgressDone(false);
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
