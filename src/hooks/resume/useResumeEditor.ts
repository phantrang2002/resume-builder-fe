import { useGetResumeByIdQuery } from "@/services/api";
import useResumeTemplates from "@/hooks/resume/useResumeTemplates";
import {
  buildEditorSections,
  EDITOR_SECTION_DEFINITIONS,
  estimateEmptySectionCount,
} from "@/shared/constants/resumeEditor";
import type { EditorSectionId, WorkExperienceEntry } from "@/shared/types/resumeEditor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function parseResumeId(value: string | undefined): number | null {
  if (!value) {
    return null;
  }
  const id = Number(value);
  if (!Number.isFinite(id) || id <= 0) {
    return null;
  }
  return id;
}

export default function useResumeEditor() {
  const { id: routeId } = useParams<{ id: string }>();
  const resumeId = parseResumeId(routeId);
  const { templates } = useResumeTemplates();

  const {
    data: resumeResponse,
    isLoading,
    isError,
    isFetching,
  } = useGetResumeByIdQuery(resumeId ?? 0, {
    skip: resumeId == null,
  });

  const resume = resumeResponse?.data;

  const [title, setTitle] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<EditorSectionId>("work_experience");
  const [workExperience, setWorkExperience] = useState<WorkExperienceEntry[]>([]);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");

  useEffect(() => {
    if (!resume) {
      return;
    }
    setTitle(resume.title);
  }, [resume]);

  const templateName = resume?.templateName ?? "Modern";
  const templateId = useMemo(() => {
    if (!resume?.templateKey) {
      return null;
    }
    const match = templates.find((template) => template.key === resume.templateKey);
    return match ? String(match.id) : null;
  }, [resume?.templateKey, templates]);

  const completionPercent = resume?.completionRatio ?? 0;
  const sectionCount = resume?.sectionCount ?? EDITOR_SECTION_DEFINITIONS.length;
  const emptySectionCount = estimateEmptySectionCount(completionPercent, sectionCount);

  const sections = useMemo(
    () =>
      buildEditorSections({
        completionRatio: completionPercent,
        sectionCount,
        workExperienceCount: workExperience.length,
      }),
    [completionPercent, sectionCount, workExperience.length],
  );

  const patchWorkEntry = useCallback((id: string, patch: Partial<WorkExperienceEntry>) => {
    setSaveStatus("saving");
    setWorkExperience((entries) =>
      entries.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)),
    );
    setSaveStatus("saved");
  }, []);

  const toggleWorkEntryExpanded = useCallback((id: string) => {
    setWorkExperience((entries) =>
      entries.map((entry) =>
        entry.id === id ? { ...entry, expanded: !entry.expanded } : entry,
      ),
    );
  }, []);

  const collapseAllWorkEntries = useCallback(() => {
    setWorkExperience((entries) => entries.map((entry) => ({ ...entry, expanded: false })));
  }, []);

  const updateHighlight = useCallback((entryId: string, index: number, value: string) => {
    setWorkExperience((entries) =>
      entries.map((entry) => {
        if (entry.id !== entryId) {
          return entry;
        }
        const highlights = [...entry.highlights];
        highlights[index] = value;
        return { ...entry, highlights };
      }),
    );
  }, []);

  const removeHighlight = useCallback((entryId: string, index: number) => {
    setWorkExperience((entries) =>
      entries.map((entry) => {
        if (entry.id !== entryId) {
          return entry;
        }
        return {
          ...entry,
          highlights: entry.highlights.filter((_, i) => i !== index),
        };
      }),
    );
  }, []);

  const addHighlight = useCallback((entryId: string) => {
    setWorkExperience((entries) =>
      entries.map((entry) => {
        if (entry.id !== entryId) {
          return entry;
        }
        return { ...entry, highlights: [...entry.highlights, ""] };
      }),
    );
  }, []);

  const updateTechnologies = useCallback((entryId: string, technologies: string[]) => {
    patchWorkEntry(entryId, { technologies });
  }, [patchWorkEntry]);

  const addWorkEntry = useCallback(() => {
    const id = `we-${crypto.randomUUID()}`;
    setWorkExperience((entries) => [
      { ...createEmptyWorkEntry(id), expanded: true },
      ...entries.map((entry) => ({ ...entry, expanded: false })),
    ]);
  }, []);

  return {
    resumeId,
    resume,
    isLoading,
    isError,
    isFetching,
    title,
    setTitle,
    activeSectionId,
    setActiveSectionId,
    workExperience,
    patchWorkEntry,
    toggleWorkEntryExpanded,
    collapseAllWorkEntries,
    updateHighlight,
    removeHighlight,
    addHighlight,
    updateTechnologies,
    addWorkEntry,
    saveStatus,
    templateId,
    templateName,
    sections,
    completionPercent,
    emptySectionCount,
  };
}

function createEmptyWorkEntry(id: string): WorkExperienceEntry {
  return {
    id,
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    highlights: [],
    technologies: [],
    expanded: true,
  };
}
