# Implementation Plan: Create Resume Wizard (UI-only)

> Created: 2026-08-24 14:00:10

## Purpose / Big Picture

- Empty dashboard CTA **"Create my first resume"** must open a full-page 3-step create wizard matching product mocks (Method → Details → Template), then a fake creating overlay, then a placeholder editor.
- Resume product flows do not exist yet; this establishes the first user-facing create path without backend create APIs.
- Design validated in brainstorm session (Approach A: single route + step state). No brainstorm artifacts folder was written.

## Objective

- Build a protected, sidebar-free create-resume UI wizard at `/resumes/new` with in-memory draft state, mock templates, and navigation to `/resumes/:id/edit` placeholder after a timed mock create sequence.
- Wire `DashboardEmptyState` primary CTA to start the flow.

## Context and Orientation

- Relevant docs loaded:
  - `docs/SUMMARY.md`
  - `docs/codebase/routing-and-layouts.md`
  - `docs/codebase/directory-structure.md`
  - `docs/code-standard/conventions.md`
  - `docs/project-pdr/product-goals.md`
- Relevant files/modules:
  - `src/components/page/dashboard/DashboardEmptyState.tsx` — CTA currently unwired
  - `src/pages/dashboard/page.tsx`
  - `src/app/router/index.tsx` — ProtectedRoute currently always wraps `MainLayout`
  - `src/layouts/MainLayout.tsx` — sidebar shell
  - `src/shared/constants/routes.ts` — `ROUTER_PATH`
  - `src/shared/validations/` — Yup pattern for forms
- Existing patterns to follow:
  - Path alias `@/`
  - Pages under `src/pages/<feature>/`; page UI under `src/components/page/<feature>/`
  - Yup schemas + `validateSync` for forms
  - Tailwind tokens (`primary`, `font-serif`, `pageTitle`, `subtle`, `lightBg`) + Ant Design icons where already used
  - Protected routes via auth selectors / guards
- Constraints, dependencies, and compatibility notes:
  - UI-only: no RTK create endpoints, no persistence
  - Mockups show dedicated wizard chrome (no sidebar) — require a layout path that is protected but not `MainLayout`
  - Editor / PDF remain out of product scope; editor route is a stub only

## Scope

### In scope

- Route `/resumes/new` with `CreateResumeLayout` (auth-protected, no sidebar)
- Wizard steps: Method, Details, Template gallery, Template preview mode
- Fake creating overlay with staged progress
- Placeholder editor route `/resumes/:id/edit`
- Wire dashboard **"Create my first resume"** → `/resumes/new`
- Mock template catalog (~8 items) and local draft context
- Yup validation for Details required fields

### Out of scope

- Real create/list resume APIs and RTK Query endpoints
- Real resume editor, autosave, PDF export
- Import-resume implementation (keep disabled / Coming soon)
- Wiring **"See the templates"** secondary CTA (unless trivially redirecting to step 3 later — not required)
- Persisting draft across refresh / sessionStorage
- i18n, unit/E2E test suite additions (manual verification only)
- Updating product docs beyond this plan folder (optional follow-up)

## Architecture & Approach

- **Approach A (approved):** single route `/resumes/new` + local step/view state (React context), not multi-route wizard.
- **Protected shell split:** introduce a protected outlet that does **not** force `MainLayout`, e.g. `ProtectedRoute` renders `<Outlet />` only, then nest:
  - `MainLayout` routes: dashboard, admin
  - `CreateResumeLayout` routes: `/resumes/new`
  - Optional minimal layout for editor placeholder (or reuse a thin chrome layout)
- **Draft model:** `method`, `name`, `targetJobTitle`, `experienceLevel`, `industry`, `templateId`, `step`, `view` (`wizard` | `preview`)
- **Method paths:** Scratch and Template both continue to Details → Template; Import disabled
- **Create:** timed mock stages → `crypto.randomUUID()` (or similar) id → `navigate(/resumes/:id/edit)`; optional `location.state` with draft snapshot
- Prefer existing brand tokens over inventing a new palette; approximate mocks with Tailwind

## Progress

- [x] Plan approved for execution.
- [x] Phase 1 complete — 2026-08-24 14:03:51 → verified typecheck exit 0, lint exit 0 (after installing missing `typescript-eslint`). Files: routes, router, CreateResumeLayout, create/edit pages, DashboardEmptyState CTA.
- [x] Phase 2 complete — 2026-08-24 14:13:50 → 14:19:45. typecheck exit 0, lint exit 0 (1 react-refresh warning on context export). Manual: Method → Details → Template → Preview implemented; Import disabled; Yup gates Details; create click stubbed for Phase 3.
- [x] Phase 3 complete — 2026-08-24 14:19:45 → 14:21:37. Overlay + editor handoff; typecheck/lint exit 0; build exit 0 with `VITE_API_URL` set.
- [x] Final verification complete — automated checks green; manual QA awaiting user gate.

