# Environment Setup

## Prerequisites

- Node.js (compatible with Vite 6)
- Express backend running (default `http://localhost:8888`)
- Backend CORS configured with `CORS_ORIGIN=http://localhost:3000`

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Dev server runs at `http://localhost:3000`.

## Environment variables

Copy `.env.example` to `.env`:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_APP_NAME` | No | Browser tab title (default / example: `Rezum`) |
| `VITE_API_URL` | Build only | Full API base URL for production (e.g. `https://api.example.com`) |
| `VITE_DEV_API_TARGET` | Dev | Backend origin for Vite proxy (e.g. `http://localhost:8888`) |

### Dev vs production behavior

**Development** (`npm run dev`):

- `VITE_API_URL` can be empty — requests go to same origin (`localhost:3000/api/...`).
- Vite proxies `/api` to `VITE_DEV_API_TARGET`.
- Proxy rewrites cookies so HttpOnly refresh tokens work on localhost.

**Production** (`npm run build`):

- `VITE_API_URL` **must** be set or the build throws an error.
- No proxy — the built app calls the API URL directly.
- Backend must set CORS and cookies for the production frontend origin.

## NPM scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Dev server with hot reload |
| `build` | `typecheck && vite build` | TypeScript check + production bundle |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Lint all TS/TSX files |
| `typecheck` | `tsc --noEmit` (app + node configs) | TypeScript validation |

## Backend requirements

The frontend expects these auth endpoints (all under `/api/`):

- `POST auth/login`
- `POST auth/signup`
- `POST auth/refresh` — reads refresh cookie, returns new access token
- `POST auth/logout` — clears refresh cookie
- `GET auth/me` — returns user profile
- `POST auth/forgot-password`
- `POST auth/reset-password`

Login/refresh responses must include `data.token.access`. Profile response must match `UserProfile` type in `shared/types`.
