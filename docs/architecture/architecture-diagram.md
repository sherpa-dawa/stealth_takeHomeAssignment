# Visual Architecture Diagrams

## Current Architecture (Foundation Stage)

```
┌─────────────────────────────────────────────────────────┐
│                    React Components                      │
│  AuditAreaCard | StatusChip | Avatar | etc              │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Container Components                       │
│  AuditAreaGrid | FilterBar | Sidebar                    │
│  (Dispatch actions, manage UI state)                    │
└──────────────────────────┬──────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                ▼                     ▼
    ┌─────────────────────┐  ┌──────────────────┐
    │  workspaceReducer   │  │   useState/       │
    │  (Domain state)     │  │   setSearchQuery  │
    │  - areas            │  │   (UI state)      │
    │  - activity         │  │   - filters       │
    │  - overview         │  │   - selectedTab   │
    └────────────┬────────┘  └──────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────┐
    │    mockData.ts                      │
    │  (Static JSON, no real backend)     │
    └─────────────────────────────────────┘

Issues:
❌ No API validation
❌ No caching strategy
❌ Single point of failure (monolithic reducer)
❌ No offline support
❌ No feature flags
❌ No auth/permissions
❌ No observability
```

---

## Target Architecture (Enterprise Scale)

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Frontend Layer                              │
│  React Components (AuditAreaCard, StatusChip, Avatar, etc)           │
└───────────────────────────────────┬────────────────────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
   ┌─────────────────┐   ┌─────────────────┐   ┌──────────────────┐
   │ Domain Hooks    │   │ UI State Hooks  │   │ Error Boundaries │
   │ useAudits()     │   │ useFilters()    │   │ (Catch errors)   │
   │ useUsers()      │   │ useDialog()     │   │                  │
   └────────┬────────┘   └────────┬────────┘   └────────┬─────────┘
            │                      │                     │
            └──────────┬───────────┴─────────────────────┘
                       ▼
        ┌──────────────────────────────────────┐
        │  Container Components                │
        │  (Pass callbacks, no direct dispatch)│
        └──────────────────────────┬───────────┘
                                   │
    ┌──────────────────────────────┼──────────────────────────────┐
    ▼                              ▼                              ▼
┌─────────────────┐    ┌──────────────────────┐    ┌──────────────────┐
│ TanStack Query  │    │  Redux Store         │    │  Feature Flags   │
│ (Server State)  │    │  (Domain State)      │    │  (Conditions)    │
│ - cache         │    │  - audits reducer    │    │  - experiments   │
│ - dedup         │    │  - users reducer     │    │  - rollouts      │
│ - offline sync  │    │  - filters reducer   │    └──────────────────┘
└────────┬────────┘    └──────────┬───────────┘
         │                        │
         └────────────┬───────────┘
                      ▼
        ┌──────────────────────────────────┐
        │  Services Layer                  │
        │  (Business Logic)                │
        │ - auditService.updateStatus()    │
        │ - userService.assignAuditor()    │
        │ - activityService.createLog()    │
        └────────────┬─────────────────────┘
                     │
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ API Client   │ │  Validation  │ │ Observability│
│ (axios)      │ │  (Zod)       │ │  (Sentry)    │
│ - headers    │ │ - schemas    │ │ - errors     │
│ - retry      │ │ - contracts  │ │ - logs       │
└──────┬───────┘ └──────────────┘ │ - analytics  │
       │                           └──────────────┘
       ▼
┌──────────────────────────────────────┐
│      Backend API (v1)                │
│  GET  /api/v1/audits                 │
│  POST /api/v1/audits                 │
│  PATCH /api/v1/audits/:id            │
│  GET  /api/v1/users                  │
│  POST /api/v1/activity               │
└──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│      Database                        │
│  - audits table                      │
│  - users table                       │
│  - activity_log table                │
│  - permissions table                 │
└──────────────────────────────────────┘

Benefits:
✅ Layered architecture (SOLID principles)
✅ API validation at boundary
✅ Cached server state (40% fewer API calls)
✅ Offline-first (sync queue)
✅ Feature flags (safe rollouts)
✅ Auth & RBAC (multi-tenant)
✅ Observability (production visibility)
✅ Testable (no API calls in unit tests)
```

---

## Data Flow: Status Change (Current vs Target)

### Current Flow ❌

```
User clicks Status Dropdown
  ↓
handleStatusChange(newStatus)
  ↓
dispatch(CHANGE_STATUS)
  ↓
workspaceReducer updates area + activity in same action
  ↓
Component re-renders
  ↓
[No API call - offline only!]
  ↓
[No validation - bad data possible]
  ↓
[No logging - where did this change come from?]
  ↓
[No error handling - state is broken]
```

### Target Flow ✅

```
User clicks Status Dropdown
  ↓
handleStatusChange(newStatus)
  ↓
[Input validation] validateStatusTransition()
  ↓
