# Product Goals

## Purpose

**Rezum** is a resume-builder frontend (repo: `resume-builder-fe`) backed by an Express API. The current codebase ships a production-ready auth foundation and branded auth UI; resume editing features are not implemented yet.

## Target users

- **End users** — staff and admin accounts who sign in to access a dashboard and role-gated areas (resume product flows TBD).
- **Developers** — teams extending the app with resume features, pages, and API endpoints on top of the auth shell.

## Core capabilities (implemented)

1. **Authentication** — login, signup, logout with secure token handling and branded auth layout.
2. **Session persistence** — silent re-auth on page reload via HttpOnly refresh cookie.
3. **Password recovery** — forgot-password email request and reset-password with code.
4. **Role-based access** — ADMIN vs STAFF roles; admin-only route example at `/admin`.
5. **Multi-tab consistency** — logout in one tab clears session in all tabs.
6. **Feedback UX** — custom toast system and inline login form errors.

## Design constraints

- Access token never persisted to localStorage/sessionStorage (memory only).
- Refresh token never accessible to JavaScript (HttpOnly cookie).
- Backend owns cookie issuance and revocation.
- Frontend assumes standard API envelope format (`status`, `message`, `code`, `data`).

## Out of scope (current codebase)

- Resume editor, templates, and PDF export (promo copy on auth pages only)
- User profile editing UI
- Admin user management
- Feature modules beyond dashboard placeholder
- Wired "keep signed in" persistence (checkbox is UI-only on login)
- i18n / localization
- Unit or E2E test suite

These are expected to be added as the product grows.

## Success criteria (auth foundation)

A developer can clone the repo, point at a compatible backend, log in, reload the page without re-entering credentials, and extend routing/layouts following existing patterns.
