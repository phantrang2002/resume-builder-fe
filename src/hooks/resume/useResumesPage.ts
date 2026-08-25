import type { ResumeSortKey, ResumeStatus, ResumeStatusFilter } from "@/shared/types";
import { useGetResumesQuery } from "@/services/api";
import { useMemo, useState } from "react";

export type ResumesViewMode = "grid" | "list";

const STATUS_FILTERS: { key: ResumeStatusFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "draft", label: "Draft" },
  { key: "ready", label: "Ready" },
  { key: "archived", label: "Archived" },
];

const SORT_OPTIONS: { value: ResumeSortKey; label: string }[] = [
  { value: "updatedAt", label: "Last edited" },
];

function toApiStatus(filter: ResumeStatusFilter): ResumeStatus | undefined {
  if (filter === "all") {
    return undefined;
  }
  return filter.toUpperCase() as ResumeStatus;
}

export default function useResumesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ResumeStatusFilter>("all");
  const [sortKey, setSortKey] = useState<ResumeSortKey>("updatedAt");
  const [viewMode, setViewMode] = useState<ResumesViewMode>("grid");

  const queryParams = useMemo(
    () => ({
      search: search.trim() || undefined,
      sort: sortKey,
      status: toApiStatus(statusFilter),
    }),
    [search, sortKey, statusFilter],
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useGetResumesQuery(queryParams);
  const resumesData = data?.data;
  const items = resumesData?.items ?? [];
  const summary = resumesData?.summary;

  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortKey)?.label ?? "Last edited";

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusFilters: STATUS_FILTERS,
    sortKey,
    setSortKey,
    sortOptions: SORT_OPTIONS,
    activeSortLabel,
    viewMode,
    setViewMode,
    items,
    summary,
    total: summary?.total ?? items.length,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    isRefetching: isFetching && !isLoading,
  };
}
