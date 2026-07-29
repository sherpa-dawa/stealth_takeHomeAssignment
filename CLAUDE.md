# Audit Planning Workspace — Claude Code Context

## Project Purpose

A take-home exercise frontend for enterprise auditors preparing audit engagements. Displays audit areas, risk assessments, progress tracking, deadlines, and recent activity. Evaluated on: frontend architecture, component design, state management, TypeScript quality, responsive layout, and async UX patterns.

## Stack

- **Next.js 14+ (App Router)**
- **TypeScript (strict mode, noUncheckedIndexedAccess, noImplicitAny)**
- **Material-UI v6** — mandatory; use MUI components and `sx` prop for styling, not Tailwind or shadcn
- **React Hooks:** useReducer (domain state), useState (UI state), useMemo (derived data), useRef (imperative handles)
- No backend, no auth, no tests, no deployment config

## Folder Structure

```
app/
  page.tsx                        # Root page; filter state, main layout
  layout.tsx
  api/audit/route.ts             # Mock API endpoint
  components/
    layout/                       # Header, sidebar frame, overview bar
    areas/                        # Audit area cards, dialogs, grid
    shared/                       # Empty states, loading, error states, chips
    ui/                           # Reusable form controls (Select, Input, Button, etc.)
lib/
  types.ts                        # TypeScript domain types (RiskLevel, AreaStatus, etc.)
  workspaceReducer.ts            # Single useReducer for async/domain state
  useAuditWorkspace.ts           # Custom hook wrapping the reducer + fetch
  mockData.ts                    # API mock data
  theme.ts                       # MUI theme tokens (colors, spacing)
```

## Coding Conventions

### TypeScript

- **Strict mode enforced:** no `any`, explicit return types on functions
- **Interfaces** for object shapes (domain models); **types** only for unions/primitives
- **Named exports** for all components and utilities
- **Discriminated unions** for reducer actions (always include `type` field)

### Components & Styling

- All components use **MUI components** (Card, Chip, LinearProgress, Dialog, Skeleton, etc.)
- Styling via `sx` prop only; no separate CSS files or Tailwind classes
- **Presentational components** receive callback props (onAssign, onStatusChange, onMarkComplete) and never dispatch directly
- **Container components** hold state, dispatch actions, and pass callbacks down
- Risk and status colors always come from theme tokens (theme.palette.riskHigh, etc.), never hardcoded

### State Management (Critical)

Three-layer split:

1. **Async/domain state:** Lives in a single useReducer (workspaceReducer). Actions: FETCH_START, FETCH_SUCCESS, FETCH_ERROR, ASSIGN_AUDITOR, CHANGE_STATUS, MARK_COMPLETE. Every action that changes domain state must also append a Recent Activity entry.
2. **UI state:** Local useState for filters, dialog open/close, highlighted areas (never in reducer)
3. **Derived data:** Use useMemo to filter/sort areas; never store filtered lists in state

**Callback prop boundary:** Container receives dispatch, calls reducers, passes plain callbacks (onAssign, onStatusChange) to presentational components. Presentational components never call dispatch.

### Activity Logging

Every action that modifies domain state (assign auditor, change status, mark complete) must:

- Update the relevant area/item
- Prepend a new activity entry with user, action description, and "just now" timestamp
- All in a single reducer case (use the `prependActivity` helper)

## Commands

```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Prod build
npm run lint         # ESLint (if configured)
npm run type-check   # tsc --noEmit (verify types)
```

## Non-Goals

- No authentication or authorization
- No real backend; all data is mocked
- No unit or integration tests
- No deployment/CI-CD config
- No custom hooks beyond what's needed for the audit domain

## Key Decisions

- **Single reducer, not context + multiple useState:** Easier to reason about state mutations and debug
- **Callbacks, not dispatch:** Presentational components have zero knowledge of action types
- **MUI only:** Ensures consistency with enterprise product stack; no component library mixing
- **Local date parsing:** YYYY-MM-DD strings parsed as `new Date(y, m-1, d)` to avoid timezone offsets
- **Highlight timeout in useRef:** Multiple highlights within 1s cancel earlier timeouts; cleanup on unmount
