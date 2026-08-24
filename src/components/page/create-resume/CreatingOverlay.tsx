import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";

export type CreatingOverlayProps = {
  resumeName: string;
  templateName: string;
  onComplete: () => void;
};

const STAGE_MS = 650;

export default function CreatingOverlay({
  resumeName,
  templateName,
  onComplete,
}: CreatingOverlayProps) {
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

  const progress = ((activeStage + 1) / stages.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/45 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="creating-resume-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#E5E3DE] bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#EEF3F9] text-primary">
            <LoadingOutlined className="text-lg" spin />
          </span>
          <div>
            <h2 id="creating-resume-title" className="text-lg font-semibold text-pageTitle">
              Creating your resume…
            </h2>
            <p className="mt-0.5 text-sm text-subtle">
              {resumeName} · {templateName}
            </p>
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#EFEEEB]">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <ul className="mt-5 space-y-3">
          {stages.map((label, index) => {
            const done = index < activeStage;
            const current = index === activeStage;
            return (
              <li key={label} className="flex items-center gap-3 text-sm">
                <span
                  className={[
                    "inline-flex size-6 items-center justify-center rounded-full text-[11px]",
                    done || current
                      ? "bg-primary text-white"
                      : "bg-[#EFEEEB] text-subtle",
                  ].join(" ")}
                >
                  {done ? <CheckOutlined /> : index + 1}
                </span>
                <span
                  className={
                    done || current ? "font-medium text-pageTitle" : "text-subtle"
                  }
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-center text-xs text-subtle">
          This usually takes two or three seconds.
        </p>
      </div>
    </div>
  );
}
