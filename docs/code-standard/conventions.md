# Coding Conventions

## Language & tooling

- **TypeScript** strict mode (`noUnusedLocals`, `noUnusedParameters`).
- **ESLint** flat config with `@typescript-eslint` and `eslint-plugin-react-hooks`.
- **Path alias**: import from `@/...` instead of relative paths crossing module boundaries.

## File & folder naming

| Area | Convention | Example |
|------|------------|---------|
| Pages | `src/pages/<feature>/` + `*Page.tsx` or `page.tsx` | `LoginPage.tsx`, `dashboard/page.tsx` |
| Page forms | `src/components/page/<feature>/` | `LoginForm.tsx` |
| Layouts | `src/layouts/` | `MainLayout.tsx` |
| Hooks | `src/hooks/<domain>/use*.ts` | `useLogin.ts` |
| Redux slices | `src/app/features/<name>/` | `authSlice.ts`, `authSelector.ts` |
| API | `src/services/api/` | `authApi.ts` (injected endpoints) |
| Constants | `src/shared/constants/` | Grouped by domain, re-exported from `index.ts` |
| Validations | `src/shared/validations/*.schema.ts` | `auth.schema.ts` |

## Component patterns

### Page vs form separation

Pages orchestrate hooks and navigation; forms handle local state and Yup validation.

```tsx
// Page: hook + submit handler
const { login, loading } = useLogin();
const onSubmit = async (validated) => { await login(validated); };

// Form: controlled inputs, validateSync, field errors
```

### Form validation

- Schemas in `shared/validations/` using Yup.
- Validate with `schema.validateSync(form, { abortEarly: false })`.
- Map errors via `yupErrorsToRecord()`.
- Clear individual field errors on input change.

### Default exports

Default export for page, layout, and hook modules. Named exports for selectors, actions, types, and utility functions.

## State management

| Concern | Location |
|---------|----------|
| Auth session | Redux `auth` slice |
| API data | RTK Query (`appApi` + injected endpoints) |
| Global loading | Redux `ui` slice (non-GET requests only) |
| Access token | Module-level memory (`accessTokenMemory.ts`), not Redux |

Do not store the access token in Redux or localStorage.

## API & error handling

- Define endpoints in `shared/constants/api.ts` as `API_ENDPOINT.*`.
- Use RTK Query mutations/queries from `authApi` hooks in feature hooks.
- Let `apiErrorListenerMiddleware` show toast for RTK errors; pages catch and suppress duplicate toasts where needed.
- Use `showRequestErrorToast()` for non-RTK errors (e.g. bootstrap failures).

## Styling

- **Ant Design 6** for UI components (Button, Input, Spin, ConfigProvider theme).
- **Tailwind CSS** for layout and spacing utility classes.
- Theme token `colorPrimary: #3478F5` set in `App.tsx`; Tailwind `primary` color matches.
- Custom Tailwind colors: `pageTitle`, `lightBg`.

## Types

- Shared domain types in `src/shared/types/index.ts`.
- Feature-specific Redux types colocated in slice folder (e.g. `authTypes.ts`).
- API responses typed as `DataResponse<T>` (= `ApiEnvelope<T>`).

## Roles

```ts
USER_ROLE.ADMIN | USER_ROLE.STAFF
```

Role-based access checked via `selectIsAdmin` selector.
