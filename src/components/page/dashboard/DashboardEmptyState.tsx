import { LoadingOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ResumeStackIllustration from "./ResumeStackIllustration";

type DashboardEmptyStateProps = {
  firstName: string;
  isLoading?: boolean;
};

function SkeletonBone({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-[#E5E3DE] ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div className="flex min-h-full w-full flex-col" aria-busy="true" aria-live="polite">
      <header className="shrink-0 space-y-3">
        <SkeletonBone className="h-8 w-64 sm:w-72" />
        <SkeletonBone className="h-3.5 w-48 sm:w-56" />
      </header>

      <div className="mt-8 flex flex-col gap-6">
        <section className="flex items-start gap-5 rounded-2xl border border-[#E3E1DC] bg-white p-5 sm:gap-6 sm:p-6">
          <SkeletonBone className="h-[120px] w-[88px] shrink-0 rounded-lg sm:h-[132px] sm:w-[96px]" />

          <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1">
            <SkeletonBone className="h-3.5 w-[72%] max-w-[280px]" />
            <SkeletonBone className="h-3 w-[58%] max-w-[220px]" />
            <SkeletonBone className="h-3 w-[42%] max-w-[160px]" />
          </div>

          <SkeletonBone className="mt-1 hidden h-9 w-20 shrink-0 rounded-lg sm:block" />
        </section>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <article
              key={index}
              className="flex flex-col rounded-2xl border border-[#E3E1DC] bg-white p-5"
            >
              <SkeletonBone className="mx-auto aspect-[3/4] w-full max-w-[160px] rounded-lg" />
              <div className="mt-5 space-y-2.5">
                <SkeletonBone className="h-3.5 w-[70%]" />
                <SkeletonBone className="h-3 w-[45%]" />
              </div>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2.5 py-2 text-sm text-subtle">
          <Spin indicator={<LoadingOutlined className="text-subtle" spin />} size="small" />
          <span>Loading your resumes...</span>
        </div>
      </div>
    </div>
  );
}

function DashboardEmptyContent({ firstName }: { firstName: string }) {
  return (
    <div className="flex min-h-full w-full flex-col">
      <header className="shrink-0">
        <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-pageTitle">
          Welcome, {firstName}
        </h1>
        <p className="mt-2 text-sm text-subtle">
          Let&apos;s build your first resume. It takes about 10 minutes.
        </p>
      </header>

      <div className="flex flex-1 items-center justify-center py-10">
        <section className="w-full max-w-[640px] rounded-2xl border border-[#E3E1DC] bg-white px-8 py-12 text-center sm:px-12">
          <ResumeStackIllustration />

          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-pageTitle">
            You don&apos;t have a resume yet
          </h2>
          <p className="mx-auto mt-3 max-w-[500px] text-base leading-[1.6] text-[#524D44]">
            Start from a professional template and fill in your details — the preview updates as you
            type, and everything saves automatically.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-11 min-w-[200px] items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Create my first resume
            </button>
            <button
              type="button"
              className="inline-flex h-11 min-w-[160px] items-center justify-center rounded-lg border border-gray-300 bg-white px-5 text-sm font-medium text-pageTitle transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
            >
              See the templates
            </button>
          </div>

          <p className="mt-8 inline-flex items-center justify-center gap-2 text-[12px] text-subtle">
            <SafetyCertificateOutlined className="text-sm text-subtle" />
            Your data stays private. Export to PDF any time.
          </p>
        </section>
      </div>
    </div>
  );
}

export default function DashboardEmptyState({
  firstName,
  isLoading = false,
}: DashboardEmptyStateProps) {
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return <DashboardEmptyContent firstName={firstName} />;
}
