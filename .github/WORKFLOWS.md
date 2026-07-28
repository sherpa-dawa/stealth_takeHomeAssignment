# GitHub Workflows Documentation

This project uses GitHub Actions to automate testing, building, and deployment.

## PR Workflow (`.github/workflows/pr.yml`)

**Trigger:** Pull requests targeting `main` branch

**Purpose:** Quality gate for code changes before merge

**Jobs:**
1. **Lint & Format**
   - ESLint code style checks
   - TypeScript compilation check
   - Ensures code adheres to project standards

2. **Unit Tests**
   - Runs Jest test suite
   - Coverage reporting
   - Fails if tests don't pass

3. **Build Check**
   - Verifies production build succeeds
   - Catches build-time errors early
   - Ensures bundle integrity

4. **Security Audit**
   - Runs `npm audit` for vulnerabilities
   - Warns about moderate+ severity issues
   - Non-blocking but visible

**Status Checks:**
All jobs must pass before PR can be merged.

---

## CI/CD Pipeline (`.github/workflows/cicd.yml`)

**Triggers:**
- Push to `main` branch
- Push of semantic version tags (`v*`)

**Purpose:** Automated build, test, and deployment pipeline

**Jobs:**

### 1. Build & Test (runs on all triggers)
- Install dependencies
- Run linter
- Type checking
- Unit tests with coverage
- Production build
- Upload coverage to Codecov
- Archive build artifacts (.next)

### 2. Deploy to Staging (runs on push to main)
- Downloads build artifacts
- Deploys to staging environment
- Requires `STAGING_DEPLOY_TOKEN` and `STAGING_URL` secrets

### 3. Release & Deploy Production (runs on version tags)
- Downloads build artifacts
- Creates GitHub Release
- Deploys to production
- Requires `PROD_DEPLOY_TOKEN` and `PROD_URL` secrets

---

## Environment Variables & Secrets

For CI/CD deployment to work, configure these in GitHub repository settings:

### Staging Deployment
- `STAGING_DEPLOY_TOKEN` — Authentication token for staging
- `STAGING_URL` — Staging environment URL

### Production Deployment
- `PROD_DEPLOY_TOKEN` — Authentication token for production
- `PROD_URL` — Production environment URL

---

## Workflow Status

Current project status:
- ✅ PR validation: Lint, test, build checks
- ✅ CI/CD build: Compile and artifact generation
- ⚠️ Staging deployment: Placeholder (configure secrets)
- ⚠️ Production deployment: Placeholder (configure secrets)

---

## Local Development

All workflow checks can be run locally:

```bash
npm run lint          # ESLint checks
npm run type-check    # TypeScript validation
npm run test          # Unit tests
npm run build         # Production build
```

---

## Creating a Release

To trigger production deployment:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will:
1. Run full build & test suite
2. Create GitHub Release
3. Deploy to production (if secrets configured)
