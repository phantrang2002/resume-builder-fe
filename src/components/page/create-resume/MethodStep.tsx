import { ROUTER_PATH } from "@/shared/constants";
import CreateResumeFooter, { FooterButton } from "./CreateResumeFooter";
import { useCreateResumeDraft } from "./useCreateResumeDraft";
import type { CreateMethod } from "./createResumeTypes";
import TemplateThumb from "./TemplateThumb";
import {
  FileAddOutlined,
  FileTextOutlined,
  ImportOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { MOCK_TEMPLATES } from "@/shared/constants/mock-templates";
import { useNavigate } from "react-router-dom";

const METHODS: {
  id: CreateMethod;
  title: string;
  description: string;
  icon: typeof FileAddOutlined;
  recommended?: boolean;
  disabled?: boolean;
  badge?: string;
}[] = [
  {
    id: "scratch",
    title: "Start from scratch",
    description: "An empty resume with the nine standard sections. Best if you already know what you want to write.",
    icon: FileAddOutlined,
  },
  {
    id: "template",
    title: "Start from a template",
    description: "Pick one of our print-tested layouts and fill in your details. The preview updates as you type.",
    icon: FileTextOutlined,
    recommended: true,
  },
  {
    id: "import",
    title: "Import an existing resume",
    description: "Upload a PDF or DOCX and we pull out your sections automatically, then you review them.",
    icon: ImportOutlined,
    disabled: true,
    badge: "Coming soon",
  },
];

export default function MethodStep() {
  const navigate = useNavigate();
  const { draft, setMethod, setStep } = useCreateResumeDraft();
  const canContinue = draft.method === "scratch" || draft.method === "template";
  const teaserTemplates = MOCK_TEMPLATES.slice(0, 3);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-pageTitle">
              How do you want to start?
            </h1>
            <p className="mt-2 text-sm text-subtle">
            Whichever you pick, you can change the template later without losing a word of what you wrote.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {METHODS.map((method) => {
              const selected = draft.method === method.id;
              const Icon = method.icon;

              return (
                <button
                  key={method.id}
                  type="button"
                  disabled={method.disabled}
                  aria-pressed={selected}
                  onClick={() => {
                    if (!method.disabled) {
                      setMethod(method.id);
                    }
                  }}
                  className={[
                    "relative flex flex-col rounded-2xl border bg-white p-5 text-left transition-colors",
                    method.disabled
                      ? "cursor-not-allowed border-[#E5E3DE] opacity-70"
                      : selected
                        ? "border-primary shadow-[0_0_0_1px_theme(colors.primary)]"
                        : "border-[#E5E3DE] hover:border-primary/40",
                  ].join(" ")}
                >
                  {method.recommended ? (
                    <span className="absolute right-4 top-4 rounded-md bg-[#EEF3F9] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                      Recommended
                    </span>
                  ) : null}
                  {method.badge ? (
                    <span className="absolute right-4 top-4 rounded-md bg-[#EFEEEB] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-subtle">
                      {method.badge}
                    </span>
                  ) : null}

                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-lightBg text-primary">
                    <Icon className="text-lg" />
                  </span>
                  <span className="mt-4 text-base font-semibold text-pageTitle">{method.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-subtle">{method.description}</span>
                </button>
              );
            })}
          </div>

          {draft.method === "template" ? (
            <section className="mt-8 rounded-2xl border border-[#E5E3DE] bg-white p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-subtle">
                Templates you can pick from
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
                {teaserTemplates.map((template) => (
                  <div key={template.id} className="text-center">
                    <TemplateThumb template={template} className="mx-auto max-w-[120px]" />
                    <p className="mt-2 text-xs font-medium text-pageTitle">{template.name}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-subtle">
                All templates are ATS-friendly and easy to customize in the editor.
              </p>
            </section>
          ) : null}

          <div className="mt-6 flex items-start gap-2 rounded-xl border border-[#DCE7F5] bg-[#F3F7FC] px-4 py-3 text-sm text-[#3A4F6A]">
            <InfoCircleOutlined className="mt-0.5 shrink-0" />
            <p>
              Tip: Starting from a template is faster for most people. You can still rewrite every
              section after you create the resume.
            </p>
          </div>
        </div>
      </div>

      <CreateResumeFooter
        left={
          <FooterButton variant="ghost" onClick={() => navigate(ROUTER_PATH.DASHBOARD)}>
            Back
          </FooterButton>
        }
        center={<span>Step 1 of 3</span>}
        right={
          <FooterButton
            variant="primary"
            disabled={!canContinue}
            onClick={() => {
              if (canContinue) {
                setStep(2);
              }
            }}
          >
            Continue
          </FooterButton>
        }
      />
    </div>
  );
}
