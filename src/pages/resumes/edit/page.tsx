import ResumeEditorHeader from "@/components/page/resume/edit/ResumeEditorHeader";
import ResumeEditorPreviewPane from "@/components/page/resume/edit/ResumeEditorPreviewPane";
import ResumeEditorSectionContent from "@/components/page/resume/edit/ResumeEditorSectionContent";
import ResumeEditorSidebar from "@/components/page/resume/edit/ResumeEditorSidebar";
import useResumeEditor from "@/hooks/resume/useResumeEditor";
import { ROUTER_PATH } from "@/shared/constants";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";

export default function ResumeEditorPage() {
  const editor = useResumeEditor();

  if (editor.isLoading) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 bg-lightBg text-sm text-subtle">
        <Spin indicator={<LoadingOutlined spin />} />
        Loading resume…
      </div>
    );
  }

  if (editor.isError || !editor.resume) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-4 bg-lightBg px-6 text-center">
        <div>
          <h1 className="font-serif text-xl font-semibold text-pageTitle">Couldn&apos;t load this resume</h1>
          <p className="mt-2 text-sm text-subtle">
            It may have been deleted or you don&apos;t have access.
          </p>
        </div>
        <Link
          to={ROUTER_PATH.RESUMES}
          className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90"
        >
          Back to My resumes
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ResumeEditorHeader
        title={editor.title}
        onTitleChange={editor.setTitle}
        saveStatus={editor.saveStatus}
      />

      <div className="flex min-h-0 flex-1">
        <ResumeEditorSidebar
          sections={editor.sections}
          activeSectionId={editor.activeSectionId}
          completionPercent={editor.completionPercent}
          emptySectionCount={editor.emptySectionCount}
          onSectionSelect={editor.setActiveSectionId}
        />

        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-lightBg">
          <ResumeEditorSectionContent
            activeSectionId={editor.activeSectionId}
            workExperience={editor.workExperience}
            onCollapseAllWorkEntries={editor.collapseAllWorkEntries}
            onToggleWorkEntryExpanded={editor.toggleWorkEntryExpanded}
            onPatchWorkEntry={editor.patchWorkEntry}
            onUpdateHighlight={editor.updateHighlight}
            onRemoveHighlight={editor.removeHighlight}
            onAddHighlight={editor.addHighlight}
            onUpdateTechnologies={editor.updateTechnologies}
            onAddWorkEntry={editor.addWorkEntry}
          />
        </main>

        <ResumeEditorPreviewPane
          templateId={editor.templateId}
          templateName={editor.templateName}
        />
      </div>
    </div>
  );
}
