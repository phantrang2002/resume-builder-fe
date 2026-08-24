import { CheckOutlined } from "@ant-design/icons";
import { useCreateResumeDraft } from "./useCreateResumeDraft";
import type { WizardStep } from "./createResumeTypes";

const STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: "Method" },
  { step: 2, label: "Details" },
  { step: 3, label: "Template" },
];

export default function CreateResumeStepper() {
  const { draft } = useCreateResumeDraft();

  return (
    <div className="flex shrink-0 justify-center border-b border-[#E5E3DE] bg-white px-4 py-5 sm:px-6">
      <ol className="flex items-center gap-2 sm:gap-4">
        {STEPS.map(({ step, label }, index) => {
          const isComplete = draft.step > step;
          const isCurrent = draft.step === step;

          return (
            <li key={label} className="flex items-center gap-2 sm:gap-4">
              {index > 0 && (
                <span
                  className={[
                    "h-px w-6 sm:w-10",
                    draft.step >= step ? "bg-primary" : "bg-[#CFCCC5]",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
              <span className="inline-flex items-center gap-2 text-sm">
                <span
                  className={[
                    "inline-flex size-7 items-center justify-center rounded-full text-xs font-normal",
                    isComplete
                      ? "bg-[#2F6E4E] text-white"
                      : isCurrent
                        ? "bg-primary text-white"
                        : "bg-transparent border border-[#CFCCC5] text-subtle",
                  ].join(" ")}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isComplete ? <CheckOutlined className="text-[10px]" /> : step}
                </span>
                <span
                  className={[
                    "hidden font-normal sm:inline",
                    isComplete || isCurrent ? "text-secondary" : "text-subtle",
                  ].join(" ")}
                >
                  {label}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
