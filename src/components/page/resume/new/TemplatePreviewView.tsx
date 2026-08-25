import {
  CheckOutlined,
  LeftOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { FooterButton } from "./CreateResumeFooter";
import TemplatePreviewImage from "./TemplatePreviewImage";
import useCreateResumeDraft from "@/hooks/resume/useCreateResumeDraft";
import { useGetTemplateByIdQuery } from "@/services/api";
import { parseTemplateId } from "@/shared/helpers";

type TemplatePreviewViewProps = {
  onCreateResume?: () => void;
};

const AT_A_GLANCE_LABELS: Record<string, string> = {
  layout: "Layout",
  paper: "Paper",
  typeface: "Typeface",
  bestLength: "Best length",
  photoSupported: "Photo",
};

export default function TemplatePreviewView({ onCreateResume }: TemplatePreviewViewProps) {
  const { draft, setTemplateId, setView } = useCreateResumeDraft();
  const templateId = parseTemplateId(draft.templateId);
  const { data, isLoading, isError } = useGetTemplateByIdQuery(templateId ?? 0, {
    skip: templateId == null,
  });

  const template = data?.data;

  if (templateId == null) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 py-8 text-sm text-subtle">
        <p>Select a template from the gallery first.</p>
        <button
          type="button"
          onClick={() => setView("wizard")}
          className="font-medium text-primary hover:underline"
        >
          Back to gallery
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 py-8 text-sm text-subtle">
        Loading template…
      </div>
    );
  }

  if (isError || !template) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 py-8 text-sm text-subtle">
        <p>Couldn’t load this template.</p>
        <button
          type="button"
          onClick={() => setView("wizard")}
          className="font-medium text-primary hover:underline"
        >
          Back to gallery
        </button>
      </div>
    );
  }

  const styleTags = template.tags.filter((tag) => tag.toLowerCase() !== "ats");
  const isAts = template.tags.some((tag) => tag.toLowerCase() === "ats");
  const sectionDetails = template.supportedSectionDetails?.length
    ? template.supportedSectionDetails
    : template.supportedSections.map((type) => ({ type, label: type }));
  const sectionHeading =
    sectionDetails.length >= 9
      ? "Supports all standard sections"
      : "Sections included";
  const gallery = template.gallery;
  const prevTemplate = gallery?.prev ?? null;
  const nextTemplate = gallery?.next ?? null;
  const atAGlanceEntries = template.atAGlance
    ? Object.entries(template.atAGlance).map(([key, value]) => ({
        label: AT_A_GLANCE_LABELS[key] ?? key,
        value: typeof value === "boolean" ? (value ? "Supported" : "Not supported") : String(value),
      }))
    : [];
  const paperLabel =
    template.pageFormats?.length > 0
      ? template.pageFormats.join(" · ")
      : template.atAGlance?.paper || "A4";

  return (
    <div className="min-h-0 flex-1 overflow-auto px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-[144px]">
        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={!prevTemplate}
              onClick={() => {
                if (prevTemplate) {
                  setTemplateId(String(prevTemplate.id));
                }
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#CFCCC5] bg-white px-3 text-sm text-pageTitle transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LeftOutlined className="text-[10px]" />
              <span>{prevTemplate?.name ?? "Previous"}</span>
            </button>
            <p className="text-sm text-subtle">
              Template {gallery?.index ?? 1} of {gallery?.total ?? 1}
            </p>
            <button
              type="button"
              disabled={!nextTemplate}
              onClick={() => {
                if (nextTemplate) {
                  setTemplateId(String(nextTemplate.id));
                }
              }}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#CFCCC5] bg-white px-3 text-sm text-pageTitle transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{nextTemplate?.name ?? "Next"}</span>
              <RightOutlined className="text-[10px]" />
            </button>
          </div>

          <TemplatePreviewImage template={template} />

          <p className="mt-4 text-center text-xs text-subtle">
            {paperLabel} · page 1 of 2 · sample preview content
          </p>
        </section>

        <section className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E5E3DE] bg-white lg:self-start">
          <div className="p-[22px]">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-pageTitle">
              {template.name}
            </h1>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {styleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[#EFEEEB] px-2 py-0.5 text-xs text-subtle"
                >
                  {tag}
                </span>
              ))}
              {isAts ? (
                <span className="inline-flex items-center gap-1 rounded-md border border-[#C9E6D4] bg-[#EAF6EF] px-2 py-0.5 text-xs font-medium text-[#2F6B4F]">
                  <SafetyCertificateOutlined className="text-[11px]" />
                  ATS-friendly
                </span>
              ) : null}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#524D44]">{template.description}</p>
          </div>

          <div className="border-t border-[#E5E3DE] p-[22px]">
            <div className="space-y-6">
              {template.recommendedFor?.length ? (
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle">
                    Recommended for
                  </h2>
                  <ul className="mt-2.5 space-y-2">
                    {template.recommendedFor.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-pageTitle">
                        <CheckOutlined className="mt-1 shrink-0 text-[11px] text-[#2F6B4F]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {atAGlanceEntries.length ? (
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle">
                    At a glance
                  </h2>
                  <dl className="mt-2.5 space-y-2">
                    {atAGlanceEntries.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-baseline justify-between gap-4 text-sm"
                      >
                        <dt className="text-subtle">{item.label}</dt>
                        <dd className="text-right font-medium text-pageTitle">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle">
                  {sectionHeading}
                </h2>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {sectionDetails.map((section) => (
                    <span
                      key={section.type}
                      className="rounded-md bg-[#EFEEEB] px-2.5 py-1 text-xs font-normal text-secondary"
                    >
                      {section.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#E5E3DE] p-[22px]">
            <FooterButton
              variant="primary"
              fullWidth
              onClick={() => {
                setTemplateId(String(template.id));
                onCreateResume?.();
              }}
            >
              Use this template
            </FooterButton>
            <button
              type="button"
              onClick={() => setView("wizard")}
              className="py-[7px] text-sm font-medium text-subtle transition-colors hover:text-pageTitle"
            >
              Back to gallery
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
