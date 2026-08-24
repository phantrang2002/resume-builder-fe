# API Integration

## Backend contract

All API paths are prefixed with `api/` (see `buildApiPath`). Responses use a standard envelope:

```ts
{
  status: "success" | "failed" | "error";
  message: string;
  code: number;
  data?: T;
}
```

The HTTP client treats `status !== "success"` on 2xx as an error and throws `HttpError` with the envelope message.

## HTTP client layer

`src/services/http/client.ts` — low-level `fetch` wrapper:

- Base URL from `VITE_API_URL` (empty in dev → same-origin via Vite proxy).
- Always sends `credentials: "include"` for cookies.
- Attaches `Authorization: Bearer` for non-public paths when access token exists.
- 30s default timeout with abort.
- Public paths (no Bearer required): login, refresh, logout, signup, forgot-password, reset-password.

`executeClientRequest.ts` maps HTTP methods to client calls; used by RTK Query base query.

## RTK Query layer

`appApi` — empty shell created with `createApi` and `appBaseQuery`.

`authApi.ts` — injects auth endpoints via `injectEndpoints`:

| Endpoint | Method | Path |
|----------|--------|------|
| login | POST | `auth/login` |
| signup | POST | `auth/signup` |
| refreshToken | POST | `auth/refresh` |
| logout | POST | `auth/logout` |
| getProfile | GET | `auth/me` |
| forgotPassword | POST | `auth/forgot-password` |
| resetPassword | POST | `auth/reset-password` |

Profile query provides tag `["Profile"]` and syncs Redux session in `onQueryStarted`.

## Errors & toasts

- **RTK Query errors**: `apiErrorListenerMiddleware` in the store shows `toast.error(...)` for rejected RTK Query actions, except 401 (handled by auth flow) and `login` (inline `FormAlert` only).
- **Toast API**: use `toast` from `@/shared/helpers/toast` (`success` | `error` | `info`). Renders custom `AppToast` via `react-toastify` (`ToastContainer` in `main.tsx`, styles in `styles/toast.css`).
- **Non-RTK errors**: call `showRequestErrorToast()` (e.g. session bootstrap failures).
- **Login form**: auth failures are shown inline via `FormAlert` / field errors only — no error toast.

## Dev proxy (Vite)

When `VITE_DEV_API_TARGET` is set and running `vite` dev server:

- `/api/*` proxies to the backend (default `http://localhost:8888`).
- Rewrites `Set-Cookie`: strips `Secure`, sets `SameSite=Lax` so HttpOnly refresh cookies work on `localhost:3000`.

Production builds **require** `VITE_API_URL` — the build fails if unset because there is no dev proxy.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_APP_NAME` | Document title (default: "Rezum") |
| `VITE_API_URL` | API base URL for production / direct requests |
| `VITE_DEV_API_TARGET` | Backend origin for dev proxy only |