## Phases

- [x] **Phase 1 [M]: Shell, routes, and entry wiring** — Protected non-sidebar layout, routes, empty draft page, CTA navigation
- [x] **Phase 2 [L]: Wizard steps UI** — Method, Details, Template gallery + preview matching mocks
- [x] **Phase 3 [M]: Creating overlay, editor stub, polish** — Fake create sequence, placeholder editor, responsive/footer polish, full manual pass

## Key Changes

- Files/modules likely to change / add:
  - `src/shared/constants/routes.ts`
  - `src/app/router/index.tsx`
  - `src/layouts/CreateResumeLayout.tsx` (new)
  - `src/pages/resumes/new/page.tsx` (or `CreateResumePage.tsx`) (new)
  - `src/pages/resumes/edit/page.tsx` (placeholder) (new)
  - `src/components/page/create-resume/*` (steps, overlay, shared chrome pieces) (new)
  - `src/shared/validations/create-resume.schema.ts` (new)
  - `src/shared/constants/mock-templates.ts` (or under create-resume feature) (new)
  - `src/components/page/dashboard/DashboardEmptyState.tsx`
- Data/API/schema impacts: none (mock only)

## Validation and Acceptance

- Commands:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build` (optional final gate)
- Manual checks: full flow from empty dashboard through create overlay to editor stub; Cancel/Back; Import disabled; auth guard
- Observable acceptance criteria:
  - CTA opens wizard
  - Steps match Method → Details → Template (+ preview mode)
  - Create overlay completes and lands on placeholder editor
  - No real network create calls required

## Idempotence and Recovery

- Safe re-run notes: all phases are additive UI; re-running a phase should overwrite the same files without data migration
- Rollback/recovery notes: revert the branch / delete new route files; dashboard CTA can be re-disabled by removing `navigate`
- Irreversible operations or destructive steps: none

## Dependencies

- No new packages required (React Router, Yup, Ant Design icons, Tailwind already present)

## Risks & Mitigations

- Router refactor for non-sidebar protected pages could break dashboard/admin → keep MainLayout nested under the same auth check; verify both paths
- Mock fidelity vs tokens → match structure/copy from mocks first; use `primary` / serif headings; placeholders for thumbnails OK
- Large Phase 2 UI surface → implement step-by-step with per-step smoke checks before overlay
- Refresh loses draft → accepted for UI-only; document in UI only if needed (no persistence work)

## Surprises & Discoveries

- 2026-08-24 14:03 — `npm run lint` fails with `Cannot find package 'typescript-eslint'` even though `@typescript-eslint/*` is listed. `eslint.config.js` imports the unified `typescript-eslint` package, which was not installed. Installing it as a devDependency to unblock plan verification.
- 2026-08-24 14:21 — `npm run build` requires `VITE_API_URL` (no `.env` in workspace). Verified with `VITE_API_URL=http://localhost:8888`.

## Decision Log

- 2026-08-24 13:52 — Decision: UI wizard only (no create API). Rationale: backend/product not ready; establish UX first.
- 2026-08-24 13:54 — Decision: Approach A single route + step state. Rationale: simplest draft handling; matches mock chrome.
- 2026-08-24 13:55 — Decision: Scratch and Template both go Details → Template; Import disabled. Rationale: aligned with mock copy and Coming soon badge.
- 2026-08-24 14:00 — Decision: Write execution plan immediately (skip brainstorm artifacts). Rationale: design already validated in session.
- 2026-08-24 14:12 — Decision: Add missing `typescript-eslint` devDependency so `npm run lint` matches `eslint.config.js`. Rationale: pre-existing gap blocked plan verification; not a product-scope change.

## Outcomes & Retrospective

- **Result:** Completed with follow-ups (manual QA pending).
- **Verification:** typecheck ✅, lint ✅ (1 warning), build ✅ (with `VITE_API_URL`).
- **Deviations:** Installed `typescript-eslint`; build env var for local verify.
- **Follow-ups:** User manual checklist; optional templates CTA / URL sync / sessionStorage; real API/editor later.
- **Report:** `docs/.plans/260824-1400-create-resume-wizard/EXECUTION-REPORT.md`

## Open Questions

- None blocking execution. Optional later: wire **"See the templates"**; sync step in URL query; sessionStorage draft.
