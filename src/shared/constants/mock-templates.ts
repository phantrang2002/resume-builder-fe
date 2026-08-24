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
    description: "Traditional serif layout with a single column.",
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
    description: "Header band with a sidebar for skills and extras.",
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
    description: "Dense single-column layout for longer careers.",
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
    id: "aurora",
    name: "Aurora",
    description: "Clean modern layout with a soft accent bar and clear section hierarchy.",
    tags: ["Modern", "ATS"],
    recommendedFor: "Product, marketing, and general professional roles",
    atAGlance: ["One-column", "Accent header", "ATS-friendly spacing"],
    sections: ["Summary", "Experience", "Skills", "Education", "Projects"],
    accent: "#2E4C74",
    thumbnail: miniModern,
  },
  {
    id: "slate",
    name: "Slate",
    description: "Minimal two-tone design that keeps the focus on achievements.",
    tags: ["Minimal", "ATS"],
    recommendedFor: "Engineers and analysts who prefer understated design",
    atAGlance: ["Two-tone sidebar", "Dense skills", "Print-ready"],
    sections: ["Summary", "Experience", "Skills", "Education", "Certifications"],
    accent: "#4B5563",
    thumbnail: miniCompact,
  },
  {
    id: "heritage",
    name: "Heritage",
    description: "Classic serif headings with traditional section dividers.",
    tags: ["Classic"],
    recommendedFor: "Law, finance, and academic applications",
    atAGlance: ["Serif titles", "Traditional rules", "Formal tone"],
    sections: ["Summary", "Experience", "Education", "Publications", "Skills"],
    accent: "#1F2937",
    thumbnail: miniClassic,
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Modern gallery-friendly layout with bold role titles and skill chips.",
    tags: ["Modern"],
    recommendedFor: "Designers and creatives showcasing visual work",
    atAGlance: ["Bold typography", "Skill chips", "Project-forward"],
    sections: ["Summary", "Projects", "Experience", "Skills", "Education"],
    accent: "#0F766E",
    thumbnail: miniModern,
  },
  {
    id: "linen",
    name: "Linen",
    description: "Soft minimal template with generous whitespace and quiet labels.",
    tags: ["Minimal"],
    recommendedFor: "Early-career candidates who want a calm, readable page",
    atAGlance: ["Airy spacing", "Quiet labels", "Easy scan"],
    sections: ["Summary", "Experience", "Education", "Skills", "Interests"],
    accent: "#857F74",
    thumbnail: miniClassic,
  },
  {
    id: "ledger",
    name: "Ledger",
    description: "Classic structure optimized for dense experience timelines.",
    tags: ["Classic", "ATS"],
    recommendedFor: "Managers and specialists with long work histories",
    atAGlance: ["Timeline-friendly", "Dense content", "ATS parsers"],
    sections: ["Summary", "Experience", "Leadership", "Skills", "Education"],
    accent: "#253D5D",
    thumbnail: miniCompact,
  },
  {
    id: "signal",
    name: "Signal",
    description: "ATS-first single column with predictable headings and bullet rhythm.",
    tags: ["ATS", "Minimal"],
    recommendedFor: "High-volume applications through applicant tracking systems",
    atAGlance: ["Single column", "Standard headings", "Parser-safe"],
    sections: ["Summary", "Skills", "Experience", "Education", "Extras"],
    accent: "#3478F5",
    thumbnail: miniClassic,
  },
  {
    id: "nova",
    name: "Nova",
    description: "Modern header band with balanced sections for mid-level roles.",
    tags: ["Modern", "Classic"],
    recommendedFor: "Mid-level professionals across industries",
    atAGlance: ["Header band", "Balanced sections", "Versatile"],
    sections: ["Summary", "Experience", "Skills", "Education", "Volunteer"],
    accent: "#456590",
    thumbnail: miniModern,
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
