import FilterPillButton from "@/components/common/FilterPillButton";
import SearchField from "@/components/common/SearchField";
import type { ResumesViewMode } from "@/hooks/resume/useResumesPage";
import type { ResumeSortKey, ResumeStatusFilter } from "@/shared/types";
import {
  AppstoreOutlined,
  DownOutlined,
  SortAscendingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

type ResumesToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: ResumeStatusFilter;
  onStatusFilterChange: (value: ResumeStatusFilter) => void;
  statusFilters: { key: ResumeStatusFilter; label: string }[];
  sortKey: ResumeSortKey;
  onSortChange: (value: ResumeSortKey) => void;
  sortOptions: { value: ResumeSortKey; label: string }[];
  activeSortLabel: string;
  viewMode: ResumesViewMode;
  onViewModeChange: (mode: ResumesViewMode) => void;
};

export default function ResumesToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  statusFilters,
  sortKey,
  onSortChange,
  sortOptions,
  activeSortLabel,
  viewMode,
  onViewModeChange,
}: ResumesToolbarProps) {
  const sortMenuItems: MenuProps["items"] = sortOptions.map((option) => ({
    key: option.value,
    label: option.label,
    onClick: () => onSortChange(option.value),
  }));

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <SearchField
        id="resume-search"
        value={search}
        onChange={onSearchChange}
        placeholder="Search resumes"
        hideLabel
        className="w-full shrink-0 sm:w-[240px]"
      />

      <div
        className="flex flex-wrap items-center gap-2"
        role="tablist"
        aria-label="Filter by status"
      >
        {statusFilters.map((filter) => {
          const isActive = statusFilter === filter.key;

          return (
            <FilterPillButton
              key={filter.key}
              active={isActive}
              onClick={() => onStatusFilterChange(filter.key)}
            >
              {filter.label}
            </FilterPillButton>
          );
        })}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2 sm:gap-3">
        <Dropdown menu={{ items: sortMenuItems, selectedKeys: [sortKey] }} trigger={["click"]}>
          <button
            type="button"
            className="inline-flex h-[36px] items-center gap-2 rounded-md border border-[#E5E3DE] bg-white px-3 text-sm text-secondary transition-colors hover:text-pageTitle"
          >
            <SortAscendingOutlined className="text-base text-subtle" />
            {activeSortLabel}
            <DownOutlined className="text-[10px] text-subtle" />
          </button>
        </Dropdown>

        <div
          className="inline-flex rounded-md bg-[#EFEEEB] p-1"
          role="group"
          aria-label="View mode"
        >
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
            className={[
              "inline-flex size-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "grid" ? "bg-white text-black" : "text-subtle hover:text-secondary",
            ].join(" ")}
          >
            <AppstoreOutlined />
          </button>
          <button
            type="button"
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
            className={[
              "inline-flex size-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "list" ? "bg-white text-black" : "text-subtle hover:text-secondary",
            ].join(" ")}
          >
            <UnorderedListOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
