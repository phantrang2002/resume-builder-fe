import {
  filterMockTemplates,
  getMockTemplateById,
  MOCK_TEMPLATES,
  TEMPLATE_FILTERS,
  type TemplateFilter,
} from "@/shared/constants/mock-templates";
import {
  CheckCircleFilled,
  EyeOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import SearchField from "@/components/common/SearchField";
import CreateResumeFooter, { FooterButton } from "./CreateResumeFooter";
import useCreateResumeDraft from "@/hooks/resume/useCreateResumeDraft";
import TemplateThumb from "./TemplateThumb";

type TemplateStepProps = {
  onCreateResume?: () => void;
};

export default function TemplateStep({ onCreateResume }: TemplateStepProps) {
  const { draft, setStep, setTemplateId, setView } = useCreateResumeDraft();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TemplateFilter>("All");

  const templates = useMemo(
    () => filterMockTemplates(MOCK_TEMPLATES, search, filter),
    [search, filter],
  );

  const selectedTemplate = getMockTemplateById(draft.templateId);
  const hasSelection = Boolean(selectedTemplate);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-11 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 max-w-xl">
              <h1 className="font-serif text-4xl font-semibold tracking-tight text-pageTitle">
                Choose a template
              </h1>
              <p className="mt-2 text-sm text-subtle">
                All eight render the same content. You can switch later without retyping anything.
              </p>
            </div>

            <SearchField
              id="template-search"
              label="Search templates"
              hideLabel
              value={search}
              onChange={setSearch}
              placeholder="Search templates"
              className="mt-1 w-full shrink-0 sm:w-56"
            />
          </div>

          <div className="mt-[18px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {TEMPLATE_FILTERS.map((item) => {
                const active = filter === item;
                const label = item === "All" ? `All ${MOCK_TEMPLATES.length}` : item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={[
                      "h-9 rounded-md px-3.5 text-sm transition-colors",
                      active
                        ? "bg-[#1F1D19] font-medium text-white"
                        : "border border-[#E5E3DE] bg-white text-pageTitle hover:border-[#CFCCC5]",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {selectedTemplate ? (
              <p className="inline-flex items-center gap-2 text-sm text-secondary">
                <CheckCircleFilled className="text-base text-[#2F6B4F]" />
                <span>{selectedTemplate.name} selected</span>
              </p>
            ) : null}
          </div>

          {templates.length === 0 ? (
            <p className="mt-12 text-center text-sm text-subtle">
              No templates match your search. Try a different filter.
            </p>
          ) : (
            <div className="mt-[18px] grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {templates.map((template) => {
                const selected = draft.templateId === template.id;
                const styleTags = template.tags.filter((tag) => tag !== "ATS");
                const isAts = template.tags.includes("ATS");

                return (
                  <article
                    key={template.id}
                    className={[
                      "group relative overflow-hidden rounded-lg border bg-white transition-shadow",
                      "hover:shadow-[0px_4px_12px_-2px_#1F1D1914,0px_1px_2px_0px_#1F1D190A]",
                      selected
                        ? "border-primary shadow-[0_0_0_1px_theme(colors.primary)]"
                        : "border-[#E5E3DE] shadow-sm hover:border-primary/35",
                    ].join(" ")}
                  >
                    {/* Preview stage */}
                    <div
                      className={[
                        "relative px-4 pb-4 pt-4",
                        selected ? "bg-[#EEF2F7]" : "bg-[#F4F3F0]",
                      ].join(" ")}
                    >
                      <div className="flex min-h-[148px] w-full items-center justify-center py-1">
                        <TemplateThumb template={template} />
                      </div>

                      {selected ? (
                        <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full border-2 border-white bg-white leading-none shadow-sm">
                          <CheckCircleFilled className="text-2xl text-primary" />
                        </span>
                      ) : null}

                      {/* Hover actions above the select layer */}
                      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-[#1a1a1a]/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          type="button"
                          className="pointer-events-auto inline-flex h-9 items-center gap-1.5 rounded-md border border-white/80 bg-white px-3 text-xs font-medium text-pageTitle hover:bg-gray-50"
                          onClick={() => {
                            setTemplateId(template.id);
                            setView("preview");
                          }}
                        >
                          <EyeOutlined />
                          Preview
                        </button>
                        <button
                          type="button"
                          className="pointer-events-auto inline-flex h-9 items-center rounded-md bg-primary px-3 text-xs font-medium text-white hover:bg-primary/90"
                          onClick={() => {
                            setTemplateId(template.id);
                            onCreateResume?.();
                          }}
                        >
                          Use this template
                        </button>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="relative px-4 pb-4 pt-3">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-[15px] font-semibold text-[#1F1D19]">{template.name}</h2>
                        {selected ? (
                          <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-medium text-white">
                            Selected
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm text-subtle">{template.summary}</p>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {styleTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-[#EFEEEB] px-1.5 py-0.5 text-[11px] font-medium text-subtle"
                            >
                              {tag}
                            </span>
                          ))}
                          {isAts ? (
                            <span className="inline-flex items-center gap-1 rounded-md border border-[#C9E6D4] bg-[#EAF6EF] px-1.5 py-0.5 text-[11px] font-medium text-[#2F6B4F]">
                              <SafetyCertificateOutlined className="text-[11px]" />
                              ATS
                            </span>
                          ) : null}
                        </div>

                        <button
                          type="button"
                          className="relative z-20 inline-flex shrink-0 items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                          onClick={() => {
                            setTemplateId(template.id);
                            setView("preview");
                          }}
                        >
                          Preview
                          <RightOutlined className="text-[9px]" />
                        </button>
                      </div>
                    </div>

                    {/* Full-card select hit target */}
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={`Select ${template.name} template`}
                      className="absolute inset-0 z-10 cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      onClick={() => setTemplateId(template.id)}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CreateResumeFooter
        left={
          <FooterButton variant="ghost" onClick={() => setStep(2)}>
            Back
          </FooterButton>
        }
        center={
          <span>
            Step 3 of 3 <span className="mx-1 text-[#CFCCC5]">·</span> You can change the template
            later
          </span>
        }
        right={
          <>
            <FooterButton
              variant="secondary"
              disabled={!hasSelection}
              onClick={() => {
                if (hasSelection) {
                  setView("preview");
                }
              }}
            >
              {selectedTemplate ? `Preview ${selectedTemplate.name}` : "Preview selected"}
            </FooterButton>
            <FooterButton
              variant="primary"
              disabled={!hasSelection}
              onClick={() => {
                if (hasSelection) {
                  onCreateResume?.();
                }
              }}
            >
              Create resume
            </FooterButton>
          </>
        }
      />
    </div>
  );
}
