# Directory Structure

## Entry points

| File | Role |
|------|------|
| `index.html` | Vite HTML shell |
| `src/main.tsx` | React root, `ToastContainer`, global + toast CSS |
| `src/app/App.tsx` | Redux Provider, Ant Design theme, router shell |

## `src/` layout

```
src/
├── app/                    # Application shell
│   ├── App.tsx
│   ├── router/             # Route definitions & guards
│   ├── store/              # Redux store, hooks, root reducer, API error middleware
│   ├── features/           # Redux slices (auth)
│   └── middleware/         # Pure redirect helpers (authNavigation)
├── assets/images/          # Static images (e.g. auth resume preview)
├── components/
│   ├── common/             # Form controls, toasts, SessionBootstrapGate
│   ├── layout/             # Sidebar, AuthPromoPanel
│   └── page/               # Page-specific forms (login, signup)
├── hooks/auth/             # useLogin, useLogout, useSignup, session bootstrap
├── layouts/                # AuthLayout, MainLayout
├── pages/                  # Route page components
├── services/
│   ├── api/                # RTK Query (appApi, authApi, baseQuery, refreshSession)
│   └── http/               # fetch client, executeClientRequest
├── shared/
│   ├── constants/          # API endpoints, routes, storage keys
│   ├── helpers/            # API helpers, token memory, toast wrapper
│   ├── types/              # Shared TypeScript types
│   └── validations/        # Yup schemas
└── styles/                 # Tailwind entry (`index.css`) + toast styles
```

## Key modules

| Module | Responsibility |
|--------|----------------|
| `app/features/auth/` | Session state, selectors, `profileToSession` mapper |
| `services/api/baseQuery.ts` | RTK Query base query with 401 refresh retry |
| `services/api/refreshSession.ts` | Mutex-protected refresh, session expiry cleanup |
| `services/http/client.ts` | Fetch wrapper, auth headers, envelope validation |
| `shared/helpers/accessTokenMemory.ts` | In-memory access token get/set/clear |
| `shared/helpers/toast.tsx` | App toast API wrapping `react-toastify` + `AppToast` |
| `shared/constants/api.ts` | Endpoint paths, public path list, HTTP constants |
| `shared/constants/routes.ts` | Route paths, role constants, user-facing messages |
| `shared/constants/storage.ts` | Storage / BroadcastChannel key prefix (`rezum`) |

## Path alias

`@/*` maps to `src/*` (configured in `tsconfig.json` and `vite.config.ts`).

## Config files (repo root)

| File | Purpose |
|------|---------|
| `vite.config.ts` | Dev server, proxy, `@` alias, build env validation |
| `tsconfig.json` | Strict TypeScript, path aliases |
| `tailwind.config.ts` | Brand/auth palette (`primary`, `authNavy`, form/error tokens) + `fontFamily.serif` |
| `eslint.config.js` | TypeScript ESLint + React hooks rules |
| `.env.example` | Environment variable template |
