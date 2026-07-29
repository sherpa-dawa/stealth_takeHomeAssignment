# Audit Planning Workspace

A modern, professional audit planning application for enterprise auditors. Displays audit areas, risk assessments, progress tracking, deadlines, and recent activity with a focus on clean design and intuitive UX.

---

## Setup

### Prerequisites

- **Node.js** 18+ (npm required, yarn/pnpm blocked)
- **npm** only (project enforces npm-only usage)

### Installation

```bash
# Clone and install
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Available Commands

```bash
npm run dev         # Start Next.js dev server
npm run build       # Production build
npm run start       # Run production server
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm run type-check  # Type-check with tsc --noEmit
npm test            # Run Jest tests
npm test:watch      # Run tests in watch mode
```

### Package Manager Enforcement

This project **only supports npm**. If you try to use yarn or pnpm:

```bash
yarn install  # ❌ Error: This project only supports npm
pnpm install  # ❌ Error: This project only supports npm
```

---

## Architecture Overview

### Technology Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (strict mode)
- **UI:** Radix UI + Tailwind CSS
- **State Management:** TanStack Query v5 + React Context
- **Styling:** CSS custom properties (CSS variables)
- **Testing:** Jest + React Testing Library
- **Code Quality:** ESLint + Prettier + Husky

### Folder Structure

```
src/features/audit-planning/     # Feature-based organization
├── components/                   # React components
│   ├── AuditAreaCard.tsx        # Individual audit area card
│   ├── AuditAreaGrid.tsx        # Grid of audit areas
│   ├── WorkspaceHeader.tsx      # Header with export/save
│   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   └── layout/                  # Header, sidebar, layout
├── hooks/
│   ├── queries/                 # TanStack Query hooks
│   ├── mutations/               # TanStack Query mutations
│   └── useAuditWorkspace.ts     # Domain logic hook
├── context/
│   └── ThemeContext.tsx         # Global theme state
├── lib/
│   ├── queryClient.ts           # TanStack Query setup
│   ├── queryKeys.ts             # Query key factory
│   └── types.ts                 # Domain types
├── constants/
│   └── mockData.ts              # Mock API data
└── services/
    └── auditService.ts          # API abstraction layer

app/                             # Next.js App Router
├── page.tsx                     # Root page
├── layout.tsx                   # Root layout
├── globals.css                  # Global styles
├── theme.css                    # CSS custom properties
├── providers.tsx                # Provider hierarchy
└── api/audit/route.ts           # Mock API endpoint

lib/
├── theme/                       # Theme definitions
│   ├── lightTheme.ts
│   └── darkTheme.ts
└── utils.ts                     # Utility functions
```

---

## State Management

### 4-Layer State Architecture

1. **URL State** → Search params, filters, pagination
2. **Local UI State** → Dialog open/close, form inputs via `useState`
3. **Domain State** → Async data via TanStack Query
4. **Derived State** → Computed values via `useMemo`

### TanStack Query v5

Professional async state management with:

- ✅ Automatic caching and background refetching
- ✅ Query key factory pattern (`queryKeys.ts`)
- ✅ Mutations with cache invalidation
- ✅ Loading/error states via `useQuery` hook

**Query Hooks:**

```typescript
useAuditAreasQuery(); // Fetch all audit areas
useAuditAreaQuery(id); // Fetch single area
useHighRiskAreasQuery(); // Fetch high-risk areas
useAuditProgressQuery(); // Overall progress

useMutateAssignAuditor(); // Assign auditor
useMutateChangeStatus(); // Change area status
useMutateMarkComplete(); // Mark area complete
```

### React Context (Theme)

Global theme state managed via Context API:

- Light mode: `#f5f5f5` background, `#212121` text
- Dark mode: `#1a1f36` background (navy), `#ffffff` text
- Persisted to localStorage
- CSS variables applied via `data-theme` attribute

---

## UI / UX Decisions

### Component Design

- **Presentational Components:** Receive props/callbacks, never dispatch
- **Container Components:** Hold state, dispatch actions, pass callbacks down
- **Callback Props Pattern:** `onAssign`, `onStatusChange`, `onMarkComplete`

### Color System

