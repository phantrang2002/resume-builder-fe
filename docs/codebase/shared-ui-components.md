# Shared UI Components

Reusable pieces under `src/components/` used by auth and layout shells.

## Common (`components/common/`)

| Component | Used for |
|-----------|----------|
| `SessionBootstrapGate` | Blocks router until session probe finishes (`Spin` full-screen) |
| `InputField` | Auth form text/password fields with label + error text |
| `SelectField` | Labeled select dropdown with placeholder, hint, error, and chevron |
| `CheckboxField` | Auth form checkboxes (e.g. keep signed in on login UI) |
| `ActionButton` | Primary CTA / submit with loading state |
| `FormAlert` | Inline form-level error banner |
| `AppToast` | Custom toast body (title, description, close) |
| `ToastIcons` | Icons for toast variants |

## Layout (`components/layout/`)

| Component | Used for |
|-----------|----------|
| `AuthPromoPanel` | Left promo column on auth pages (brand, copy, preview image) |
| `Sidebar` | Authenticated nav, tip callout, user profile + logout |

## Page forms (`components/page/`)

| Component | Page |
|-----------|------|
| `LoginForm` | `/login` — Yup validation, inline `FormAlert`, keep-signed-in checkbox (UI state only today) |
| `SignupForm` | `/signup` — Yup validation, first/last name + password strength + confirm match, tips checkbox → `emailFlg` |
| `DashboardEmptyState` | `/dashboard` — empty-state welcome card + create/template CTAs; `isLoading` shows resume-list skeleton |

## Toast wiring

1. `main.tsx` mounts `ToastContainer` and imports `styles/toast.css`.
2. Call sites use `toast.success` / `toast.error` / `toast.info` from `@/shared/helpers/toast`.
3. Helper renders `AppToast` inside react-toastify; do not call `toast` from `react-toastify` directly in feature code.