Optimistic update: useQueryClient().setQueryData()
  ├─ Component shows new status immediately
  └─ Spinner visible
  ↓
Background: API call → PATCH /api/v1/audits/:id
  ├─ Validate permission: can user change status?
  ├─ Validate business rule: status transition allowed?
  ├─ Update database
  ├─ Create audit log entry
  └─ Return updated audit with server timestamp
  ↓
Success: queryClient confirms response
  ├─ Replace optimistic update with server truth
  ├─ Log event: analytics.track('audit.status_changed')
  ├─ Show toast: "Status updated"
  └─ Invalidate related queries
  ↓
Or Error: Network fails or business rule violated
  ├─ Revert optimistic update
  ├─ Show toast: "Failed to update - check permissions"
  ├─ Queue for offline sync (if network error)
  └─ Log error to Sentry
```

---

## State Management Before → After

### Before (Current - Monolithic Reducer)

```typescript
// ONE reducer handles everything
case "CHANGE_STATUS":
case "ASSIGN_AUDITOR":
case "MARK_COMPLETE":
case "FETCH_SUCCESS":
case "CREATE_ACTIVITY": ← All in one file!

// Issues:
// 1. Hard to test (need mock entire state tree)
// 2. Hard to reuse (mutations locked to React)
// 3. Hard to debug (200 lines of side effects)
// 4. Hard to parallelize (conflicts on merge)
```

### After (Target - Domain-Based + TanStack Query)

```
Services (Reusable logic)
├── auditService
│   └── updateStatus(id, status)        ← Pure function
├── userService
│   └── assignAuditor(id, user)
└── activityService
    └── createLog(message)

State Management
├── Store (Redux) ← UI state only
│   ├── filters reducer
│   └── dialog reducer
└── Cache (TanStack Query) ← Server state
    ├── audits query
    ├── users query
    └── activity query

// Benefits:
// ✅ Services are testable (no render, no dispatch)
// ✅ Services are reusable (can call from API routes)
// ✅ Reducers are tiny (20 lines each)
// ✅ Easy to parallelize (different files, no conflicts)
```

---

## Deployment & Rollout Strategy

### Phase: Validation Layer (Week 1)

```
                    Feature Flag
                   "use_zod_validation"
                      /        \
                    0%           100%
                   /               \
        Old: Skip validation    New: Validate with Zod
        response.data                   |
                |                      ▼
                |              if (!schema.parse())
                |                 throw ValidationError
                |
                └─ Comparison Metric: Error rate delta
                   Goal: +0% new errors from Zod (catch existing bugs)
```

### Phase: TanStack Query Rollout (Week 4)

```
                 Feature Flag
              "use_react_query"
                   /      \
                 10%       100%
                /            \
        Early Adopters    All Users
        (Team A)          (Gradual ramp)
             |                 |
            ▼                  ▼
      [Monitor via    [Canary → 50% → 100%]
       Analytics]     (Each stage: 2h min,
                       zero errors = proceed)
```

### Phase: Auth Rollout (Week 11)

```
Team Stages:
├── dev     [100%] Local dev
├── staging [100%] QA testing
├── prod-canary [5%] Real users (Cohort A)
│   └─ Monitor: Login errors, Session issues
├── prod-20% [20%] Larger rollout
│   └─ Monitor: 4h stability check
└── prod-100% [100%] Full rollout
    └─ Monitor: Alert on any errors

Rollback: One click reverts to prev version (feature flag)
```

---

## Performance & Scalability Targets

### Current (Foundation)

```
Users Handling:    10 (demo)
Concurrent:        2
Audits per org:    10
Response time:     500ms (mock data instant)
API calls:         N/A (mock)
Memory:            ~5MB (minimal)
```

### Target (Enterprise - After 16 weeks)

```
Users Handling:    100,000 (10x growth)
Concurrent:        10,000 (via horizontal scaling)
Audits per org:    50,000 (virtualizes list)
Response time:     <200ms (p95, via caching)
API calls:         -40% (request dedup + cache)
Memory:            ~50MB (TanStack Query + Redux)

Scaling Strategy:
├── Frontend: CDN (Vercel edge network)
├── Middleware: API rate limiting + caching
├── Cache Layer: Redis (client cache keys)
└── Database: Indexed queries, read replicas
```

---

## Testing Pyramid (Week 8-12)

```
        ▲
       ╱ ╲  E2E Tests (Playwright)
      ╱   ╲ - 15 critical user journeys
     ╱─────╲ - 30 min to run
    ╱       ╲ 60% Coverage
   ╱─────────╲
  ╱           ╲
 ╱ Integration ╲ Integration Tests
╱───────────────╲ - Service layer workflows
│   Unit Tests   │ - Reducer logic
├───────────────┤ - 35 tests
│               │ 30 min to run
└───────────────┘ 90% Coverage

Unit Tests (Jest + Vitest)
- Services (100%)
- Utils (100%)
- Reducers (95%)
- Components (60%) ← UI is harder to test

