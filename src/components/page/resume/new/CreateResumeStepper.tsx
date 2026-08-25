import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import useCreateResumeDraft from "@/hooks/resume/useCreateResumeDraft";
import type { WizardStep } from "@/shared/types";

const STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: "Method" },
  { step: 2, label: "Details" },
  { step: 3, label: "Template" },
];

type CreateResumeStepperProps = {
  /** Temporary: mark Template step as failed after create error */
  hasError?: boolean;
};

export default function CreateResumeStepper({ hasError = false }: CreateResumeStepperProps) {
  const { draft } = useCreateResumeDraft();

  return (
    <div className="flex shrink-0 justify-center border-b border-[#E5E3DE] bg-white px-4 py-5 sm:px-6">
      <ol className="flex items-center gap-2 sm:gap-4">
        {STEPS.map(({ step, label }, index) => {
          const isError = hasError && step === 3;
          const isComplete = !isError && draft.step > step;
          const isCurrent = !isError && draft.step === step;

          return (
            <li key={label} className="flex items-center gap-2 sm:gap-4">
              {index > 0 && (
                <span
                  className={[
                    "h-px w-6 sm:w-10",
                    isError
                      ? "bg-error"
                      : draft.step >= step
                        ? "bg-primary"
                        : "bg-[#CFCCC5]",
                  ].join(" ")}
                  aria-hidden="true"
                />
              )}
              <span className="inline-flex items-center gap-2 text-sm">
                <span
                  className={[
                    "inline-flex size-7 items-center justify-center rounded-full text-xs font-normal",
                    isError
                      ? "bg-error text-white"
                      : isComplete
                        ? "bg-[#2F6E4E] text-white"
                        : isCurrent
                          ? "bg-primary text-white"
                          : "bg-transparent border border-[#CFCCC5] text-subtle",
                  ].join(" ")}
                  aria-current={isCurrent || isError ? "step" : undefined}
                >
                  {isError ? (
                    <CloseOutlined className="text-[10px]" />
                  ) : isComplete ? (
                    <CheckOutlined className="text-[10px]" />
                  ) : (
                    step
                  )}
                </span>
                <span
                  className={[
                    "hidden font-normal sm:inline",
                    isError || isComplete || isCurrent ? "text-secondary" : "text-subtle",
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
