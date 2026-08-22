# Auth & Session Flow

Rezum authentication uses **access token in memory + refresh token HttpOnly cookie**.

## Token storage

| Token | Storage | Transport |
|-------|---------|-----------|
| Access | In-memory JS variable (`accessTokenMemory.ts`) | `Authorization: Bearer <token>` |
| Refresh | HttpOnly cookie (set by backend) | Sent automatically via `credentials: "include"` |

Access token is lost on page reload. Session is rebuilt from the refresh cookie at startup.

## Startup bootstrap

`SessionBootstrapGate` wraps the router and blocks rendering until bootstrap completes.

1. If the current path is in `SESSION_PROBE_SKIP_ROUTES` (`/login`, `/signup`, `/forgot-password`, `/reset-password`), skip the probe and mark bootstrapped.
2. Otherwise call `POST /api/auth/refresh` (cookie only) → store new access token in memory.
3. Then call `GET /api/auth/me` → hydrate Redux session via `setSession(profileToSession(...))`.
4. On failure: `clearSession()`; show toast only for non-401 errors.

Implemented in `useSessionBootstrap` + `SessionBootstrapGate`.

## Login

1. `POST /api/auth/login` with email/password.
2. `onQueryStarted` stores access token from response envelope.
3. `GET /api/auth/me` fetches profile into Redux.
4. Navigate to `/dashboard`.

## 401 handling & silent refresh

Two layers handle token expiry:

### RTK Query base query (`baseQuery.ts`)

For non-GET mutations/queries via RTK Query:

1. On 401, skip refresh retry if the failed path is `/api/auth/refresh`.
2. Call `refreshAccessTokenExclusive()` (mutex-protected).
3. Retry the original request once.
4. If retry still 401 → `clearSessionAsExpired()`.

### Direct HTTP client (`client.ts`)

Used by refresh logic and `executeClientRequest`. Attaches Bearer token to non-public paths. Cancels requests when no session and no token (except public paths and bootstrap GET `/api/auth/me`).

## Refresh mutex

`refreshSession.ts` uses an `AsyncMutex` so concurrent 401s trigger only one refresh call. All waiters share the same refresh result.

## Session expiry UX

`clearSessionAsExpired()` only sets `sessionStorage.token_expired` when the user **was** authenticated. This avoids showing "session expired" to first-time visitors on `/login`.

`LoginPage` reads the flag on mount and shows `TOKEN_EXPIRED_MESSAGE` once.

## Logout

1. `POST /api/auth/logout` (clears refresh cookie server-side).
2. Clear access token, Redux session, RTK Query cache.
3. `broadcastLogout()` via `BroadcastChannel` for cross-tab sync.
4. Navigate to `/login`.

`useCrossTabLogout` in `MainLayout` listens for broadcast and clears local state in other tabs.

## Route guards

Pure redirect helpers in `authNavigation.ts`:

| Guard | Rule |
|-------|------|
| Home `/` | Authenticated → dashboard; else login |
| Public routes | Authenticated → dashboard |
| Protected routes | Unauthenticated → login |
| Admin `/admin` | Unauthenticated → login; non-admin → dashboard + error toast |

Role check uses `USER_ROLE.ADMIN` from session.
