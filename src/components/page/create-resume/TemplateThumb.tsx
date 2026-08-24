import type { MockTemplate } from "@/shared/constants/mock-templates";

type TemplateThumbProps = {
  template: MockTemplate;
  className?: string;
  selected?: boolean;
  imageSrc?: string;
};

export default function TemplateThumb({
  template,
  className = "",
  selected = false,
  imageSrc,
}: TemplateThumbProps) {
  const src = imageSrc ?? template.thumbnail;

  return (
    <div
      className={[
        "aspect-[3/4] w-full overflow-hidden rounded-md border bg-white",
        selected ? "border-primary ring-1 ring-primary" : "border-[#E5E3DE]",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover object-top" />
      ) : (
        <>
          <div className="h-3 w-full" style={{ backgroundColor: template.accent }} />
          <div className="space-y-2 p-3">
            <div className="h-2 w-2/3 rounded bg-[#D9D6CF]" />
            <div className="h-1.5 w-1/2 rounded bg-[#E8E5DE]" />
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded bg-[#EFEEEB]" />
              <div className="h-1.5 w-[90%] rounded bg-[#EFEEEB]" />
              <div className="h-1.5 w-[80%] rounded bg-[#EFEEEB]" />
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded bg-[#EFEEEB]" />
              <div className="h-1.5 w-[85%] rounded bg-[#EFEEEB]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
