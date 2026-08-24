import type { MockTemplate } from "@/shared/constants/mock-templates";
import {
  CheckCircleFilled,
  InfoCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import TemplateThumb from "./TemplateThumb";

export type CreatingViewProps = {
  resumeName: string;
  templateName: string;
  template: MockTemplate;
  onComplete: () => void;
};

const STAGE_MS = 650;

const SHORT_STATUS = [
  "Creating the record",
  "Adding sections",
  "Applying the template",
  "Opening the editor",
] as const;

export default function CreatingView({
  resumeName,
  templateName,
  template,
  onComplete,
}: CreatingViewProps) {
  const stages = useMemo(
    () => [
      "Creating the resume record",
      "Adding your nine sections",
      `Applying the ${templateName} template`,
      "Opening the editor",
    ],
    [templateName],
  );

  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timers: number[] = [];

    stages.forEach((_, index) => {
      if (index === 0) {
        return;
      }
      timers.push(
        window.setTimeout(() => {
          setActiveStage(index);
        }, STAGE_MS * index),
      );
    });

    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, STAGE_MS * stages.length),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onComplete, stages]);

  const progress = Math.round(((activeStage + 0.7) / stages.length) * 100);
  const shortStatus = SHORT_STATUS[activeStage] ?? SHORT_STATUS[0];

  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-auto px-4 py-10 sm:px-6 sm:py-14"
      role="status"
      aria-live="polite"
      aria-labelledby="creating-resume-title"
    >
      <div className="m-auto w-full max-w-[520px] rounded-xl border border-[#E5E3DE] bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-9">
        <div className="flex justify-center">
          <TemplateThumb
            template={template}
            className="!h-[88px] !w-[66px] rounded-[4px] shadow-sm"
          />
        </div>

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
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-3 text-xs">
            <span className="text-subtle">{shortStatus}</span>
            <span className="tabular-nums text-[#1F1D19]">{Math.min(progress, 100)}%</span>
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
