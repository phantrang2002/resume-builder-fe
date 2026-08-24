import {
  filterMockTemplates,
  MOCK_TEMPLATES,
  TEMPLATE_FILTERS,
  type TemplateFilter,
} from "@/shared/constants/mock-templates";
import { SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import CreateResumeFooter, { FooterButton } from "./CreateResumeFooter";
import { useCreateResumeDraft } from "./useCreateResumeDraft";
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

  const hasSelection = Boolean(draft.templateId);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-pageTitle">
              Choose a template
            </h1>
            <p className="mt-2 text-sm text-subtle">
              Pick a layout now — you can switch templates later without losing content.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full sm:max-w-sm">
              <span className="sr-only">Search templates</span>
              <SearchOutlined className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search templates"
                className="h-10 w-full rounded-lg border border-[#CFCCC5] bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-inputFocus focus:shadow-[0_0_0_1px_theme(colors.inputFocus)]"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {TEMPLATE_FILTERS.map((item) => {
                const selected = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={[
                      "h-9 rounded-lg px-3 text-sm transition-colors",
                      selected
                        ? "bg-primary font-medium text-white"
                        : "border border-[#CFCCC5] bg-white text-pageTitle hover:border-primary/40",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {templates.length === 0 ? (
            <p className="mt-12 text-center text-sm text-subtle">
              No templates match your search. Try a different filter.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {templates.map((template) => {
                const selected = draft.templateId === template.id;
                return (
                  <article
                    key={template.id}
                    className={[
                      "group relative rounded-2xl border bg-white p-4 transition-colors",
                      selected
                        ? "border-primary shadow-[0_0_0_1px_theme(colors.primary)]"
                        : "border-[#E5E3DE] hover:border-primary/40",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      className="w-full text-left"
                      onClick={() => setTemplateId(template.id)}
                    >
                      <TemplateThumb template={template} selected={selected} />
                      <div className="mt-4">
                        <h2 className="text-sm font-semibold text-pageTitle">{template.name}</h2>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {template.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-lightBg px-1.5 py-0.5 text-[11px] font-medium text-subtle"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>

                    <div className="mt-3 flex gap-2 sm:absolute sm:inset-x-4 sm:top-[42%] sm:mt-0 sm:-translate-y-1/2 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      <button
                        type="button"
                        className="h-9 flex-1 rounded-lg border border-gray-300 bg-white text-xs font-medium text-pageTitle hover:bg-gray-50"
                        onClick={() => {
                          setTemplateId(template.id);
                          setView("preview");
                        }}
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        className="h-9 flex-1 rounded-lg bg-primary text-xs font-medium text-white hover:bg-primary/90"
                        onClick={() => {
                          setTemplateId(template.id);
                          onCreateResume?.();
                        }}
                      >
                        Use this template
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CreateResumeFooter
        left={<FooterButton variant="ghost" onClick={() => setStep(2)}>Back</FooterButton>}
        center={<span>Step 3 of 3</span>}
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
              Preview selected
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
