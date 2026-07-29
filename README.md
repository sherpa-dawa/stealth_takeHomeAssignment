# Audit Planning Workspace

A professional enterprise audit planning frontend application built with Next.js, TypeScript, Material-UI, and TanStack Query.

## 📚 Documentation

**Start here:** [Documentation Index](docs/README.md)

Key guides:

- 🏗️ [Folder Structure](docs/architecture/folder-structure.md) — Enterprise organization patterns
- 📖 [Project Conventions](CLAUDE.md) — Coding standards and patterns
- 🚀 [TanStack Query Guide](docs/guides/tanstack-query.md) — Data fetching patterns
- 📋 [Deployment Checklist](docs/guides/deployment-checklist.md) — Production readiness

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# → http://localhost:3000
```

### Build & Deploy

```bash
# Type check
npm run type-check

# Production build
npm run build

# Start production server
npm start
```

---

## 🏛️ Project Architecture

### Stack

- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Material-UI v6
- **State Management:** TanStack Query v5 + Reducer pattern
- **Package Manager:** npm

### Key Features

✅ **Scalable folder structure** — Feature-based organization for teams up to 100+  
✅ **Professional data fetching** — TanStack Query with automatic caching & invalidation  
✅ **Type-safe** — Strict TypeScript for reliability  
✅ **Enterprise UI** — Material-UI components with consistent theming  
✅ **Code quality** — ESLint, Prettier, pre-commit hooks  
✅ **Async patterns** — Proper loading/error states

### Folder Structure

```
project/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/common/      # Shared UI components
│   ├── features/audit-planning/ # Self-contained feature
│   ├── hooks/                  # Shared hooks
│   ├── lib/                    # Utilities & config
│   ├── services/               # Global services
│   ├── stores/                 # Global state
│   └── types/                  # Shared types
├── docs/                       # 📚 Documentation
├── CLAUDE.md                   # Project conventions
└── README.md                   # This file
```

See [Folder Structure Guide](docs/architecture/folder-structure.md) for complete details.

---

## 🛠️ Commands

```bash
# Development
npm run dev              # Start dev server (hot reload)

# Quality assurance
npm run type-check      # TypeScript verification
npm run lint            # ESLint + Prettier check
npm run lint:fix        # Auto-fix linting issues

# Build
npm run build           # Production build
npm start               # Start production server

# Git & CI/CD
git commit              # Pre-commit hooks run automatically
                        # (type-check, lint, prettier)
```

---

## 📖 Key Patterns

### Component Usage

```typescript
import { Button, Dialog } from "@/components/common";
import { AuditAreaCard } from "@/features/audit-planning";

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <AuditAreaCard />
    </div>
  );
}
```

### Data Fetching

```typescript
import { useAuditsQuery } from "@/features/audit-planning";

function MyComponent() {
  const { data, isLoading, isError, error } = useAuditsQuery(client);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={error?.message} />;

  return <div>{data?.map(...)}</div>;
}
```

### Adding Features

1. Create `src/features/my-feature/` folder
2. Add `components/`, `hooks/`, `services/`, `types/`, `constants/`, `lib/`
3. Create `index.ts` for public API
4. Follow conventions in `CLAUDE.md`

See [Audit Planning Feature](docs/guides/audit-planning-feature.md) for reference.

---

## 🚢 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Follow [Vercel Setup Guide](docs/guides/vercel-setup.md)
3. Check [Deployment Checklist](docs/guides/deployment-checklist.md)

### Other Platforms

1. Run `npm run build`
2. Deploy `.next` folder
3. See [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI v6](https://mui.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

Follow conventions in:

- `CLAUDE.md` — Coding standards & patterns
- [Folder Structure Guide](docs/architecture/folder-structure.md) — Code organization
- Pre-commit hooks verify quality automatically

---

## 📄 License

This project is proprietary.

---

## ✨ Built with Professional Patterns

This project uses industry-standard practices from:

- Vercel (Next.js creators)
- Stripe Engineering
- GitHub
- Netflix

Perfect for scaling to large teams while maintaining code quality.
