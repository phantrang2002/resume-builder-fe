import ActionButton from "@/components/common/ActionButton";
import ResumeCard from "@/components/page/resumes/ResumeCard";
import ResumesEmptyState, {
  ResumesFilteredEmptyState,
} from "@/components/page/resumes/ResumesEmptyState";
import ResumesErrorState from "@/components/page/resumes/ResumesErrorState";
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
            {page.isTrulyEmpty
              ? "No resumes yet"
              : `${total} resume${total === 1 ? "" : "s"}${tailoredCount > 0 ? ` · ${tailoredCount} tailored to a specific job` : ""}`}
          </p>
        </div>

        {!page.isError && !page.isTrulyEmpty ? (
          <ActionButton
            fullWidth={false}
            onClick={() => navigate(ROUTER_PATH.RESUMES_NEW)}
            className="shrink-0 px-4 font-medium"
          >
            New resume
          </ActionButton>
        ) : null}
      </header>

      {!page.isError && !page.isTrulyEmpty ? (
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
      ) : null}

      <div className="mt-6 flex flex-1 flex-col">
        {page.isLoading ? (
          <ResumesSkeleton />
        ) : page.isError ? (
          <ResumesErrorState
            error={page.error}
            onRetry={() => void page.refetch()}
            isRetrying={page.isRefetching}
          />
        ) : page.isTrulyEmpty ? (
          <ResumesEmptyState />
        ) : page.isFilteredEmpty ? (
          <ResumesFilteredEmptyState />
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
