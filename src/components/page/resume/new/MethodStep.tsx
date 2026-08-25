import useCreateResumeDraft from "@/hooks/resume/useCreateResumeDraft";
import useResumeTemplates from "@/hooks/resume/useResumeTemplates";
import type { CreateMethod } from "@/shared/types";
import { ROUTER_PATH } from "@/shared/constants";
import { truncateText } from "@/shared/helpers";
import CreateResumeFooter, { FooterButton } from "./CreateResumeFooter";
import TemplateThumb from "./TemplateThumb";
import {
  CheckOutlined,
  ClockCircleOutlined,
  FileAddOutlined,
  FileTextOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const METHODS: {
  id: CreateMethod;
  title: string;
  description: string;
  icon: typeof FileAddOutlined;
  recommended?: boolean;
  disabled?: boolean;
  badge?: string;
  duration?: string;
}[] = [
  {
    id: "scratch",
    title: "Start from scratch",
    description:
      "An empty resume with the nine standard sections. Best if you already know what you want to write.",
    icon: FileAddOutlined,
    duration: "About 10 minutes",
  },
  {
    id: "template",
    title: "Start from a template",
    description:
      "Pick one of our print-tested layouts and fill in your details. The preview updates as you type.",
    icon: FileTextOutlined,
    recommended: true,
  },
  {
    id: "import",
    title: "Import an existing resume",
    description:
      "Upload a PDF or DOCX and we pull out your sections automatically, then you review them.",
    icon: ImportOutlined,
    disabled: true,
    badge: "Coming soon",
  },
];

export default function MethodStep() {
  const navigate = useNavigate();
  const { draft, setMethod, setStep } = useCreateResumeDraft();
  const { templates, isLoading } = useResumeTemplates();
  const canContinue = draft.method === "scratch" || draft.method === "template";
  const teaserTemplates = templates.slice(0, 3);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-11 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-pageTitle">
              How do you want to start?
            </h1>
            <p className="mt-2 text-base text-secondary">
              Whichever you pick, you can change the template later without losing a word of what
              you wrote.
            </p>
          </div>

          <div className="mt-8 grid w-full grid-cols-1 gap-4 md:grid-cols-3">
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
                    "relative flex flex-col rounded-xl border p-5 text-left transition-colors",
                    method.disabled
                      ? "cursor-not-allowed border-[#E5E3DE] bg-[#EFEEEB] opacity-70"
                      : selected
                        ? "border-primary bg-[#F2F5F9] shadow-[0_0_0_1px_theme(colors.primary)]"
                        : "border-[#E5E3DE] bg-white hover:border-primary/40",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={[
                        "inline-flex size-10 items-center justify-center rounded-md",
                        selected
                          ? "bg-white text-primary"
                          : "bg-[#EFEEEB] text-pageTitle",
                      ].join(" ")}
                    >
                      <Icon className="text-lg" />
                    </span>

                    <span
                      className={[
                        "inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                        selected
                          ? "bg-primary text-white"
                          : "border border-[#CFCCC5] bg-transparent",
                        method.disabled ? "opacity-50" : "",
                      ].join(" ")}
                      aria-hidden="true"
                    >
                      {selected ? <CheckOutlined className="text-[10px]" /> : null}
                    </span>
                  </div>

                  <span className="mt-4 text-base font-semibold text-pageTitle">{method.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-secondary  ">
                    {method.description}
                  </span>

                  {method.recommended ? (
                    <span className="mt-4 inline-flex w-fit rounded-md border border-primary/30 bg-[#EEF3F9] px-2 py-0.5 text-[11px] font-semibold text-primary">
                      Recommended
                    </span>
                  ) : null}

                  {method.badge ? (
                    <span className="mt-4 inline-flex w-fit rounded-md border border-[#E3E1DC] px-2 py-0.5 text-[11px] font-medium text-secondary">
                      {method.badge}
                    </span>
                  ) : null}

                  {method.duration ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-subtle">
                      <ClockCircleOutlined className="text-xs" />
                      {method.duration}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {draft.method === "template" ? (
            <section className="mx-auto mt-8 w-full max-w-4xl rounded-lg border border-[#E5E3DE] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-wide text-subtle">
                  Templates you can pick from
                </p>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#2F6E4E]">
                  <SafetyCertificateOutlined className="text-sm" />
                  All ATS-friendly
                </span>
              </div>
              {isLoading ? (
                <p className="mt-4 text-sm text-subtle">Loading templates…</p>
              ) : (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                  {teaserTemplates.map((template) => (
                    <div key={template.id} className="flex items-start gap-3">
                      <TemplateThumb
                        template={template}
                        className="!h-[70px] !w-[52px] shrink-0 rounded-[4px] shadow-sm"
                      />
                      <div className="min-w-0 pt-0.5">
                        <p className="text-sm font-semibold text-pageTitle">{template.name}</p>
                        <p className="mt-0.5 text-xs text-subtle">
                          {truncateText(template.description, 64)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : null}

          <div className="mx-auto mt-6 flex w-full max-w-4xl items-start gap-2 rounded-md border border-[#DCE7F5] bg-[#F3F7FC] px-4 py-3 text-sm text-[#3A4F6A]">
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
