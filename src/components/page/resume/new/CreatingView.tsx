import type { ResumeTemplate } from "@/shared/types";
import useCreatingProgress from "@/hooks/resume/useCreatingProgress";
import {
  CheckCircleFilled,
  InfoCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import TemplateThumb from "./TemplateThumb";

export type CreatingViewProps = {
  resumeName: string;
  templateName: string;
  template?: ResumeTemplate;
  onComplete: () => void;
};

export default function CreatingView({
  resumeName,
  templateName,
  template,
  onComplete,
}: CreatingViewProps) {
  const { stages, activeStage, progress, shortStatus } = useCreatingProgress(
    templateName,
    onComplete,
  );

  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-auto px-4 py-10 sm:px-6 sm:py-14"
      role="status"
      aria-live="polite"
      aria-labelledby="creating-resume-title"
    >
      <div className="m-auto w-full max-w-[520px] rounded-xl border border-[#E5E3DE] bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-9">
        {template ? (
          <div className="flex justify-center">
            <TemplateThumb
              template={template}
              className="!h-[88px] !w-[66px] rounded-[4px] shadow-sm"
            />
          </div>
        ) : null}

        <h1
          id="creating-resume-title"
          className="mt-6 text-center font-serif text-[28px] font-semibold leading-tight tracking-tight text-pageTitle sm:text-[32px]"
        >
          Creating your resume…
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-secondary">
          Setting up &lsquo;{resumeName}&rsquo; with the {templateName} template.
        </p>

        <div className="mt-7">
          <div className="h-2.5 overflow-hidden rounded-full bg-[#EFEEEB]">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-xs">
            <span className="text-subtle">{shortStatus}</span>
            <span className="tabular-nums text-[#1F1D19]">{progress}%</span>
          </div>
        </div>

        <ul className="mt-5 space-y-3 rounded-md bg-lightBg px-4 py-4">
          {stages.map((label, index) => {
            const done = index < activeStage;
            const current = index === activeStage;

            return (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span className="inline-flex size-5 shrink-0 items-center justify-center text-[16px] leading-none">
                  {done ? (
                    <CheckCircleFilled className="text-[#2F6B4F]" />
                  ) : current ? (
                    <SyncOutlined className="text-primary" spin />
                  ) : (
                    <span
                      className="size-[14px] rounded-full border border-[#CFCCC5]"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span
                  className={
                    done
                      ? "text-subtle line-through"
                      : current
                        ? "font-medium text-pageTitle"
                        : "text-subtle"
                  }
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-subtle">
          <InfoCircleOutlined className="text-[12px]" />
          <span>This usually takes about two minutes.</span>
        </p>
      </div>
    </div>
  );
}
