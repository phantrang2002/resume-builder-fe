import miniClassic from "@/assets/images/mini-classic.png";
import miniCompact from "@/assets/images/mini-compact.png";
import miniModern from "@/assets/images/mini-modern.png";

export type TemplateCategory = "Modern" | "Minimal" | "Classic" | "ATS";

export type MockTemplate = {
  id: string;
  name: string;
  description: string;
  tags: TemplateCategory[];
  recommendedFor: string;
  atAGlance: string[];
  sections: string[];
  accent: string;
  thumbnail: string;
  teaserSubtitle?: string;
};

export const METHOD_TEASER_TEMPLATES: MockTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Serif, centred, timeless",
    tags: ["Classic", "ATS"],
    recommendedFor: "General professional roles",
    atAGlance: ["Serif", "One column"],
    sections: ["Summary", "Experience", "Projects", "Education", "Skills"],
    accent: "#1F2937",
    thumbnail: miniClassic,
    teaserSubtitle: "Serif · one column",
  },
  {
    id: "modern",
    name: "Modern",
    description: "A navy header band carries your name and contact details, with a narrow right sidebar for skills, certifications and languages. The main column keeps experience and projects in a single readable measure.",
    tags: ["Modern", "ATS"],
    recommendedFor: "Tech and product roles",
    atAGlance: ["Header band", "Sidebar"],
    sections: ["Summary", "Experience", "Skills", "Education", "Projects"],
    accent: "#2E4C74",
    thumbnail: miniModern,
    teaserSubtitle: "Header band · sidebar",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense, for a longer career",
    tags: ["Minimal", "ATS"],
    recommendedFor: "Senior professionals with long histories",
    atAGlance: ["Dense", "Longer careers"],
    sections: ["Summary", "Experience", "Education", "Skills", "Others"],
    accent: "#4B5563",
    thumbnail: miniCompact,
    teaserSubtitle: "Dense · longer careers",
  },
];

export const MOCK_TEMPLATES: MockTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "A navy header band carries your name and contact details, with a narrow right sidebar for skills, certifications and languages. The main column keeps experience and projects in a single readable measure.",
    tags: ["Modern", "ATS"],
    recommendedFor: "Tech and product roles",
    atAGlance: ["Header band", "Sidebar", "ATS-friendly spacing"],
    sections: ["Summary", "Experience", "Skills", "Education", "Projects"],
    accent: "#2E4C74",
    thumbnail: miniModern,
  },
  {
    id: "classic",
    name: "Classic",
    description: "Serif, centred, timeless",
    tags: ["Classic"],
    recommendedFor: "Law, finance, and academic applications",
    atAGlance: ["Serif titles", "Centered layout", "Formal tone"],
    sections: ["Summary", "Experience", "Education", "Skills", "Projects"],
    accent: "#1F2937",
    thumbnail: miniClassic,
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense, for a longer career",
    tags: ["Minimal", "ATS"],
    recommendedFor: "Senior professionals with long histories",
    atAGlance: ["Dense layout", "Longer careers", "Print-ready"],
    sections: ["Summary", "Experience", "Education", "Skills", "Others"],
    accent: "#4B5563",
    thumbnail: miniCompact,
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Serif headings, wide margins",
    tags: ["Classic"],
    recommendedFor: "Writers, editors, and content-focused roles",
    atAGlance: ["Serif headings", "Wide margins", "Editorial feel"],
    sections: ["Summary", "Experience", "Projects", "Education", "Skills"],
    accent: "#857F74",
    thumbnail: miniClassic,
  },
  {
    id: "technical",
    name: "Technical",
    description: "Skills-forward for engineers",
    tags: ["Modern", "ATS"],
    recommendedFor: "Engineers and technical specialists",
    atAGlance: ["Skills-forward", "Dense bullets", "ATS parsers"],
    sections: ["Summary", "Skills", "Experience", "Projects", "Education"],
    accent: "#3478F5",
    thumbnail: miniModern,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "No rules, pure typography",
    tags: ["Minimal"],
    recommendedFor: "Early-career candidates who want a calm, readable page",
    atAGlance: ["Airy spacing", "Quiet labels", "Easy scan"],
    sections: ["Summary", "Experience", "Education", "Skills", "Interests"],
    accent: "#857F74",
    thumbnail: miniClassic,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Leads with impact statements",
    tags: ["Classic", "ATS"],
    recommendedFor: "Managers and specialists with long work histories",
    atAGlance: ["Impact-first", "Dense content", "ATS parsers"],
    sections: ["Summary", "Experience", "Leadership", "Skills", "Education"],
    accent: "#253D5D",
    thumbnail: miniCompact,
  },
  {
    id: "academic",
    name: "Academic",
    description: "Publications and teaching first",
    tags: ["Classic"],
    recommendedFor: "Researchers, lecturers, and academic applications",
    atAGlance: ["Publications-first", "Teaching focus", "Formal tone"],
    sections: ["Summary", "Education", "Publications", "Teaching", "Skills"],
    accent: "#1F2937",
    thumbnail: miniClassic,
  },
];

export const TEMPLATE_FILTERS = ["All", "Modern", "Minimal", "Classic", "ATS-friendly"] as const;

export type TemplateFilter = (typeof TEMPLATE_FILTERS)[number];

export function filterMockTemplates(
  templates: MockTemplate[],
  search: string,
  filter: TemplateFilter,
): MockTemplate[] {
  const query = search.trim().toLowerCase();

  return templates.filter((template) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "ATS-friendly"
        ? template.tags.includes("ATS")
        : template.tags.includes(filter as TemplateCategory));

    if (!matchesFilter) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [template.name, template.description, ...template.tags].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

export function getMockTemplateById(id: string | null): MockTemplate | undefined {
  if (!id) {
    return undefined;
  }
  return (
    MOCK_TEMPLATES.find((template) => template.id === id) ??
    METHOD_TEASER_TEMPLATES.find((template) => template.id === id)
  );
}
