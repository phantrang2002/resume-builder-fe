# Documentation Summary

Codebase FE React — React frontend scaffold dùng **access token in memory + refresh token HttpOnly cookie**, kết nối Express backend. Stack: React 19, Vite 6, TypeScript, Redux Toolkit, RTK Query, React Router v6, Ant Design 6, Tailwind CSS.

## Agent Context Guide

Before planning or implementing, read this `docs/SUMMARY.md` file first. Load only the detail docs relevant to the current task, and prioritize `Code Standard` docs for implementation conventions. If docs conflict with code or user intent, use the available question tool before making broad changes.

## Architecture

System design, auth flows, API integration, and data transport.

| File | Description |
| ---- | ----------- |
| [auth-session-flow.md](architecture/auth-session-flow.md) | Token storage, bootstrap, login/logout, 401 refresh, route guards |
| [api-integration.md](architecture/api-integration.md) | HTTP client, RTK Query, API envelope, dev proxy, env vars |

## Codebase

Directory structure, entry points, routing, and key modules.

| File | Description |
| ---- | ----------- |
| [directory-structure.md](codebase/directory-structure.md) | `src/` layout, entry points, module responsibilities |
| [routing-and-layouts.md](codebase/routing-and-layouts.md) | Route table, layouts, guard pattern, adding routes |

## Code Standard

Conventions, naming rules, and development workflows.

| File | Description |
| ---- | ----------- |
| [conventions.md](code-standard/conventions.md) | Naming, component patterns, state management, styling |
| [environment-setup.md](code-standard/environment-setup.md) | Prerequisites, env vars, scripts, backend requirements |

## Project PDR

Product goals, use cases, and business rules.

| File | Description |
| ---- | ----------- |
| [product-goals.md](project-pdr/product-goals.md) | Purpose, capabilities, constraints, out of scope |
| [auth-use-cases.md](project-pdr/auth-use-cases.md) | Login, signup, session restore, logout, password reset, roles |