| Mode      | Background | Card    | Border      | Text    |
| --------- | ---------- | ------- | ----------- | ------- |
| **Light** | #f5f5f5    | #ffffff | #e0e0e0     | #212121 |
| **Dark**  | #1a1f36    | #1e2847 | Transparent | #ffffff |

- **Theme Tokens:** Centralized in CSS custom properties
- **Automatic Switching:** Smooth 0.3s transitions

### Cards & Borders

- **AuditAreaCard:** Transparent outer borders
- **Internal Dividers:** Blue-gray borders in light mode, transparent in dark mode
- **Consistent Styling:** Via CSS variables for theme adaptation

### Export Button

- **Dark Mode:** White background (#ffffff) for visibility
- **Icon + Label:** Responsive (icon only on mobile)
- **Loading State:** Spinner during export

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), lg (1024px)
- Truncation and responsive spacing
- Touch-friendly button sizes (48px minimum)

---

## Assumptions & Tradeoffs

### Assumptions

1. **No Backend Authentication** → Mocked API data with mock user context
2. **Single Client Workspace** → Default to ABC Manufacturing Ltd.
3. **No Persistence** → Data resets on page reload (by design)
4. **No Real Export** → Export button triggers toast notification
5. **Standard Audit Areas** → 8 predefined areas (Revenue, Inventory, Payroll, etc.)
6. **Team Members Pre-Assigned** → Auditors have pre-set names and initials

### Tradeoffs

| Decision                            | Rationale                                   | Consequence                              |
| ----------------------------------- | ------------------------------------------- | ---------------------------------------- |
| TanStack Query over Redux           | Better for async state, less boilerplate    | Requires familiarity with Query patterns |
| CSS Variables over Tailwind theming | Runtime switching, no build-time generation | Custom CSS needed for dynamic themes     |
| Callbacks over direct dispatch      | Cleaner component API, easier testing       | Extra prop drilling in deep trees        |
| Feature-based folder structure      | Scales with teams, self-contained features  | More folders, less file-type grouping    |
| Radix UI + Tailwind                 | Accessible, unstyled + utility CSS          | Learning curve for both libraries        |
| No custom hooks beyond domain       | Simpler codebase, less abstraction          | Repeated logic in some components        |

---

## Screenshots

### Light Mode

- Clean, professional appearance
- High contrast gray borders (#e0e0e0)
- Blue progress bars (#1976d2)
- Clear visual separation

### Dark Mode

- Deep navy background (#1a1f36)
- Subtle blue-gray card backgrounds (#1e2847)
- White text (#ffffff) for comfortable viewing
- White export button for emphasis
- Transparent internal dividers
- Smooth 0.3s transitions

**Key UI Elements:**

- Header with theme toggle, export, and save buttons
- Client/financial year/status overview bar
- Search and filter controls
- Audit area cards in responsive grid
- Risk chip badges (High/Medium/Low)
- Status dropdowns with visual indicators
- Avatar initials for assigned auditors
- Task and evidence counters

---

## What I Would Do Next

### Performance Optimizations

- [ ] Image optimization (avatar backgrounds)
- [ ] Code splitting for audit area details dialog
- [ ] Skeleton loading states for all queries
- [ ] Virtual scrolling for large audit area lists

### Features

- [ ] Real backend API integration (replace mock)
- [ ] Audit area details dialog with full task list
- [ ] Drag-and-drop task management
- [ ] Email notifications for overdue items
- [ ] Audit engagement timeline view
- [ ] Evidence upload and tracking
- [ ] Audit workpaper collaboration

### Testing & Quality

- [ ] E2E tests with Playwright
- [ ] Visual regression testing
- [ ] Performance benchmarks
- [ ] Accessibility audit (axe-core)
- [ ] Security audit (OWASP Top 10)

### Deployment & DevOps

- [ ] GitHub Actions CI/CD pipeline
- [ ] Automated testing on PR
- [ ] Vercel deployment with preview URLs
- [ ] Error tracking (Sentry)
- [ ] Analytics (Mixpanel/PostHog)

---

**Stack:** Next.js 16 • TypeScript • TanStack Query v5 • Tailwind CSS • Radix UI  
**Last Updated:** July 29, 2026
