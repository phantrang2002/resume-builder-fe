import { useEffect, useState } from "react";
import type { ResumeTemplateDetail } from "@/shared/types";
import { getTemplateThumbnailSrc } from "@/hooks/resume/useResumeTemplates";
import MockResumePreview from "./MockResumePreview";

type TemplatePreviewImageProps = {
  template: ResumeTemplateDetail;
  className?: string;
};

/** Large resume preview image from `thumbnailUrl`, with HTML mock fallback. */
export default function TemplatePreviewImage({
  template,
  className = "",
}: TemplatePreviewImageProps) {
  const src = getTemplateThumbnailSrc(template);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [template.id, src]);

  if (!src || imageFailed) {
    return <MockResumePreview template={template} className={className} />;
  }

  return (
    <div
      className={[
        "overflow-hidden rounded-sm border border-[#E5E3DE] bg-[#F4F3F0] shadow-[0_8px_24px_-8px_rgba(31,29,25,0.18)]",
        className,
      ].join(" ")}
    >
      <img
        src={src}
        alt={`${template.name} resume preview`}
        className="mx-auto block w-full max-h-[min(80vh,920px)] object-contain object-top"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
