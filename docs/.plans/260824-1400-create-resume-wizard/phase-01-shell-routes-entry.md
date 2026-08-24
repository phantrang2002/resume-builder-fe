# Phase 01: Shell, routes, and entry wiring

## Objective

- Introduce protected create-resume routing without MainLayout sidebar, a thin `CreateResumeLayout` + empty wizard page shell, placeholder editor route stub, and wire the empty-dashboard primary CTA to `/resumes/new`.

## Scope

- Files/modules this phase may touch:
  - `src/shared/constants/routes.ts`
  - `src/shared/constants/index.ts` (if re-exports need update)
  - `src/app/router/index.tsx`
  - `src/layouts/CreateResumeLayout.tsx` (new)
  - `src/pages/resumes/new/page.tsx` (new) — minimal shell only
  - `src/pages/resumes/edit/page.tsx` (new) — minimal placeholder OK to stub early
  - `src/components/page/dashboard/DashboardEmptyState.tsx`
  - Optional: `src/components/page/create-resume/CreateResumeDraftContext.tsx` (empty provider)
- Files/modules this phase must not touch:
  - Auth API / Redux auth slice
  - Full Method/Details/Template step UIs (Phase 2)
  - Creating overlay animation (Phase 3)

## Preconditions

- User is authenticated for protected routes (existing session bootstrap).
- Dashboard empty state exists with unwired **"Create my first resume"** button.

## Tasks

1. Context: inspect `src/app/router/index.tsx`, `MainLayout`, `ROUTER_PATH`, `DashboardEmptyState`.
2. Implement:
   - Add `RESUMES_NEW: "/resumes/new"` and `RESUME_EDIT: "/resumes/:id/edit"` (or helper builder) to `ROUTER_PATH`.
   - Refactor protected routing so auth guard wraps an `<Outlet />`, then nest:
     - `<Route element={<MainLayout />}>` → dashboard + admin
     - `<Route element={<CreateResumeLayout />}>` → `/resumes/new`
     - Editor page can use a minimal layout (CreateResumeLayout without stepper, or a tiny `BareProtectedLayout`) — prefer one thin shared shell if it keeps code smaller.
   - `CreateResumeLayout`: full-height `lightBg`, header slots (logo/title/Cancel placeholder), `<Outlet />` or children from page; call `useCrossTabLogout()` like MainLayout.
   - `CreateResumePage`: render stepper chrome placeholders + "Step 1" stub content so the route is visibly distinct from dashboard.
   - `ResumeEditorPlaceholderPage`: title + short “editor coming soon” copy; show `:id` from params.
   - Wire CTA: `useNavigate()` → `ROUTER_PATH.RESUMES_NEW` on **"Create my first resume"**.
3. Verify: `npm run typecheck`; manually open `/dashboard` → click CTA → see `/resumes/new`; Cancel can temporarily `navigate(DASHBOARD)` if header Cancel is present.
4. Confirm: sidebar absent on create route; dashboard still has sidebar; unauthenticated visit redirects to login.

## Acceptance Criteria

- User-visible or system-observable result:
  - CTA navigates to create route
  - Create route is protected and sidebar-free
  - Editor route URL resolves to placeholder page
- Required changed files: routes + router + new layout/pages + dashboard CTA
- Required unchanged behavior: login/logout, dashboard empty content (except CTA), admin route still works under MainLayout

## Verification

- Commands:
  - `npm run typecheck`
  - `npm run lint`
- Expected results:
  - No TS/ESLint errors from new files
- Evidence to record in `SUMMARY.md`:
  - typecheck/lint exit codes
  - Manual: CTA → `/resumes/new` without sidebar

## Idempotence and Recovery

- Safe to re-run: yes — re-apply same route/layout files
- Recovery if interrupted: ensure router still mounts dashboard under MainLayout before continuing
- Rollback notes: remove new routes and restore previous `ProtectedRoute` → `MainLayout` pattern; unlink CTA

## Exit Criteria

- [ ] `ROUTER_PATH` includes create + edit paths
- [ ] Protected non-sidebar layout works for `/resumes/new`
- [ ] Dashboard CTA navigates correctly
- [ ] `npm run typecheck` passes
- [ ] Phase marked complete in plan `SUMMARY.md` Progress/Phases
