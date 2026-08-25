import type {
  CertificationsPreviewData,
  EducationPreviewData,
  LanguagesPreviewData,
  PersonalInfoPreviewData,
  ProjectsPreviewData,
  ResumeTemplateDetail,
  SkillsPreviewData,
  SummaryPreviewData,
  TemplatePreviewSection,
  WorkExperiencePreviewData,
} from "@/shared/types";
import { formatPreviewDate } from "@/shared/helpers";

type TemplateResumePreviewProps = {
  template: ResumeTemplateDetail;
  className?: string;
};

const SIDEBAR_SECTION_TYPES = new Set(["SKILLS", "CERTIFICATIONS", "LANGUAGES", "REFERENCES"]);

/** Sample A4 resume rendered from template detail `previewSections`. */
export default function MockResumePreview({ template, className = "" }: TemplateResumePreviewProps) {
  const accent =
    template.defaultCustomization?.colors?.accent ??
    template.defaultCustomization?.colors?.primary ??
    "#1F4E79";
  const columns = template.defaultCustomization?.layout?.columns ?? 2;
  const sections = [...(template.previewSections ?? [])].sort(
    (a, b) => a.position - b.position,
  );
  const personal = sections.find((section) => section.type === "PERSONAL_INFO");
  const personalData = (personal?.data ?? {}) as PersonalInfoPreviewData;
  const mainSections = sections.filter(
    (section) => section.type !== "PERSONAL_INFO" && !SIDEBAR_SECTION_TYPES.has(section.type),
  );
  const sideSections = sections.filter((section) => SIDEBAR_SECTION_TYPES.has(section.type));
  const contactBits = [
    personalData.email,
    personalData.phone,
    personalData.location,
    personalData.github,
  ].filter(Boolean) as string[];

  return (
    <article
      className={[
        "w-full overflow-hidden rounded-sm border border-[#E5E3DE] bg-white text-[#1F1D19] shadow-[0_8px_24px_-8px_rgba(31,29,25,0.18)]",
        className,
      ].join(" ")}
      aria-label={`${template.name} template preview`}
    >
      <header className="px-5 py-4 text-white sm:px-6" style={{ backgroundColor: accent }}>
        <h2 className="font-serif text-[22px] font-semibold leading-tight tracking-tight sm:text-[26px]">
          {personalData.fullName || "Your name"}
        </h2>
        {personalData.jobTitle ? (
          <p className="mt-0.5 text-sm text-white/85">{personalData.jobTitle}</p>
        ) : null}
        {contactBits.length > 0 ? (
          <p className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1 text-[10px] leading-relaxed text-white/75 sm:text-[11px]">
            {contactBits.map((bit, index) => (
              <span key={`${bit}-${index}`} className="inline-flex items-center gap-x-2">
                {index > 0 ? <span aria-hidden="true">·</span> : null}
                <span>{bit}</span>
              </span>
            ))}
          </p>
        ) : null}
      </header>

      {columns >= 2 ? (
        <div className="grid grid-cols-[1fr_0.72fr] gap-0 text-[10px] leading-relaxed sm:text-[11px]">
          <div className="space-y-4 border-r border-[#EFEEEB] px-4 py-4 sm:px-5 sm:py-5">
            {mainSections.map((section) => (
              <PreviewSectionBlock key={`${section.type}-${section.position}`} section={section} />
            ))}
          </div>
          <aside className="space-y-4 bg-[#FAFAF8] px-3.5 py-4 sm:px-4 sm:py-5">
            {sideSections.map((section) => (
              <PreviewSectionBlock key={`${section.type}-${section.position}`} section={section} />
            ))}
          </aside>
        </div>
      ) : (
        <div className="space-y-4 px-4 py-4 text-[10px] leading-relaxed sm:px-5 sm:py-5 sm:text-[11px]">
          {sections
            .filter((section) => section.type !== "PERSONAL_INFO")
            .map((section) => (
              <PreviewSectionBlock key={`${section.type}-${section.position}`} section={section} />
            ))}
        </div>
      )}
    </article>
  );
}

