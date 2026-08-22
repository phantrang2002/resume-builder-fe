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
| `/404` | Any | — | NotFoundPage |
| `*` | Any | — | Redirect to `/404` |

## Layout components

### AuthLayout

Two-column auth shell for login, signup, and password flows:

- Left (desktop only): `AuthPromoPanel` — Rezum branding, resume preview image, feature bullets.
- Right: centered form column (`max-w-[420px]`) on white background.

### MainLayout

Authenticated shell with:

- `Sidebar` — navigation
- `Header` — user info, logout
- `<Outlet />` — nested route content on `lightBg` background
- `useCrossTabLogout()` — sync logout across browser tabs

## Route guard pattern

Guards are implemented as wrapper components in `src/app/router/index.tsx`, using pure functions from `authNavigation.ts`:

- `HomeRedirect` — `/` → dashboard or login
- `PublicRoute` — redirects authenticated users away from auth pages
- `ProtectedRoute` — wraps MainLayout; redirects unauthenticated to login
- `AdminProtectedRoute` — nested guard; non-admins redirected to dashboard with toast

Authentication state comes from Redux: `selectIsAuthenticated`, `selectIsAdmin`.

## Session bootstrap interaction

Public auth pages skip the refresh/profile probe (`SESSION_PROBE_SKIP_ROUTES`) so unauthenticated users are not blocked by a loading spinner on first visit.

Protected pages wait for bootstrap via `SessionBootstrapGate` before the router renders.

## Adding a new route

1. Add path to `ROUTER_PATH` in `shared/constants/routes.ts`.
2. Create page under `src/pages/`.
3. Register in `src/app/router/index.tsx` under the appropriate guard (PublicRoute, ProtectedRoute, or AdminProtectedRoute).
4. If the page needs sidebar navigation, update `Sidebar.tsx`.
