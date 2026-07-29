# Scalable Next.js Folder Structure

This project follows the **industry-standard scalable folder structure** for enterprise Next.js applications.

## Overview

```
project/
├── src/
│   ├── app/                      # Next.js App Router
│   ├── components/               # Shared UI components
│   ├── features/                 # Feature modules
│   ├── hooks/                    # Shared hooks
│   ├── lib/                      # Utilities & configurations
│   ├── services/                 # External service integrations
│   ├── stores/                   # Global state management
│   └── types/                    # Shared TypeScript types
├── public/
└── package.json
```

## Directory Details

### `src/app/` — Next.js App Router

Contains all Next.js routes and layouts. Uses file-based routing.

```
app/
├── (dashboard)/                  # Route group for dashboard
│   ├── layout.tsx
│   └── page.tsx
├── api/                          # API routes
├── layout.tsx                    # Root layout
├── page.tsx                      # Root page
├── globals.css                   # Global styles
└── providers.tsx                 # App providers (QueryClient, Toast, etc)
```

**Why Route Groups?**

- Organize related pages without affecting URL structure
- `(dashboard)` → pages live in `/` not `/dashboard`
- Improves code organization and prevents deeply nested routes

---

### `src/components/` — Shared UI Components

Reusable components used across **multiple features**.

```
components/
├── common/                       # Shared across features
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Dialog.tsx
│   ├── ErrorBoundary.tsx
│   ├── RiskChip.tsx
│   ├── StatusChip.tsx
│   ├── Toast.tsx
│   └── index.ts                  # Barrel export
├── layouts/                      # Layout components
│   └── MainLayout.tsx
└── index.ts                      # Re-export all
```

**Key Principle:** Only put components here if used by **2+ features**. If a component is feature-specific, it belongs in `features/audit-planning/components/`.

---

### `src/features/` — Feature Modules

Self-contained, loosely-coupled features. Each feature is **independent** and can be developed in parallel.

```
features/
├── audit-planning/               # Complete feature module
│   ├── components/               # Feature-specific components
│   │   ├── AuditAreaCard.tsx
│   │   ├── FilterBar.tsx
│   │   └── index.ts
│   ├── hooks/                    # Feature-specific hooks
│   │   ├── queries/
│   │   ├── mutations/
│   │   └── index.ts
│   ├── services/                 # Feature API layer
│   │   └── auditService.ts
│   ├── state/                    # Domain state management
│   │   └── reducer.ts
│   ├── types/                    # Feature types
│   │   └── index.ts
│   ├── constants/                # Feature constants
│   │   └── index.ts
│   ├── lib/                      # Feature configuration
│   │   ├── queryClient.ts
│   │   ├── queryKeys.ts
│   │   └── QueryProvider.tsx
│   └── index.ts                  # Public API
└── reporting/                    # Another feature (example)
    ├── components/
    ├── hooks/
    └── ...
```

**Why Feature-Based?**

- ✅ Complete feature isolation
- ✅ Easy to add/remove features
- ✅ No circular dependencies
- ✅ Teams can work on features in parallel
- ✅ Single responsibility per folder

**Feature Public API** (`index.ts`):

- Only exports what other features/components need
- Private implementation details stay private
- Acts as a contract between features

---

### `src/hooks/` — Shared Custom Hooks

Reusable logic hooks used across **multiple features**.

```
hooks/
├── useDebounce.ts
├── useMinimumLoadingDelay.ts
└── index.ts                      # Barrel export
```

**Guideline:** Only put here if used by 2+ features. Feature-specific hooks live in `features/audit-planning/hooks/`.

---

### `src/lib/` — Utilities & Configurations

Core utilities, helpers, and library code.

```
lib/
├── theme/                        # Theme utilities
│   ├── colorTokens.ts
│   ├── colorMap.ts
│   ├── avatarColors.ts
│   └── index.ts
├── utils/                        # Helper functions
│   ├── utils.ts
│   └── index.ts
├── queryClient.ts                # Shared TanStack Query config
├── queryKeys.ts                  # Shared query key factory
├── QueryProvider.tsx             # Query provider wrapper
└── index.ts                      # Re-export all
```

**What Goes Here?**

- Configuration files (QueryClient, theme, etc)
- Utility functions (formatDate, parseJSON, etc)
- Constants (magic numbers, regexes)
- Environment validation
- Third-party integrations

---

### `src/services/` — External Service Integrations

API clients and external service integrations used **globally**.

```
services/
├── api.ts                        # Base API client
├── auth.ts                       # Auth service
└── analytics.ts                  # Analytics service
```

**vs Feature Services:**

- `src/services/` → Global, used by multiple features
- `src/features/audit-planning/services/` → Audit-specific API layer

---

### `src/stores/` — Global State Management

Global state that's accessed across multiple features.

