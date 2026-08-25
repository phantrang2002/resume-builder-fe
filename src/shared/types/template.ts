export type ResumeTemplate = {
  id: number;
  key: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  category: string;
  supportedSections: string[];
  sortOrder: number;
};

export type TemplateListFilter = {
  key: string;
  label: string;
  count: number;
};

export type TemplatesData = {
  items: ResumeTemplate[];
  total: number;
  filters: TemplateListFilter[];
};

export type TemplateGalleryNeighbor = {
  id: number;
  key: string;
  name: string;
};

export type TemplateGallery = {
  index: number;
  total: number;
  prev: TemplateGalleryNeighbor | null;
  next: TemplateGalleryNeighbor | null;
};

export type TemplateAtAGlance = {
  layout: string;
  paper: string;
  typeface: string;
  bestLength: string;
  photoSupported: boolean;
};

export type TemplateSectionDetail = {
  type: string;
  label: string;
};

export type TemplateDefaultCustomization = {
  page: {
    format: string;
    marginMm: number;
    supportedFormats: string[];
  };
  fonts: {
    body: string;
    heading: string;
    baseSizePt: number;
  };
  colors: {
    text: string;
    muted: string;
    accent: string;
    primary: string;
  };
  layout: {
    columns: number;
    showPhoto: boolean;
    headerStyle: string;
  };
  spacing: {
    density: string;
    lineHeight: number;
    sectionGapPt: number;
  };
};

export type PersonalInfoPreviewData = {
  email?: string;
  phone?: string;
  github?: string;
  fullName?: string;
  jobTitle?: string;
  location?: string;
};

export type SummaryPreviewData = {
  text?: string;
};

export type WorkExperiencePreviewItem = {
  id: string;
  role: string;
  bullets: string[];
  company: string;
  current: boolean;
  endDate: string | null;
  location: string;
  startDate: string;
};

export type WorkExperiencePreviewData = {
  items: WorkExperiencePreviewItem[];
};

export type ProjectPreviewItem = {
  id: string;
  name: string;
  description: string;
};

export type ProjectsPreviewData = {
  items: ProjectPreviewItem[];
};

export type EducationPreviewItem = {
  id: string;
  gpa?: string;
  degree: string;
  school: string;
  endDate: string;
  startDate: string;
};

export type EducationPreviewData = {
  items: EducationPreviewItem[];
};

export type SkillPreviewItem = {
  name: string;
};

export type SkillPreviewGroup = {
  id: string;
  items: SkillPreviewItem[];
  label: string;
};

export type SkillsPreviewData = {
  groups: SkillPreviewGroup[];
};

export type CertificationPreviewItem = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
};

export type CertificationsPreviewData = {
  items: CertificationPreviewItem[];
};

export type LanguagePreviewItem = {
  id: string;
  name: string;
  proficiency: string;
};

export type LanguagesPreviewData = {
  items: LanguagePreviewItem[];
};

export type TemplatePreviewSection =
  | { type: "PERSONAL_INFO"; position: number; data: PersonalInfoPreviewData }
  | { type: "SUMMARY"; position: number; data: SummaryPreviewData }
  | { type: "WORK_EXPERIENCE"; position: number; data: WorkExperiencePreviewData }
  | { type: "PROJECTS"; position: number; data: ProjectsPreviewData }
  | { type: "EDUCATION"; position: number; data: EducationPreviewData }
  | { type: "SKILLS"; position: number; data: SkillsPreviewData }
  | { type: "CERTIFICATIONS"; position: number; data: CertificationsPreviewData }
  | { type: "LANGUAGES"; position: number; data: LanguagesPreviewData }
  | { type: string; position: number; data: Record<string, unknown> };

export type ResumeTemplateDetail = ResumeTemplate & {
  highlights: string[];
  pageFormats: string[];
  previewSections: TemplatePreviewSection[];
  recommendedFor: string[];
  atAGlance: TemplateAtAGlance;
  defaultCustomization: TemplateDefaultCustomization;
  rendererVersion: number;
  supportedSectionDetails: TemplateSectionDetail[];
  gallery: TemplateGallery;
};
