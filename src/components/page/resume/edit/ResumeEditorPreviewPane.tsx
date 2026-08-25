import MockResumePreview from "@/components/page/resume/new/MockResumePreview";
import { useGetTemplateByIdQuery } from "@/services/api";
import { parseTemplateId } from "@/shared/helpers";
import {
  ExportOutlined,
  LeftOutlined,
  MinusOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import { useState } from "react";

type ResumeEditorPreviewPaneProps = {
  templateId: string | null;
  templateName: string;
};

export default function ResumeEditorPreviewPane({
  templateId,
  templateName,
}: ResumeEditorPreviewPaneProps) {
  const [zoom, setZoom] = useState(70);
  const [page, setPage] = useState(1);
  const totalPages = 2;

  const numericTemplateId = parseTemplateId(templateId);
  const { data, isLoading, isError } = useGetTemplateByIdQuery(numericTemplateId ?? 0, {
    skip: numericTemplateId == null,
  });
  const template = data?.data;

  const zoomIn = () => setZoom((value) => Math.min(value + 10, 150));
  const zoomOut = () => setZoom((value) => Math.max(value - 10, 40));

  return (
    <aside className="hidden w-[340px] shrink-0 flex-col border-l border-[#E5E3DE] bg-[#EFEEEB] xl:flex xl:w-[380px]">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#E5E3DE] bg-white px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <span className="truncate font-medium text-pageTitle">{templateName}</span>
          <button
            type="button"
            className="shrink-0 text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            Change
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={zoomOut}
            className="inline-flex size-7 items-center justify-center rounded text-subtle hover:bg-gray-50"
          >
            <MinusOutlined className="text-xs" />
          </button>
          <span className="min-w-[40px] text-center text-xs text-secondary">{zoom}%</span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={zoomIn}
            className="inline-flex size-7 items-center justify-center rounded text-subtle hover:bg-gray-50"
          >
            <PlusOutlined className="text-xs" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="inline-flex size-7 items-center justify-center rounded text-subtle hover:bg-gray-50 disabled:opacity-40"
          >
            <LeftOutlined className="text-xs" />
          </button>
          <span className="text-xs text-secondary">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="inline-flex size-7 items-center justify-center rounded text-subtle hover:bg-gray-50 disabled:opacity-40"
          >
            <RightOutlined className="text-xs" />
          </button>
          <button
            type="button"
            aria-label="Open preview in new window"
            className="inline-flex size-7 items-center justify-center rounded text-subtle hover:bg-gray-50"
          >
            <ExportOutlined className="text-xs" />
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-5">
        <div
          className="w-full max-w-[280px] origin-top transition-transform"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {isLoading ? (
            <div className="flex h-[360px] items-center justify-center rounded-sm border border-[#E5E3DE] bg-white">
              <Spin />
            </div>
          ) : isError || !template ? (
            <div className="flex h-[360px] items-center justify-center rounded-sm border border-[#E5E3DE] bg-white px-4 text-center text-xs text-subtle">
              Preview unavailable
            </div>
          ) : (
            <MockResumePreview template={template} />
          )}
        </div>
      </div>

      <p className="shrink-0 border-t border-[#E5E3DE] bg-white px-4 py-2 text-center text-[11px] text-subtle">
        Page {page} of {totalPages} · A4 · fits within margins
      </p>
    </aside>
  );
}
