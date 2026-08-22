# Auth Use Cases

Business rules inferred from current implementation. Confirm with product/backend owners if requirements differ.

## UC-1: Login

**Actor:** Unauthenticated user

**Flow:**

1. User enters email and password on `/login`.
2. Client validates with Yup (`loginSchema`).
3. `POST /api/auth/login` → access token stored in memory, refresh cookie set by server.
4. `GET /api/auth/me` → profile stored in Redux session.
5. Redirect to `/dashboard`.

**Rules:**

- Invalid credentials show an inline `FormAlert` on the login form (and password field error); global API error toast middleware still applies to other RTK failures.
- "Keep me signed in" is present in the UI but is not sent to the API yet.
- Authenticated users visiting `/login` are redirected to `/dashboard`.

## UC-2: Sign up

**Actor:** New user

**Flow:**

1. User fills email, password, first name, last name on `/signup`.
2. Client validates with `signupSchema` (password min 8 chars).
3. `POST /api/auth/signup` creates account and profile.
4. On success, user is typically directed to login (page handles navigation).

**Rules:**

- Password minimum length: 8 characters.
- Email format validated client-side.

## UC-3: Session restore (page reload)

**Actor:** Returning user with valid refresh cookie

**Flow:**

1. App loads → `SessionBootstrapGate` shows spinner.
2. `POST /api/auth/refresh` using cookie → new access token in memory.
3. `GET /api/auth/me` → Redux session restored.
4. User lands on intended protected route.

**Skip paths:** `/login`, `/signup`, `/forgot-password`, `/reset-password` skip the probe.

**Failure:** Session cleared silently (401) or error toast (other errors). User redirected to login when accessing protected routes.

## UC-4: Token expiry during use

**Actor:** Authenticated user

**Flow:**

1. API request returns 401.
2. Client attempts silent refresh (mutex ensures single refresh).
3. On success: retry original request.
4. On failure: clear session, set `token_expired` flag if user was authenticated.
5. Next visit to `/login` shows "Your session has expired" toast once.

## UC-5: Logout

**Actor:** Authenticated user

**Flow:**

1. User triggers logout from header.
2. `POST /api/auth/logout` clears server cookie.
3. Client clears access token, Redux session, RTK cache.
4. Broadcast logout to other tabs.
5. Redirect to `/login`; show server success message if returned.

**Rules:**

- Local session is always cleared even if server logout fails.

## UC-6: Forgot password

**Actor:** User who forgot password

**Flow:**

1. User submits email on `/forgot-password`.
2. `POST /api/auth/forgot-password`.
3. Backend sends reset email (out of frontend scope).

## UC-7: Reset password

**Actor:** User with reset link

**Flow:**

1. User opens `/reset-password?code=...`.
2. Enters new password and confirmation.
3. Client validates match via `resetPasswordSchema`.
4. `POST /api/auth/reset-password` with code and passwords.

## UC-8: Admin-only access

**Actor:** User with role ADMIN or STAFF

**Rules:**

- `/admin` requires `role === "ADMIN"`.
- STAFF users redirected to `/dashboard` with "You do not have permission" toast.
- Unauthenticated users redirected to `/login`.

## User roles

| Role | Access |
|------|--------|
| `ADMIN` | Dashboard + `/admin` |
| `STAFF` | Dashboard only |

Roles come from profile API and are stored in Redux session.
