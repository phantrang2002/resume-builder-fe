import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FooterButton } from "./CreateResumeFooter";

const TIPS = [
  "Try again — most of these clear on the second attempt",
  "Check your connection, then retry",
  "If it keeps failing, pick a different template",
] as const;

export type CreatingErrorViewProps = {
  onRetry: () => void;
  onBack: () => void;
};

export default function CreatingErrorView({ onRetry, onBack }: CreatingErrorViewProps) {
  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-auto px-4 py-10 sm:px-6 sm:py-14"
      role="alert"
      aria-labelledby="resume-create-error-title"
    >
      <div className="m-auto w-full max-w-[520px] rounded-xl border border-[#F0D4D4] bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-9">
        <div className="flex justify-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-errorBg">
            <ExclamationCircleOutlined className="text-xl text-error" aria-hidden />
          </span>
        </div>

        <h1
          id="resume-create-error-title"
          className="mt-5 text-center font-serif text-[28px] font-semibold leading-tight tracking-tight text-pageTitle sm:text-[32px]"
        >
          Something went wrong
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-secondary">
          We couldn&apos;t create your resume. Nothing was saved, so you can try again without losing
          what you entered.
        </p>

        <div className="mt-6 rounded-lg bg-lightBg px-4 py-4">
          <p className="text-[13px] font-medium text-[#1F1D19]">What you can try</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[13px] text-secondary">
            {TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <FooterButton variant="primary" fullWidth className="sm:flex-1" onClick={onRetry}>
            Try again
          </FooterButton>
          <FooterButton variant="secondary" className="w-full sm:flex-1" onClick={onBack}>
            Back
          </FooterButton>
        </div>

        <p className="mt-6 text-center font-mono text-[11px] tracking-tight text-subtle">
          RESUME_CREATE_FAILED · req 01J9C2K7Q · 24 Aug 09:12
        </p>
      </div>
    </div>
  );
}
