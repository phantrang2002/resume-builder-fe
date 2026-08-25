import ResumeCard from "@/components/page/resumes/ResumeCard";
import ResumesToolbar from "@/components/page/resumes/ResumesToolbar";
import useResumesPage from "@/hooks/resume/useResumesPage";
import { ROUTER_PATH } from "@/shared/constants";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

function ResumesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-[#E3E1DC] bg-white p-4">
          <div className="mx-auto aspect-[3/4] max-w-[160px] rounded-md bg-[#E5E3DE]" />
          <div className="mt-4 h-3.5 w-[70%] rounded bg-[#E5E3DE]" />
          <div className="mt-2 h-3 w-[45%] rounded bg-[#E5E3DE]" />
        </div>
      ))}
    </div>
  );
}

export default function ResumesPage() {
  const navigate = useNavigate();
  const page = useResumesPage();
  const tailoredCount = page.summary?.tailoredCount ?? 0;
  const total = page.summary?.total ?? page.total;

  return (
    <div className="flex min-h-full w-full flex-col">
      <header className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-tight text-pageTitle">
            My resumes
          </h1>
          <p className="mt-[2px] text-sm text-subtle">
            {total} resume{total === 1 ? "" : "s"}
            {tailoredCount > 0
              ? ` · ${tailoredCount} tailored to a specific job`
              : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTER_PATH.RESUMES_NEW)}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          New resume
        </button>
      </header>

      <div className="mt-6">
        <ResumesToolbar
          search={page.search}
          onSearchChange={page.setSearch}
          statusFilter={page.statusFilter}
          onStatusFilterChange={page.setStatusFilter}
          statusFilters={page.statusFilters}
          sortKey={page.sortKey}
          onSortChange={page.setSortKey}
          sortOptions={page.sortOptions}
          activeSortLabel={page.activeSortLabel}
          viewMode={page.viewMode}
          onViewModeChange={page.setViewMode}
        />
      </div>

      <div className="mt-6 flex-1">
        {page.isLoading ? (
          <ResumesSkeleton />
        ) : page.isError ? (
          <div className="rounded-2xl border border-[#E3E1DC] bg-white px-6 py-10 text-center text-sm text-subtle">
            Couldn&apos;t load your resumes. Please try again.
          </div>
        ) : page.items.length === 0 ? (
          <div className="rounded-2xl border border-[#E3E1DC] bg-white px-6 py-10 text-center">
            <p className="text-sm text-subtle">No resumes match your filters.</p>
            <button
              type="button"
              onClick={() => navigate(ROUTER_PATH.RESUMES_NEW)}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Create a new resume
            </button>
          </div>
        ) : page.viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {page.items.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} viewMode="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {page.items.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} viewMode="list" />
            ))}
          </div>
        )}

        {page.isFetching && !page.isLoading ? (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-subtle">
            <Spin indicator={<LoadingOutlined spin />} size="small" />
            Updating…
          </div>
        ) : null}
      </div>
    </div>
  );
}
