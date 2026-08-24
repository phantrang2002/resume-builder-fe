import InputField from "@/components/common/InputField";
import { yupErrorsToRecord } from "@/shared/helpers";
import { createResumeDetailsSchema } from "@/shared/validations/create-resume.schema";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormEvent, useState } from "react";
import { EXPERIENCE_LEVEL_OPTIONS, INDUSTRY_OPTIONS } from "./createResumeOptions";
import CreateResumeFooter, { FooterButton } from "./CreateResumeFooter";
import { useCreateResumeDraft } from "./useCreateResumeDraft";
import type { ExperienceLevel } from "./createResumeTypes";

export default function DetailsStep() {
  const { draft, patchDetails, setStep } = useCreateResumeDraft();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) => {
    setFieldErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleContinue = (event?: FormEvent) => {
    event?.preventDefault();
    try {
      createResumeDetailsSchema.validateSync(
        {
          name: draft.name,
          targetJobTitle: draft.targetJobTitle,
          experienceLevel: draft.experienceLevel,
          industry: draft.industry,
        },
        { abortEarly: false },
      );
      setFieldErrors({});
      setStep(3);
    } catch (error) {
      setFieldErrors(yupErrorsToRecord(error as import("yup").ValidationError));
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-pageTitle">
              Tell us about this resume
            </h1>
            <p className="mt-2 text-sm text-subtle">
              A clear name and target role help tailor suggestions later.
            </p>
          </div>

          <form
            id="create-resume-details"
            onSubmit={handleContinue}
            className="mt-8 space-y-5 rounded-2xl border border-[#E5E3DE] bg-white p-6 sm:p-8"
          >
            <InputField
              id="resume-name"
              label="Resume name"
              value={draft.name}
              error={fieldErrors.name}
              placeholder="e.g. Product Manager — 2026"
              hint="Only you see this name in your dashboard."
              onChange={(value) => {
                clearError("name");
                patchDetails({ name: value });
              }}
            />

            <InputField
              id="target-job-title"
              label="Target job title"
              value={draft.targetJobTitle}
              error={fieldErrors.targetJobTitle}
              placeholder="e.g. Senior Product Manager"
              hint="We'll use this to suggest phrasing and section emphasis."
              onChange={(value) => {
                clearError("targetJobTitle");
                patchDetails({ targetJobTitle: value });
              }}
            />

            <fieldset>
              <legend className="mb-2 text-sm font-medium text-[#524D44]">
                Experience level <span className="font-normal text-subtle">(optional)</span>
              </legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {EXPERIENCE_LEVEL_OPTIONS.map((option) => {
                  const selected = draft.experienceLevel === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={selected}
                      onClick={() =>
                        patchDetails({
                          experienceLevel: selected ? null : (option.value as ExperienceLevel),
                        })
                      }
                      className={[
                        "h-10 rounded-lg border px-2 text-sm transition-colors",
                        selected
                          ? "border-primary bg-[#EEF3F9] font-semibold text-primary"
                          : "border-[#CFCCC5] bg-white text-pageTitle hover:border-primary/40",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="industry" className="mb-2 block text-sm font-medium text-[#524D44]">
                Industry <span className="font-normal text-subtle">(optional)</span>
              </label>
              <select
                id="industry"
                value={draft.industry ?? ""}
                onChange={(event) =>
                  patchDetails({ industry: event.target.value ? event.target.value : null })
                }
                className="h-10 w-full rounded-lg border border-[#CFCCC5] bg-white px-3 text-sm text-pageTitle outline-none focus:border-inputFocus focus:shadow-[0_0_0_1px_theme(colors.inputFocus)]"
              >
                <option value="">Select an industry</option>
                {INDUSTRY_OPTIONS.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="mt-6 flex items-start gap-2 rounded-xl border border-[#DCE7F5] bg-[#F3F7FC] px-4 py-3 text-sm text-[#3A4F6A]">
            <InfoCircleOutlined className="mt-0.5 shrink-0" />
            <p>
              You can edit these details anytime. They do not appear on the exported PDF unless you
              add them to a section.
            </p>
          </div>
        </div>
      </div>

      <CreateResumeFooter
        left={<FooterButton variant="ghost" onClick={() => setStep(1)}>Back</FooterButton>}
        center={<span>Step 2 of 3</span>}
        right={
          <FooterButton variant="primary" type="submit" onClick={() => handleContinue()}>
            Continue
          </FooterButton>
        }
      />
    </div>
  );
}