```
stores/
├── user.ts                       # User state (login, profile)
├── theme.ts                      # Theme state (dark/light)
└── notifications.ts              # Global notifications
```

**vs Feature State:**

- `src/stores/` → Application-level state
- `src/features/audit-planning/state/` → Feature-level state

---

### `src/types/` — Shared TypeScript Types

Shared type definitions used across multiple features.

```
types/
├── api.ts                        # API response/request types
├── models.ts                     # Domain models
└── components.ts                 # Component prop types
```

**vs Feature Types:**

- `src/types/` → Domain models, shared interfaces
- `src/features/audit-planning/types/` → Feature-specific types

---

## Import Patterns

### ✅ Correct Usage

```typescript
// From another feature
import { AuditAreaCard } from "@/features/audit-planning";

// Shared component
import { Button, Dialog } from "@/components";

// Shared hook
import { useDebounce } from "@/hooks";

// Shared utility
import { formatCurrency } from "@/lib/utils";

// Shared type
import type { ApiResponse } from "@/types";
```

### ❌ Avoid

```typescript
// Don't import from internal feature files
import { useAuditsQuery } from "@/features/audit-planning/hooks/queries";
// Instead use the public API
import { useAuditsQuery } from "@/features/audit-planning";

// Don't use deeply nested relative imports
import { Button } from "../../../../components/common";
// Instead use path aliases
import { Button } from "@/components";
```

---

## Communication Between Features

Features should **not import from each other directly**. Instead:

1. **Through Shared Components** — Create a shared component in `src/components/`
2. **Through Global State** — Use `src/stores/` for shared state
3. **Through Services** — Use `src/services/` for external APIs

**Example:**

```typescript
// ❌ Bad: audit-reporting directly importing from audit-planning
import { useAuditsQuery } from "@/features/audit-planning";

// ✅ Good: Share data through global store
import { auditsStore } from "@/stores/audits";
```

---

## Scaling Guidelines

### When to Add a New Feature

Create a new feature folder when:

- ✅ Code is logically grouped (1 feature = 1 concern)
- ✅ Code could be used by another developer without explanation
- ✅ Code could be independently deployed
- ✅ Code has its own state, types, and services

### When to Add to Shared

Add to `src/components/`, `src/hooks/`, or `src/lib/` when:

- ✅ Used by **2+ features**
- ✅ Generic enough for reuse
- ✅ Not feature-specific logic

### When to Create Global State

Add to `src/stores/` when:

- ✅ State is accessed by **3+ features** or **3+ pages**
- ✅ State needs to persist across navigation
- ✅ Multiple components need to update it simultaneously

---

## Benefits of This Structure

| Aspect              | Benefit                                                        |
| ------------------- | -------------------------------------------------------------- |
| **Scalability**     | Easy to add new features without affecting existing code       |
| **Maintainability** | Clear separation of concerns makes code easier to understand   |
| **Testability**     | Features are isolated, making unit/integration tests easier    |
| **Collaboration**   | Teams can work on different features without conflicts         |
| **Performance**     | Features can be lazy-loaded independently                      |
| **Code Reuse**      | Shared code in `components/`, `hooks/`, `lib/` is discoverable |
| **Type Safety**     | Shared types in `types/` prevent duplication                   |

---

## File Naming Conventions

### Components

- PascalCase: `AuditAreaCard.tsx`, `FilterBar.tsx`
- Index files for features: `index.ts` (barrel exports)

### Hooks

- camelCase starting with `use`: `useDebounce.ts`, `useAuditsQuery.ts`
- Index files for public APIs: `index.ts`

### Services

- camelCase: `auditService.ts`, `authService.ts`

### Types

- PascalCase: `AuditArea.ts`, `ApiResponse.ts`

### Utilities

- camelCase: `formatDate.ts`, `parseJSON.ts`

### Constants

- UPPER_CASE: `RISK_LEVELS.ts`, `API_ENDPOINTS.ts`

---

## Path Aliases

All imports use the `@/` prefix for absolute imports:

```typescript
// ✅ Absolute import
import { Button } from "@/components";

// ❌ Relative import (avoid)
import { Button } from "../../../components/common";
```

**Configuration** (in `tsconfig.json`):

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Migration from Old Structure

If you're moving from a different structure:

1. **Identify features** — What are the main domains? (audit-planning, reporting, etc)
2. **Move components** — Feature-specific → `features/X/components/`, shared → `components/`
3. **Move hooks** — Feature-specific → `features/X/hooks/`, shared → `hooks/`
4. **Update imports** — Use path aliases (`@/`) throughout
5. **Create barrel exports** — `index.ts` in each folder for public APIs
6. **Document public APIs** — Make it clear what's exportable from each feature

---

## References

- [Next.js App Router](https://nextjs.org/docs/app)
- [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [Absolute Imports](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
