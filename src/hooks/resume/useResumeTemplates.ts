import { useCallback, useMemo } from "react";
import { useGetTemplatesQuery } from "@/services/api";
import type { ResumeTemplate, TemplateListFilter } from "@/shared/types";
import { parseTemplateId, resolveMediaUrl } from "@/shared/helpers";

export function getTemplateThumbnailSrc(template: Pick<ResumeTemplate, "thumbnailUrl">): string {
  return resolveMediaUrl(template.thumbnailUrl);
}

export function formatSupportedSection(section: string): string {
  return section
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");
}

function matchesTemplateFilter(template: ResumeTemplate, filterKey: string): boolean {
  if (!filterKey || filterKey === "all") {
    return true;
  }
  if (filterKey === "ats") {
    return template.tags.some((tag) => tag.toLowerCase() === "ats");
  }
  return template.category.toLowerCase() === filterKey.toLowerCase();
}

function matchesTemplateSearch(template: ResumeTemplate, search: string): boolean {
  const query = search.trim().toLowerCase();
  if (!query) {
    return true;
  }
  const haystack = [template.name, template.description, template.category, ...template.tags]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export default function useResumeTemplates() {
  const query = useGetTemplatesQuery();
  const data = query.data?.data;

  const templates = useMemo(() => {
    const items = data?.items ?? [];
    return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [data?.items]);

  const filters = useMemo((): TemplateListFilter[] => {
    if (data?.filters?.length) {
      return data.filters;
    }
    return [{ key: "all", label: "All", count: templates.length }];
  }, [data?.filters, templates.length]);

  const total = data?.total ?? templates.length;

  const getTemplateById = useCallback(
    (id: string | number | null | undefined): ResumeTemplate | undefined => {
      const numericId = typeof id === "number" ? id : parseTemplateId(id);
      if (numericId == null) {
        return undefined;
      }
      return templates.find((template) => template.id === numericId);
    },
    [templates],
  );

  const filterTemplates = useCallback(
    (search: string, filterKey: string): ResumeTemplate[] =>
      templates.filter(
        (template) =>
          matchesTemplateFilter(template, filterKey) && matchesTemplateSearch(template, search),
      ),
    [templates],
  );

  return {
    templates,
    filters,
    total,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    getTemplateById,
    filterTemplates,
  };
}
