# Rezum

Resume-builder frontend using **Access token in memory + Refresh token HttpOnly cookie** (auth foundation first; resume editor TBD).

📖 **Documentation:** [docs/SUMMARY.md](docs/SUMMARY.md)

## Tech stack

- React 19 + Vite 6 + TypeScript
- Redux Toolkit + RTK Query
- React Router v6
- Ant Design 6 + Tailwind CSS
- Yup validation + react-toastify (custom `AppToast`)

## Authentication

| Token | Storage | Transport |
|-------|---------|-----------|
| **Access** | In-memory (JS) | `Authorization: Bearer <token>` |
| **Refresh** | HttpOnly cookie | Sent automatically with `credentials: "include"` |

### Flow

1. **Login** — `POST /api/auth/login` → access token in JSON + refresh cookie → fetch profile → `/dashboard`
2. **Reload** — access token lost from memory → `POST /api/auth/refresh` (cookie) → new access token → `GET /api/auth/me`
3. **401** — auto refresh via cookie → retry request; if refresh fails → redirect login
4. **Logout** — `POST /api/auth/logout` clears refresh cookie + client clears access token & session

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Ensure the Express backend is running on `http://localhost:8888` with `CORS_ORIGIN=http://localhost:3000`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server (proxies `/api` with cookie rewrite) |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/login` | Public | Login page |
| `/signup` | Public | Sign up page |
| `/forgot-password` | Public | Request password reset email |
| `/reset-password?code=...` | Public | Reset password |
| `/dashboard` | Protected | User dashboard |
| `/admin` | Admin only | Example admin route |
