import type { MockTemplate } from "@/shared/constants/mock-templates";

type MockResumePreviewProps = {
  template: MockTemplate;
  className?: string;
};

/** Sample A4 resume used only for template preview (mock content). */
export default function MockResumePreview({ template, className = "" }: MockResumePreviewProps) {
  const accent = template.accent;

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
          Nguyen Minh Tran
        </h2>
        <p className="mt-0.5 text-sm text-white/85">Backend Engineer</p>
        <p className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1 text-[10px] leading-relaxed text-white/75 sm:text-[11px]">
          <span>minh.tran@gmail.com</span>
          <span aria-hidden="true">·</span>
          <span>+84 90 231 4477</span>
          <span aria-hidden="true">·</span>
          <span>Ho Chi Minh City, Vietnam</span>
          <span aria-hidden="true">·</span>
          <span>github.com/minhtran</span>
        </p>
      </header>

      <div className="grid grid-cols-[1fr_0.72fr] gap-0 text-[10px] leading-relaxed sm:text-[11px]">
        <div className="space-y-4 border-r border-[#EFEEEB] px-4 py-4 sm:px-5 sm:py-5">
          <section>
            <SectionLabel>Profile</SectionLabel>
            <p className="mt-1.5 text-[#3F3A32]">
              Backend Engineer with 3 years shipping Node.js services and PostgreSQL data models
              for high-traffic commerce platforms. Comfortable owning API design, observability,
              and the messy middle between product requirements and production.
            </p>
          </section>

          <section>
            <SectionLabel>Experience</SectionLabel>
            <div className="mt-2 space-y-3">
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#1F1D19]">Backend Engineer</p>
                  <p className="shrink-0 text-[10px] text-[#857F74]">Mar 2023 – Present</p>
                </div>
                <p className="text-[#524D44]">Tiki Corporation · Ho Chi Minh City</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-3.5 text-[#3F3A32]">
                  <li>Cut p95 latency on checkout APIs by 35% through query tuning and caching.</li>
                  <li>Led migration of order events to RabbitMQ; improved retry visibility.</li>
                  <li>Mentored two juniors on NestJS module boundaries and testing habits.</li>
                </ul>
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-semibold text-[#1F1D19]">Software Engineer</p>
                  <p className="shrink-0 text-[10px] text-[#857F74]">Jul 2021 – Feb 2023</p>
                </div>
                <p className="text-[#524D44]">VNG Corporation · Ho Chi Minh City</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-3.5 text-[#3F3A32]">
                  <li>Built internal gRPC services powering identity lookups across products.</li>
                  <li>Introduced TypeORM migrations and CI checks that blocked unsafe schema drifts.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel>Selected Projects</SectionLabel>
            <div className="mt-2 space-y-2">
              <div>
                <p className="font-semibold">Rezum — Resume Builder</p>
                <p className="text-[#3F3A32]">
                  Real-time resume editor with WebSockets preview sync, Playwright PDF export, and
                  RabbitMQ job queues.
                </p>
              </div>
              <div>
                <p className="font-semibold">Ledgerly</p>
                <p className="text-[#3F3A32]">
                  Personal finance API on NestJS + PostgreSQL with double-entry bookkeeping and
                  scheduled reconciliation jobs.
                </p>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel>Education</SectionLabel>
            <div className="mt-1.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-semibold">University of Science, VNU-HCM</p>
                <p className="shrink-0 text-[10px] text-[#857F74]">2017 – 2021</p>
              </div>
              <p className="text-[#524D44]">B.Sc. Information Technology · GPA 3.6 / 4.0</p>
            </div>
          </section>
        </div>

        <aside className="space-y-4 bg-[#FAFAF8] px-3.5 py-4 sm:px-4 sm:py-5">
          <section>
            <SectionLabel>Skills</SectionLabel>
            <dl className="mt-2 space-y-2">
              <SkillGroup label="Languages" value="TypeScript, JavaScript, SQL, Go" />
              <SkillGroup label="Backend" value="Node.js, Express, NestJS, gRPC" />
              <SkillGroup label="Data" value="PostgreSQL, Redis, RabbitMQ, TypeORM" />
              <SkillGroup label="Infra" value="Docker, AWS S3 / ECS, GitHub Actions" />
            </dl>
          </section>

          <section>
            <SectionLabel>Certifications</SectionLabel>
            <ul className="mt-2 space-y-1.5 text-[#3F3A32]">
              <li>
                <span className="font-medium text-[#1F1D19]">AWS Certified Developer</span>
                <span className="text-[#857F74]"> · 2024</span>
              </li>
              <li>
                <span className="font-medium text-[#1F1D19]">Meta Backend Developer</span>
                <span className="text-[#857F74]"> · 2022</span>
              </li>
            </ul>
          </section>

          <section>
            <SectionLabel>Languages</SectionLabel>
            <ul className="mt-2 space-y-1 text-[#3F3A32]">
              <li>Vietnamese · Native</li>
              <li>English · Professional working</li>
            </ul>
          </section>
        </aside>
      </div>
    </article>
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
