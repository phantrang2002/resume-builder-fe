# Product Goals

## Purpose

**Codebase FE React** is a frontend scaffold for building authenticated web applications against an Express backend. It provides a production-ready auth foundation so feature teams can add business pages without reimplementing session management.

## Target users

- **End users** — staff and admin accounts who sign in to access a dashboard and role-gated areas.
- **Developers** — teams extending the scaffold with new pages, API endpoints, and features.

## Core capabilities (implemented)

1. **Authentication** — login, signup, logout with secure token handling.
2. **Session persistence** — silent re-auth on page reload via HttpOnly refresh cookie.
3. **Password recovery** — forgot-password email request and reset-password with code.
4. **Role-based access** — ADMIN vs STAFF roles; admin-only route example at `/admin`.
5. **Multi-tab consistency** — logout in one tab clears session in all tabs.

## Design constraints

- Access token never persisted to localStorage/sessionStorage (memory only).
- Refresh token never accessible to JavaScript (HttpOnly cookie).
- Backend owns cookie issuance and revocation.
- Frontend assumes standard API envelope format (`status`, `message`, `code`, `data`).

## Out of scope (current scaffold)

- User profile editing UI
- Admin user management
- Feature modules beyond dashboard placeholder
- i18n / localization
- Unit or E2E test suite

These are expected to be added as the product grows.

## Success criteria for the scaffold

A developer can clone the repo, point at a compatible backend, log in, reload the page without re-entering credentials, and extend routing/layouts following existing patterns.