Coverage Targets:
├── statements: >85%
├── branches: >80%
├── functions: >85%
└── lines: >85%
```

---

## Technology Decision Matrix

| Concern            | Option A         | Option B                 | **Choice**     | Reason                                        |
| ------------------ | ---------------- | ------------------------ | -------------- | --------------------------------------------- |
| **Server State**   | Redux            | **TanStack Query**       | TanStack Query | Built for server state, less boilerplate      |
| **Validation**     | Joi              | **Zod**                  | Zod            | Smaller bundle, better DX, TS inference       |
| **Error Tracking** | LogRocket        | **Sentry**               | Sentry         | Better for frontend errors, replay            |
| **Feature Flags**  | Custom           | **LaunchDarkly**         | LaunchDarkly   | Battle-tested, safe rollouts, experiments     |
| **Testing**        | Mocha            | **Jest + Vitest**        | Jest + Vitest  | Jest for unit, Vitest for speed               |
| **E2E**            | Cypress          | **Playwright**           | Playwright     | Faster, multi-browser, better parallelization |
| **Analytics**      | Google Analytics | **PostHog**              | PostHog        | GDPR-friendly, self-hosted option             |
| **Logging**        | console.log      | **Winston**              | Winston        | Structured, filterable, integrates with ELK   |
| **Auth**           | Auth0            | **NextAuth.js**          | NextAuth.js    | Open-source, self-hosted, full control        |
| **API**            | fetch + retry    | **Axios + interceptors** | Axios          | Request/response interceptors, cancel tokens  |

---

## Risk Heatmap (Color = Severity)

```
                  IMPACT
           High      Medium      Low
         ┌─────────────────────────┐
       H │ 🔴 Large refactor  🟡   │
       I │ 🔴 Team unfamiliar 🟡   │
   P  G │ 🟡 Perf regression 🟢   │
   R  H │ 🟡 Backend changes 🟢   │
   O  │ 🟢 Tooling issues  🟢   │
   B  │ 🟡 Timeline slip   🟢   │
   A  L │ 🟡 Testing gaps    🟢   │
   B  O │ 🟢 Docs lag        🟢   │
   I  W │                           │
   L    └─────────────────────────┘
    Y

🔴 RED = Mitigate ASAP (parallel implementation, tests)
🟡 YELLOW = Monitor closely (runbooks, pair programming)
🟢 GREEN = Standard precautions (code review, CI/CD)
```

---

## Team Allocation (16 Week Project)

```
Week 1-4 (Phase 1: Foundation)
├── Engineer A: Zod schemas + API validation
├── Engineer B: Error boundaries + Sentry
├── Engineer C: TanStack Query setup
└── Engineer D: Tests + documentation

Week 5-8 (Phase 2: Data Layer)
├── Engineer A: Services layer (audit, user)
├── Engineer B: Cache invalidation strategy
├── Engineer C: Offline sync queue
└── Engineer D: Service tests (90%+ coverage)

Week 9-12 (Phase 3: Features)
├── Engineer A: Feature flags infrastructure
├── Engineer B: Auth + NextAuth.js integration
├── Engineer C: RBAC + permissions middleware
└── Engineer D: E2E tests + critical paths

Week 13-16 (Phase 4: Refinement)
├── Engineer A: Reducer refactor (now safe with tests)
├── Engineer B: Performance optimization
├── Engineer C: Lighthouse audit + Web Vitals
└── Engineer D: Docs, runbooks, on-call training

Sync: 2x weekly architecture reviews
Parallel: Every phase overlaps (reduces total time)
```

---

## Deployment Timeline

```
Week 1-4: Deploy to Staging
  ├─ Zod validation in shadow mode (logs only)
  ├─ Feature flag disabled (no customer impact)
  └─ Tests passing (>80% coverage)

Week 5-8: Deploy to Prod (5% users)
  ├─ TanStack Query via feature flag
  ├─ Monitor: API calls, cache hit rates
  └─ 48h stability check before ramp

Week 9-12: Feature flags live (10% users)
  ├─ Auth gated behind feature flag
  ├─ RBAC enforced at API layer
  └─ Real users testing new architecture

Week 13-16: Full rollout (100% users)
  ├─ Old reducer code removed
  ├─ All traffic via new stack
  └─ Archive v0 codebase (git tags)
```

---

## Success: Before vs After

### Before (Today)

- ❌ 1 person understands full architecture
- ❌ Deploy takes 30min (manual testing)
- ❌ Incident takes 2hrs to debug
- ❌ Can't scale beyond 100 users
- ❌ No feature experimentation
- ❌ No offline support
- ❌ No audit trail

### After (Week 16)

- ✅ Team can explain each layer
- ✅ Deploy takes 5min (automated tests)
- ✅ Incident fixed in 15min (Sentry logs)
- ✅ Scales to 100K+ users
- ✅ 5+ A/B experiments running
- ✅ Full offline sync support
- ✅ 100% audit trail compliance
