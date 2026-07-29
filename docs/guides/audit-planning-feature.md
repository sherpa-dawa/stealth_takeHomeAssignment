# Audit Planning Feature

Enterprise audit planning workspace: list audits, assign auditors, track progress, and manage deadlines.

## Architecture

### Folder Structure

```
audit-planning/
├── components/      # Presentational & container components
├── hooks/          # Custom React hooks (logic extraction)
├── services/       # API layer (all data fetching)
├── state/          # Redux reducer & action types
├── types/          # Domain TypeScript interfaces
├── constants/      # Magic strings → constants, mock data
└── index.ts        # Public API (barrel export)
```

### State Strategy (4-way split)

1. **Local State** (`useState`)
   - Dialog open/closed states
   - Menu anchors
   - Transient UI toggles (hover, focus)
   - Examples: `ViewDetailsDialog` open state

2. **URL State** (via `useSearchParams`)
   - Search query
   - Risk level filter
   - Status filter
   - Shareable, survives refresh, works with browser history

3. **Reducer State** (via `useReducer` in `useAuditWorkspace`)
   - Fetched audit data (areas, overview, activity)
   - User assignments
   - Status changes
   - Read-only and immutable

4. **Derived State** (`useMemo`)
   - Filtered audit list
   - Computed progress
   - Never stored, always re-computed

### Component Hierarchy

```
Workspace (page)
├── ErrorBoundary (catches render errors)
│   └── WorkspaceHeader (nav)
│   └── OverviewBar (summary stats)
│   └── FilterBar (search, dropdowns) ← manages URL state
│   └── AuditAreaGrid (list)
│       └── AuditAreaCard (presentational)
│           └── StatusSelector (status change UI)
│   └── Sidebar (deadlines, activity, progress)
│       └── ProgressWidget
│       └── HighRiskList
│       └── ActivityFeed
│       └── DeadlinesList
```

### Data Flow

```
1. Component renders
   ↓
2. URL params read (filters from browser bar)
   ↓
3. useAuditWorkspace() hook
   ├─ fetch audits from service
   ├─ dispatch to reducer
   └─ return { areas, overview, dispatch }
   ↓
4. useMemo filters areas based on URL params
   ↓
5. Pass filtered list + callbacks to presentational components
   ↓
6. User action → callback → dispatch → reducer → re-render
```

## Public API

> Everything else imports from `@/features/audit-planning` only.

```typescript
// Components
import { AuditAreaCard, FilterBar, Sidebar } from "@/features/audit-planning";

// Hooks
import { useAuditWorkspace } from "@/features/audit-planning";

// Services
import { auditService } from "@/features/audit-planning";

// Types
import type { AuditArea, RiskLevel } from "@/features/audit-planning";

// Constants
import { AREA_STATUSES, RISK_LEVELS } from "@/features/audit-planning";
```

## Key Patterns

### 1. Service Layer

All fetch calls go through `auditService`. Components **never** call fetch directly.

```typescript
// ✅ Correct
const areas = await auditService.getAudits(client);

// ❌ Wrong
const areas = await fetch("/api/audit");
```

### 2. Custom Hooks Extract Logic

If logic appears twice, it goes in a hook. Components read as mostly JSX.

```typescript
// ✅ Correct: logic in hook
const { areas, filters, setSearchQuery } = useAuditFilters();

// ❌ Wrong: logic in component
const [search, setSearch] = useState('');
const areas = useMemo(() => ...filter by search..., [search]);
```

### 3. Presentational Components

Pure components receive data + callbacks, never dispatch or fetch.

```typescript
// ✅ Correct
<AuditAreaCard area={area} onStatusChange={handleStatusChange} />

// ❌ Wrong
<AuditAreaCard area={area} /> // component constructs dispatch internally
```

### 4. Constants Over Magic Strings

Every repeated literal is a constant.

```typescript
// ✅ Correct
const status: AreaStatus = AREA_STATUSES[0];

// ❌ Wrong
const status = "Planning"; // string literal
```

## Testing the Feature

### Component Behavior

Components are thin and mostly render props. Test via:

- Visual inspection in dev server
- Parent hooks/containers manage state

### Service Layer

Services are pure and testable:

```typescript
// Test: service always returns a list of audits
const audits = await auditService.getAudits("ABC Ltd");
expect(Array.isArray(audits)).toBe(true);
```

### End-to-End

Full workflows via `useAuditWorkspace`:

```typescript
// Test: search filters list
const {
  areas,
  filters: { setSearchQuery },
} = useAuditWorkspace();
setSearchQuery("Revenue");
// assert areas now only includes 'Revenue'
```

## Adding New Features to This Feature

### Add a new filter

1. Add constant to `constants/index.ts`
2. Update `useAuditFilters()` hook to read from URL
3. Add UI control in `FilterBar.tsx`
4. Update `useMemo` filter logic in main hook

### Add a new dialog

1. Create component in `components/`
2. Add open/close state in container
3. Pass `isOpen` and `onClose` props
4. Update barrel export

### Add a new service call

1. Add method to `auditService.ts`
2. Call from custom hook
3. Update reducer if storing data
4. Export from index.ts public API

## Running Locally

```bash
npm run dev
# Open http://localhost:3000

# Type check
npm run type-check

# ESLint
npm run lint
```

---

**Last Updated:** July 29, 2026  
**Architecture Pattern:** Feature-based organization with 4-way state split
