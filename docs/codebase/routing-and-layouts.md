# Routing & Layouts

Route constants live in `src/shared/constants/routes.ts` as `ROUTER_PATH`.

## Route table

| Path | Access | Layout | Page |
|------|--------|--------|------|
| `/` | Any | — | Redirect to dashboard or login |
| `/login` | Public | AuthLayout | LoginPage |
| `/signup` | Public | AuthLayout | SignupPage |
| `/forgot-password` | Public | AuthLayout | ForgotPasswordPage |
| `/reset-password` | Public | AuthLayout | ResetPasswordPage |
| `/dashboard` | Protected | MainLayout | DashboardPage |
| `/admin` | Admin only | MainLayout | AdminOnlyPage (inline) |
| `/resumes/new` | Protected | CreateResumeLayout | CreateResumePage |
| `/resumes/:id/edit` | Protected | CreateResumeLayout | ResumeEditorPlaceholderPage |
| `/404` | Any | — | NotFoundPage |
| `*` | Any | — | Redirect to `/404` |

Helper: `resumeEditPath(id)` builds `/resumes/:id/edit`.

## Layout components

### AuthLayout

Two-column auth shell for login, signup, and password flows:

- Left (desktop only): `AuthPromoPanel` — Rezum branding, resume preview image, feature bullets.
- Right: centered form column (`max-w-[420px]`) on white background.

### MainLayout

Authenticated shell with:

- `Sidebar` — brand, navigation, tip callout, settings, user profile + logout menu
- `<Outlet />` — nested route content on `lightBg` background (no top header bar)
- `useCrossTabLogout()` — sync logout across browser tabs

### CreateResumeLayout

Protected shell **without** sidebar for create/editor flows:

- Full-height `lightBg` + `<Outlet />`
- `useCrossTabLogout()` — same cross-tab logout sync as MainLayout
- Page-level chrome (header, stepper, footer) lives in create-resume page components

## Route guard pattern

Guards are implemented as wrapper components in `src/app/router/index.tsx`, using pure functions from `authNavigation.ts`:

- `HomeRedirect` — `/` → dashboard or login
- `PublicRoute` — redirects authenticated users away from auth pages
- `ProtectedRoute` — auth check only; renders `<Outlet />` (layouts nested underneath)
- `AdminProtectedRoute` — nested guard; non-admins redirected to dashboard with toast

Under `ProtectedRoute`:

- `MainLayout` — dashboard + admin
- `CreateResumeLayout` — `/resumes/new` and `/resumes/:id/edit`

Authentication state comes from Redux: `selectIsAuthenticated`, `selectIsAdmin`.

## Session bootstrap interaction

Public auth pages skip the refresh/profile probe (`SESSION_PROBE_SKIP_ROUTES`) so unauthenticated users are not blocked by a loading spinner on first visit.

Protected pages wait for bootstrap via `SessionBootstrapGate` before the router renders.

## Adding a new route

1. Add path to `ROUTER_PATH` in `shared/constants/routes.ts`.
2. Create page under `src/pages/`.
3. Register in `src/app/router/index.tsx` under the appropriate guard and layout (`MainLayout` for sidebar pages, `CreateResumeLayout` for sidebar-free product flows).
4. If the page needs sidebar navigation, update `Sidebar.tsx`.
