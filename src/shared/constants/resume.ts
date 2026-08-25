export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: "intern", label: "Intern" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
] as const;

export const EXPERIENCE_LEVEL_API_MAP = {
  intern: "INTERN",
  junior: "JUNIOR",
  mid: "MID",
  senior: "SENIOR",
} as const;
