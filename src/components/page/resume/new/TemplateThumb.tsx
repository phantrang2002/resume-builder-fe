import type { MockTemplate } from "@/shared/constants/mock-templates";

type TemplateThumbProps = {
  template: MockTemplate;
  className?: string;
  imageSrc?: string;
};

/** Mini resume thumbnail — default 218×124, 1px border. */
export default function TemplateThumb({
  template,
  className = "",
  imageSrc,
}: TemplateThumbProps) {
  const src = imageSrc ?? template.thumbnail;

  return (
    <div
      className={[
        "h-[124px] w-[218px] overflow-hidden rounded-sm border border-[#E5E3DE] bg-white opacity-100",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover object-top" />
      ) : (
        <>
          <div className="h-2.5 w-full" style={{ backgroundColor: template.accent }} />
          <div className="space-y-1.5 p-2">
            <div className="h-1.5 w-2/3 rounded bg-[#D9D6CF]" />
            <div className="h-1 w-1/2 rounded bg-[#E8E5DE]" />
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full rounded bg-[#EFEEEB]" />
              <div className="h-1 w-[90%] rounded bg-[#EFEEEB]" />
              <div className="h-1 w-[80%] rounded bg-[#EFEEEB]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