function PreviewSectionBlock({ section }: { section: TemplatePreviewSection }) {
  switch (section.type) {
    case "SUMMARY":
      return <SummaryBlock data={section.data as SummaryPreviewData} />;
    case "WORK_EXPERIENCE":
      return <WorkExperienceBlock data={section.data as WorkExperiencePreviewData} />;
    case "PROJECTS":
      return <ProjectsBlock data={section.data as ProjectsPreviewData} />;
    case "EDUCATION":
      return <EducationBlock data={section.data as EducationPreviewData} />;
    case "SKILLS":
      return <SkillsBlock data={section.data as SkillsPreviewData} />;
    case "CERTIFICATIONS":
      return <CertificationsBlock data={section.data as CertificationsPreviewData} />;
    case "LANGUAGES":
      return <LanguagesBlock data={section.data as LanguagesPreviewData} />;
    default:
      return null;
  }
}

function SummaryBlock({ data }: { data: SummaryPreviewData }) {
  if (!data.text) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Profile</SectionLabel>
      <p className="mt-1.5 text-[#3F3A32]">{data.text}</p>
    </section>
  );
}

function WorkExperienceBlock({ data }: { data: WorkExperiencePreviewData }) {
  if (!data.items?.length) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Experience</SectionLabel>
      <div className="mt-2 space-y-3">
        {data.items.map((item) => {
          const start = formatPreviewDate(item.startDate);
          const end = item.current ? "Present" : formatPreviewDate(item.endDate);
          const range = [start, end].filter(Boolean).join(" – ");
          return (
            <div key={item.id}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold text-[#1F1D19]">{item.role}</p>
                {range ? <p className="shrink-0 text-[10px] text-[#857F74]">{range}</p> : null}
              </div>
              <p className="text-[#524D44]">
                {[item.company, item.location].filter(Boolean).join(" · ")}
              </p>
              {item.bullets?.length ? (
                <ul className="mt-1 list-disc space-y-0.5 pl-3.5 text-[#3F3A32]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectsBlock({ data }: { data: ProjectsPreviewData }) {
  if (!data.items?.length) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Selected Projects</SectionLabel>
      <div className="mt-2 space-y-2">
        {data.items.map((item) => (
          <div key={item.id}>
            <p className="font-semibold">{item.name}</p>
            <p className="text-[#3F3A32]">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationBlock({ data }: { data: EducationPreviewData }) {
  if (!data.items?.length) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Education</SectionLabel>
      <div className="mt-1.5 space-y-2">
        {data.items.map((item) => {
          const range = [item.startDate, item.endDate].filter(Boolean).join(" – ");
          return (
            <div key={item.id}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold">{item.school}</p>
                {range ? <p className="shrink-0 text-[10px] text-[#857F74]">{range}</p> : null}
              </div>
              <p className="text-[#524D44]">
                {[item.degree, item.gpa ? `GPA ${item.gpa}` : null].filter(Boolean).join(" · ")}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SkillsBlock({ data }: { data: SkillsPreviewData }) {
  if (!data.groups?.length) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Skills</SectionLabel>
      <dl className="mt-2 space-y-2">
        {data.groups.map((group) => (
          <SkillGroup
            key={group.id}
            label={group.label}
            value={group.items.map((item) => item.name).join(", ")}
          />
        ))}
      </dl>
    </section>
  );
}

function CertificationsBlock({ data }: { data: CertificationsPreviewData }) {
  if (!data.items?.length) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Certifications</SectionLabel>
      <ul className="mt-2 space-y-1.5 text-[#3F3A32]">
        {data.items.map((item) => (
          <li key={item.id}>
            <span className="font-medium text-[#1F1D19]">{item.name}</span>
            {item.issueDate ? <span className="text-[#857F74]"> · {item.issueDate}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function LanguagesBlock({ data }: { data: LanguagesPreviewData }) {
  if (!data.items?.length) {
    return null;
  }
  return (
    <section>
      <SectionLabel>Languages</SectionLabel>
      <ul className="mt-2 space-y-1 text-[#3F3A32]">
        {data.items.map((item) => (
          <li key={item.id}>
            {item.name}
            {item.proficiency ? ` · ${item.proficiency}` : ""}
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#857F74]">
      {children}
    </h3>
  );
}

function SkillGroup({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-[#1F1D19]">{label}</dt>
      <dd className="text-[#3F3A32]">{value}</dd>
    </div>
  );
}
