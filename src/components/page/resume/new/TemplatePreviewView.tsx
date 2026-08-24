import {
  getMockTemplateById,
  MOCK_TEMPLATES,
} from "@/shared/constants/mock-templates";
import { CheckOutlined, LeftOutlined, RightOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { FooterButton } from "./CreateResumeFooter";
import MockResumePreview from "./MockResumePreview";
import useCreateResumeDraft from "@/hooks/resume/useCreateResumeDraft";

type TemplatePreviewViewProps = {
  onCreateResume?: () => void;
};

export default function TemplatePreviewView({ onCreateResume }: TemplatePreviewViewProps) {
  const { draft, setTemplateId, setView } = useCreateResumeDraft();
  const template = getMockTemplateById(draft.templateId) ?? MOCK_TEMPLATES[0];
  const currentIndex = MOCK_TEMPLATES.findIndex((item) => item.id === template.id);
  const prevTemplate =
    MOCK_TEMPLATES[(currentIndex - 1 + MOCK_TEMPLATES.length) % MOCK_TEMPLATES.length];
  const nextTemplate = MOCK_TEMPLATES[(currentIndex + 1) % MOCK_TEMPLATES.length];

  const goToRelative = (delta: number) => {
    const nextIndex = (currentIndex + delta + MOCK_TEMPLATES.length) % MOCK_TEMPLATES.length;
    setTemplateId(MOCK_TEMPLATES[nextIndex].id);
  };

  const styleTags = template.tags.filter((tag) => tag !== "ATS");
  const isAts = template.tags.includes("ATS");
  const sectionHeading =
    template.sections.length === 9
      ? "Supports all nine sections"
      : "Sections included";

  return (
    <div className="min-h-0 flex-1 overflow-auto px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-[144px]">
        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToRelative(-1)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#CFCCC5] bg-white px-3 text-sm text-pageTitle transition-colors hover:bg-gray-50"
            >
              <LeftOutlined className="text-[10px]" />
              <span>{prevTemplate.name}</span>
            </button>
            <p className="text-sm text-subtle">
              Template {currentIndex + 1} of {MOCK_TEMPLATES.length}
            </p>
            <button
              type="button"
              onClick={() => goToRelative(1)}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#CFCCC5] bg-white px-3 text-sm text-pageTitle transition-colors hover:bg-gray-50"
            >
              <span>{nextTemplate.name}</span>
              <RightOutlined className="text-[10px]" />
            </button>
          </div>

          <MockResumePreview template={template} />

          <p className="mt-4 text-center text-xs text-subtle">
            A4 · page 1 of 2 · rendered from your actual content
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

              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle">
                  At a glance
                </h2>
                <dl className="mt-2.5 space-y-2">
                  {template.atAGlance.map((item) => (
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

              <div>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-subtle">
                  {sectionHeading}
                </h2>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {template.sections.map((section) => (
                    <span
                      key={section}
                      className="rounded-md bg-[#EFEEEB] px-2.5 py-1 text-xs font-normal text-secondary"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#E5E3DE] p-[22px]">
            <FooterButton
              variant="primary"
              className="w-full"
              onClick={() => {
                setTemplateId(template.id);
                onCreateResume?.();
              }}
            >
              Use this template
            </FooterButton>
            <button
              type="button"
              onClick={() => setView("wizard")}
              className="text-sm font-medium text-subtle transition-colors hover:text-pageTitle"
            >
              Back to gallery
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
