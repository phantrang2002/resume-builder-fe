import {
  getMockTemplateById,
  MOCK_TEMPLATES,
} from "@/shared/constants/mock-templates";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CreateResumeFooter, { FooterButton } from "./CreateResumeFooter";
import { useCreateResumeDraft } from "./useCreateResumeDraft";
import TemplateThumb from "./TemplateThumb";

type TemplatePreviewViewProps = {
  onCreateResume?: () => void;
};

export default function TemplatePreviewView({ onCreateResume }: TemplatePreviewViewProps) {
  const { draft, setTemplateId, setView } = useCreateResumeDraft();
  const template = getMockTemplateById(draft.templateId) ?? MOCK_TEMPLATES[0];
  const currentIndex = MOCK_TEMPLATES.findIndex((item) => item.id === template.id);

  const goToRelative = (delta: number) => {
    const nextIndex = (currentIndex + delta + MOCK_TEMPLATES.length) % MOCK_TEMPLATES.length;
    setTemplateId(MOCK_TEMPLATES[nextIndex].id);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-11 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <section className="flex flex-col items-center">
            <div className="w-full max-w-md">
              <TemplateThumb
                template={template}
                className="!h-auto !w-full aspect-[3/4] shadow-md"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous template"
                onClick={() => goToRelative(-1)}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-[#CFCCC5] bg-white text-pageTitle hover:bg-gray-50"
              >
                <LeftOutlined />
              </button>
              <span className="text-sm text-subtle">
                {currentIndex + 1} of {MOCK_TEMPLATES.length}
              </span>
              <button
                type="button"
                aria-label="Next template"
                onClick={() => goToRelative(1)}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-[#CFCCC5] bg-white text-pageTitle hover:bg-gray-50"
              >
                <RightOutlined />
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E5E3DE] bg-white p-6 sm:p-8">
            <h1 className="font-serif text-3xl font-semibold text-pageTitle">{template.name}</h1>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-lightBg px-2 py-0.5 text-xs font-medium text-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#524D44]">{template.description}</p>

            <div className="mt-6 space-y-5">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-subtle">
                  Recommended for
                </h2>
                <p className="mt-1 text-sm text-pageTitle">{template.recommendedFor}</p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-subtle">
                  At a glance
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-pageTitle">
                  {template.atAGlance.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-subtle">
                  Sections included
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {template.sections.map((section) => (
                    <span
                      key={section}
                      className="rounded-lg border border-[#E5E3DE] bg-lightBg px-2.5 py-1 text-xs font-medium text-pageTitle"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <FooterButton
                variant="primary"
                onClick={() => {
                  setTemplateId(template.id);
                  onCreateResume?.();
                }}
              >
                Use this template
              </FooterButton>
              <FooterButton variant="secondary" onClick={() => setView("wizard")}>
                Back to gallery
              </FooterButton>
            </div>
          </section>
        </div>
      </div>

      <CreateResumeFooter
        left={<FooterButton variant="ghost" onClick={() => setView("wizard")}>Back</FooterButton>}
        center={<span>Template preview</span>}
        right={
          <FooterButton
            variant="primary"
            onClick={() => {
              setTemplateId(template.id);
              onCreateResume?.();
            }}
          >
            Use this template
          </FooterButton>
        }
      />
    </div>
  );
}
