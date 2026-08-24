import miniClassic from "@/assets/images/mini-classic.png";
import miniCompact from "@/assets/images/mini-compact.png";
import miniModern from "@/assets/images/mini-modern.png";

export type TemplateCategory = "Modern" | "Minimal" | "Classic" | "ATS";

export type AtAGlanceItem = {
  label: string;
  value: string;
};

export type MockTemplate = {
  id: string;
  name: string;
  /** Short one-liner for gallery cards */
  summary: string;
  /** Longer copy for the template preview panel */
  description: string;
  tags: TemplateCategory[];
  recommendedFor: string[];
  atAGlance: AtAGlanceItem[];
  sections: string[];
  accent: string;
  thumbnail: string;
  teaserSubtitle?: string;
};

const NINE_SECTIONS = [
  "Personal",
  "Summary",
  "Experience",
  "Education",
  "Skills",
  "Projects",
  "Certifications",
  "Languages",
  "References",
] as const;

export const METHOD_TEASER_TEMPLATES: MockTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    summary: "Serif, centred, timeless",
    description:
      "A centred serif layout with generous margins and a formal tone. Ideal when you want the page to feel established rather than trendy.",
    tags: ["Classic", "ATS"],
    recommendedFor: [
      "Law, finance, and academic applications",
      "Candidates who prefer a traditional look",
      "Roles where formality signals trust",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Source Serif" },
      { label: "Best length", value: "1–2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#1F2937",
    thumbnail: miniClassic,
    teaserSubtitle: "Serif · one column",
  },
  {
    id: "modern",
    name: "Modern",
    summary: "Header band, sidebar",
    description:
      "A navy header band carries your name and contact details, with a narrow right sidebar for skills, certifications and languages. The main column keeps experience and projects in a single readable measure.",
    tags: ["Modern", "ATS"],
    recommendedFor: [
      "Engineers with 2–8 years of experience",
      "Product and platform roles that need a skills sidebar",
      "Candidates who want a clean ATS pass without sacrificing polish",
    ],
    atAGlance: [
      { label: "Layout", value: "Two column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "1–2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#2E4C74",
    thumbnail: miniModern,
    teaserSubtitle: "Header band · sidebar",
  },
  {
    id: "compact",
    name: "Compact",
    summary: "Dense, for a longer career",
    description:
      "A denser single-column layout that packs more history onto fewer pages without looking cramped. Built for longer careers and print-first workflows.",
    tags: ["Minimal", "ATS"],
    recommendedFor: [
      "Senior professionals with long work histories",
      "Managers who need room for impact bullets",
      "Anyone printing multi-page resumes regularly",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "2–3 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#4B5563",
    thumbnail: miniCompact,
    teaserSubtitle: "Dense · longer careers",
  },
];

export const MOCK_TEMPLATES: MockTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    summary: "Header band, sidebar",
    description:
      "A navy header band carries your name and contact details, with a narrow right sidebar for skills, certifications and languages. The main column keeps experience and projects in a single readable measure.",
    tags: ["Modern", "ATS"],
    recommendedFor: [
      "Engineers with 2–8 years of experience",
      "Product and platform roles that need a skills sidebar",
      "Candidates who want a clean ATS pass without sacrificing polish",
    ],
    atAGlance: [
      { label: "Layout", value: "Two column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "1–2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#2E4C74",
    thumbnail: miniModern,
  },
  {
    id: "classic",
    name: "Classic",
    summary: "Serif, centred, timeless",
    description:
      "A centred serif layout with generous margins and a formal tone. Ideal when you want the page to feel established rather than trendy.",
    tags: ["Classic"],
    recommendedFor: [
      "Law, finance, and academic applications",
      "Candidates who prefer a traditional look",
      "Roles where formality signals trust",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Source Serif" },
      { label: "Best length", value: "1–2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#1F2937",
    thumbnail: miniClassic,
  },
  {
    id: "compact",
    name: "Compact",
    summary: "Dense, for a longer career",
    description:
      "A denser single-column layout that packs more history onto fewer pages without looking cramped. Built for longer careers and print-first workflows.",
    tags: ["Minimal", "ATS"],
    recommendedFor: [
      "Senior professionals with long work histories",
      "Managers who need room for impact bullets",
      "Anyone printing multi-page resumes regularly",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "2–3 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#4B5563",
    thumbnail: miniCompact,
  },
  {
    id: "editorial",
    name: "Editorial",
    summary: "Serif headings, wide margins",
    description:
      "Serif section headings and wide margins give the page an editorial feel. Best when storytelling and projects matter as much as a skills list.",
    tags: ["Classic"],
    recommendedFor: [
      "Writers, editors, and content-focused roles",
      "Design-adjacent candidates who still need ATS safety",
      "Portfolios that lead with projects",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Source Serif" },
      { label: "Best length", value: "1–2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#857F74",
    thumbnail: miniClassic,
  },
  {
    id: "technical",
    name: "Technical",
    summary: "Skills-forward for engineers",
    description:
      "Skills lead the page so parsers and hiring managers see your stack first. Dense bullets keep experience scannable for technical reviewers.",
    tags: ["Modern", "ATS"],
    recommendedFor: [
      "Engineers and technical specialists",
      "Candidates with deep, stack-heavy profiles",
      "Applications screened by ATS keyword filters",
    ],
    atAGlance: [
      { label: "Layout", value: "Two column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "1–2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#3478F5",
    thumbnail: miniModern,
  },
  {
    id: "minimal",
    name: "Minimal",
    summary: "No rules, pure typography",
    description:
      "No rules or sidebar chrome—just quiet labels and airy spacing. A calm page for early-career candidates who want readability over decoration.",
    tags: ["Minimal"],
    recommendedFor: [
      "Early-career candidates who want a calm, readable page",
      "Roles that value clarity over visual hierarchy tricks",
      "Anyone who prefers typography-led design",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "1 page" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#857F74",
    thumbnail: miniClassic,
  },
  {
    id: "executive",
    name: "Executive",
    summary: "Leads with impact statements",
    description:
      "Opens with impact statements and keeps leadership themes front-and-centre. Dense enough for long histories while staying ATS-parseable.",
    tags: ["Classic", "ATS"],
    recommendedFor: [
      "Managers and specialists with long work histories",
      "Leadership roles that need quantified impact",
      "Candidates switching into executive tracks",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Inter" },
      { label: "Best length", value: "2 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
    accent: "#253D5D",
    thumbnail: miniCompact,
  },
  {
    id: "academic",
    name: "Academic",
    summary: "Publications and teaching first",
    description:
      "Education, publications, and teaching lead the narrative. Formal tone and classic structure for research and academic applications.",
    tags: ["Classic"],
    recommendedFor: [
      "Researchers, lecturers, and academic applications",
      "Candidates with publication lists",
      "Teaching-heavy profiles",
    ],
    atAGlance: [
      { label: "Layout", value: "One column" },
      { label: "Paper", value: "A4 and Letter" },
      { label: "Typeface", value: "Source Serif" },
      { label: "Best length", value: "2–3 pages" },
      { label: "Photo", value: "Not supported" },
    ],
    sections: [...NINE_SECTIONS],
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

    const haystack = [
      template.name,
      template.summary,
      template.description,
      ...template.tags,
    ]
      .join(" ")
      .toLowerCase();
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
