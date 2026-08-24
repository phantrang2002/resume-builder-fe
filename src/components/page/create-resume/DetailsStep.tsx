import InputField from "@/components/common/InputField";
import SelectField from "@/components/common/SelectField";
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
      <div className="min-h-0 flex-1 overflow-auto px-4 py-11 sm:px-6">
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-pageTitle">
              Name this resume
            </h1>
            <p className="mt-2 text-base text-secondary">
            Two fields now, the rest in the editor. The name is only for you — it never appears on the PDF.
            </p>
          </div>

          <form
            id="create-resume-details"
            onSubmit={handleContinue}
            className="mt-8 space-y-5 rounded-xl border border-[#E5E3DE] bg-white p-6 sm:p-8"
          >
            <InputField
              id="resume-name"
              label="Resume name"
              value={draft.name}
              error={fieldErrors.name}
              placeholder="e.g. Product Manager — 2026"
              hint="Only you see this. Something like “Backend Engineer — Grab” works well."
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
              hint="Used later to match your resume against a job posting."
              onChange={(value) => {
                clearError("targetJobTitle");
                patchDetails({ targetJobTitle: value });
              }}
            />

            <fieldset>
              <legend className="mb-2 w-full">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#524D44]">Experience level</span>
                  <span className="text-xs font-normal text-inputMuted">Optional</span>
                </div>
              </legend>
              <div className="flex rounded-xl bg-[#EFEEEB] p-1">
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
                        "h-9 flex-1 rounded-lg px-2 text-sm transition-colors",
                        selected
                          ? "bg-white font-medium text-pageTitle shadow-sm"
                          : "text-subtle hover:text-pageTitle",
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <SelectField
              id="industry"
              label="Industry"
              value={draft.industry ?? ""}
              placeholder="Select an industry"
              options={INDUSTRY_OPTIONS.map((industry) => ({
                value: industry,
                label: industry,
              }))}
              labelExtra={<span className="text-xs font-normal text-inputMuted">Optional</span>}
              onChange={(value) => patchDetails({ industry: value ? value : null })}
            />
          </form>

          <div className="mt-6 flex items-start gap-2 rounded-lg border border-[#DCE7F5] bg-[#F3F7FC] px-4 py-3 text-sm text-[#3A4F6A]">
            <InfoCircleOutlined className="mt-0.5 shrink-0" />
            <p>You can rename the resume any time from the editor topbar.</p>
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
