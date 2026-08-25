# Phase 02: Wizard steps UI

## Objective

- Implement Method, Details, and Template (gallery + preview) steps on `/resumes/new` with in-memory draft context, Yup validation, and mock template data, aligned to the provided UI mocks.

## Scope

- Files/modules this phase may touch:
  - `src/pages/resumes/new/page.tsx` (orchestrator)
  - `src/components/page/create-resume/**` (new step components, shared header/footer/stepper)
  - `src/layouts/CreateResumeLayout.tsx` (complete chrome if deferred from Phase 1)
  - `src/shared/validations/create-resume.schema.ts` (new)
  - `src/shared/constants/mock-templates.ts` or `src/components/page/create-resume/mockTemplates.ts` (new)
  - Optional helpers for experience/industry option lists
- Files/modules this phase must not touch:
  - Creating overlay / fake API timing (Phase 3)
  - Real RTK/API modules
  - Unrelated auth/dashboard styling beyond CTA already wired

## Preconditions

- Phase 1 complete: `/resumes/new` reachable, layout shell exists, CTA works.

## Tasks

1. Context: re-read mock screenshots under Cursor assets if needed; inspect existing form primitives (`InputField`, etc.) and decide reuse vs local fields for segmented control / select.
2. Implement draft context:
   - Types: `CreateMethod`, `ExperienceLevel`, `CreateResumeDraft`
   - Actions: set method, patch details, set template, set step, set view (`wizard` | `preview`)
   - Provider wraps create page
3. Implement **Method step**:
   - Three cards: Scratch, Template (Recommended), Import (Coming soon, disabled)
   - Selection + Continue requires scratch|template
   - When Template selected, optional teaser block “TEMPLATES YOU CAN PICK FROM” with 3 mock thumbs + ATS note
   - Info banner copy from mock
4. Implement **Details step**:
   - Fields: resume name, target job title, optional experience segmented control, optional industry select
   - Yup schema: name + targetJobTitle required
   - Helper text and info note per mock
   - Back → step 1; Continue validates then → step 3
5. Implement **Template step**:
   - Search input + filter pills (All / Modern / Minimal / Classic / ATS-friendly)
   - Grid of ~8 mock templates with select state, tags, Preview link
   - Hover actions: Preview / Use this template (desktop)
   - Footer: Back, step label, Preview selected (secondary), Create resume (primary) — Create may be disabled until template selected; primary click can be wired in Phase 3 if overlay not ready (button present, handler stub OK only if documented — prefer wiring selection fully here and leave create handler for Phase 3)
6. Implement **Template preview view** (`view === "preview"`):
   - Left: large preview placeholder + prev/next template controls
   - Right: name, tags, description, recommended-for, at-a-glance, sections, Use this template, Back to gallery
7. Shared chrome:
   - Stepper states (current / complete / upcoming)
   - Header title: “New resume” early; show draft name on later steps when available
   - Cancel → dashboard (discard)
   - Sticky/footer actions consistent with mocks
8. Verify: typecheck/lint; manual walk Method → Details → Template → Preview → Back to gallery
9. Confirm: Import cannot be selected; Continue gates work; filters/search reduce grid

## Acceptance Criteria

- User-visible or system-observable result:
  - All three steps usable with mock data
  - Preview mode toggles without leaving `/resumes/new`
  - Draft fields persist while navigating Back/Continue within the session
- Required changed files: create-resume components + schema + mock templates + page orchestrator
- Required unchanged behavior: Phase 1 routing/auth; no create API calls

## Verification

- Commands:
  - `npm run typecheck`
  - `npm run lint`
- Expected results:
  - Clean compile; wizard steps render without runtime errors
- Evidence to record in `SUMMARY.md`:
  - Manual checklist results for steps 1–3 and preview
  - typecheck/lint exit codes

## Idempotence and Recovery

- Safe to re-run: yes — component files can be rewritten
- Recovery if interrupted: keep context + Method complete before Details/Template to avoid half-wired Continue buttons
- Rollback notes: revert `components/page/create-resume` and restore Phase 1 stub page

## Exit Criteria

- [ ] Method / Details / Template / Preview UIs implemented
- [ ] Draft context holds selections across steps
- [ ] Details validation blocks invalid Continue
- [ ] Import remains disabled
- [ ] `npm run typecheck` passes
- [ ] Phase marked complete in plan `SUMMARY.md`
