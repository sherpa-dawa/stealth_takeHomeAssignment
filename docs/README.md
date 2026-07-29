# Documentation

Complete documentation for the Audit Planning Workspace project.

## 📚 Table of Contents

### Architecture & Design

- **[Folder Structure](architecture/folder-structure.md)** — Scalable enterprise Next.js folder organization (Vercel/Stripe pattern)
- **[Architecture Plan](architecture/architecture-plan.md)** — System design and technical architecture overview
- **[Architecture Diagram](architecture/architecture-diagram.md)** — Visual system diagrams

### Feature Guides

- **[TanStack Query](guides/tanstack-query.md)** — Professional async state management with React Query
- **[Deployment Checklist](guides/deployment-checklist.md)** — Pre-production verification steps
- **[Vercel Setup](guides/vercel-setup.md)** — Vercel deployment configuration
- **[Claude Code Guide](guides/agents.md)** — Claude Code agent usage and extensions

---

## 🎯 Quick Start

### For New Developers

1. Read **[Folder Structure](architecture/folder-structure.md)** to understand code organization
2. Check **[CLAUDE.md](../CLAUDE.md)** for project conventions
3. Review **[TanStack Query](guides/tanstack-query.md)** for data fetching patterns

### For Adding Features

1. Create feature folder in `src/features/my-feature/`
2. Follow structure: `components/`, `hooks/`, `services/`, `types/`, `constants/`, `lib/`, `index.ts`
3. Use feature's `index.ts` to define public API
4. Reference [Folder Structure](architecture/folder-structure.md) for guidelines

### For Deployments

1. Review **[Deployment Checklist](guides/deployment-checklist.md)**
2. Follow **[Vercel Setup](guides/vercel-setup.md)** for production

---

## 📋 Architecture Overview

### Project Structure

```
project/
├── docs/                         # 📚 Documentation (this folder)
├── src/
│   ├── app/                      # Next.js App Router
│   ├── components/common/        # Shared UI components
│   ├── features/
│   │   └── audit-planning/       # Self-contained feature
│   ├── hooks/                    # Shared hooks
│   ├── lib/                      # Utilities & config
│   ├── services/                 # Global services
│   ├── stores/                   # Global state
│   └── types/                    # Shared types
├── public/
├── CLAUDE.md                     # Project conventions
├── README.md                     # Project overview
└── package.json
```

### Key Technologies

- **Framework:** Next.js 16+ with App Router
- **Styling:** Material-UI v6 with `sx` prop
- **State Management:** TanStack Query v5 for async data, Reducer pattern for domain state
- **Language:** TypeScript (strict mode)
- **Code Quality:** ESLint, Prettier, pre-commit hooks

---

## 🏗️ Architecture Layers

### 1. **Presentation Layer** (`src/components/`, `src/features/*/components/`)

- Reusable UI components
- Feature-specific components
- No business logic

### 2. **Logic Layer** (`src/features/*/hooks/`, `src/hooks/`)

- Custom React hooks
- TanStack Query hooks (useAuditsQuery, etc.)
- Shared logic

### 3. **State Management** (`src/features/*/state/`, `src/stores/`)

- Feature domain state (reducer pattern)
- Global application state (user, theme, etc.)
- TanStack Query cache management

### 4. **Service Layer** (`src/features/*/services/`, `src/services/`)

- API integration
- External service calls
- Data transformation

### 5. **Data Layer** (`src/features/*/types/`, `src/types/`, `src/features/*/constants/`)

- TypeScript type definitions
- Constants and configurations
- Domain models

---

## 🔄 Data Flow

```
User Interaction
    ↓
Component (presentation)
    ↓
Hook (useAuditsQuery, etc.)
    ↓
TanStack Query / Service Layer
    ↓
API / Mock Data
    ↓
Response → Cache → Component Re-render
```

---

## 📖 Key Concepts

### Feature-Based Organization

- Each feature is **self-contained** with its own folder
- Features have clear public APIs (`index.ts`)
- No direct imports between features
- Teams can work on features in parallel

### Shared Code Rules

- Only in `src/components/`, `src/hooks/`, `src/lib/` if used by **2+ features**
- Otherwise, code belongs in feature folder
- Use barrel exports for public APIs

### Path Aliases

- Always use `@/` prefix: `@/components`, `@/hooks`, `@/lib`
- Never use relative imports: avoid `../../../`
- Configured in `tsconfig.json`

### State Management

- **Local UI State:** `useState` for filters, dialogs, etc.
- **Domain State:** `useReducer` for audit operations
- **Async State:** TanStack Query for data fetching
- **Global State:** `src/stores/` for application-level state

---

## 🚀 Common Tasks

### Adding a New Component

```typescript
// Feature-specific? → features/audit-planning/components/
// Shared (2+ features)? → components/common/

// Create with proper exports
export function MyComponent() { ... }

// Add to feature/folder index.ts
export { MyComponent } from "./MyComponent";
```

### Using TanStack Query

```typescript
import { useAuditsQuery } from "@/features/audit-planning";

function MyComponent() {
  const { data, isLoading, isError, error } = useAuditsQuery(client);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error?.message} />;
  return <div>{data?.map(...)}</div>;
}
```

### Adding Global State

```typescript
// Create in src/stores/myState.ts
export const myStore = {
  state: { ... },
  dispatch: (action) => { ... }
};

// Use in components
import { myStore } from "@/stores";
```

### Communicating Between Features

```typescript
// ❌ Don't do this
import { useAuditsQuery } from "@/features/audit-planning/hooks";

// ✅ Use public APIs
import { useAuditsQuery } from "@/features/audit-planning";

// ✅ Or use shared state
import { auditStore } from "@/stores";
```

---

## 📊 Development Workflow

1. **Setup:** Read CLAUDE.md for conventions
2. **Understand:** Review architecture docs
3. **Create:** Follow folder structure
4. **Develop:** Use established patterns
5. **Test:** TypeScript + ESLint checks
6. **Commit:** Pre-commit hooks verify quality
7. **Deploy:** Follow deployment checklist

---

## 🛠️ Tools & Commands

```bash
# Development
npm run dev              # Start dev server

# Quality checks
npm run type-check      # TypeScript verification
npm run lint            # ESLint + Prettier
npm run build           # Production build

# Git & commits
git add .               # Stage files
git commit              # Pre-commit hooks run automatically
git push                # Ready to deploy
```

---

## 📞 Need Help?

- **Project Setup:** See CLAUDE.md
- **Code Organization:** See [Folder Structure](architecture/folder-structure.md)
- **Data Fetching:** See [TanStack Query](guides/tanstack-query.md)
- **Deploying:** See [Deployment Checklist](guides/deployment-checklist.md)
- **Questions:** Check relevant guide or contact team lead

---

## 📝 Document Organization

```
docs/
├── README.md                          # 👈 You are here
├── architecture/
│   ├── folder-structure.md            # Enterprise folder patterns
│   ├── architecture-plan.md           # System design
│   └── architecture-diagram.md        # Visual diagrams
└── guides/
    ├── tanstack-query.md             # React Query patterns
    ├── deployment-checklist.md       # Production verification
    ├── vercel-setup.md               # Deployment config
    └── agents.md                     # Claude Code usage
```

---

Last updated: 2026-07-29
