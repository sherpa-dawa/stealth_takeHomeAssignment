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

**Trigger Events:**
- Push to `main` or `develop` branches
- Pull request on `main` or `develop`
- Push of semantic version tags (`v*`)

**Purpose:** Automated build, test, and deployment pipeline

**Concurrency:**
- Groups by workflow and ref
- Cancels in-progress runs on new pushes

---

### Job: Test & Build

**Runs on:** All trigger events

**Steps:**
1. Checkout code
2. Setup Node.js 20 with npm cache
3. Install dependencies (`npm ci`)
4. Lint code (`npm run lint`)
5. Type check (`npm run type-check`)
6. Run tests with coverage (`npm run test -- --coverage`)
7. Build application (`npm run build`)
8. Upload coverage to Codecov
9. Archive `.next` build artifacts (if push event)

**Artifacts:**
- Retained for 5 days
- Used by deployment jobs

---

### Job: Deploy Staging

**Trigger:** Push to `develop` branch (after Test & Build succeeds)

**Environment:** `staging` (configured in repository settings)

**Requirements:**
- `STAGING_URL` — Staging deployment endpoint
- `STAGING_TOKEN` — Authentication token

**Steps:**
1. Checkout code
2. Download build artifact
3. Execute staging deployment

---

### Job: Deploy Production

**Trigger:** Push of version tag `v*` (after Test & Build succeeds)

**Environment:** `production` (configured in repository settings)

**Requirements:**
- `PROD_URL` — Production deployment endpoint
- `PROD_TOKEN` — Authentication token
- `GITHUB_TOKEN` — GitHub API access (auto-provided)

**Steps:**
1. Checkout code
2. Download build artifact
3. Extract version from tag
4. Create GitHub Release
5. Execute production deployment

---

## Secrets Configuration

Configure these in repository Settings → Secrets and variables → Actions:

### Staging Deployment
```
STAGING_URL=https://staging.example.com/deploy
STAGING_TOKEN=your-staging-token
```

### Production Deployment
```
PROD_URL=https://api.example.com/deploy
PROD_TOKEN=your-production-token
```

---

## Local Development

Run workflow checks locally:

```bash
npm run lint          # ESLint validation
npm run type-check    # TypeScript compilation
npm run test          # Jest unit tests
npm run build         # Production build
```

---

## Deployment Workflows

### Automatic Staging Deployment

Push to `develop` branch triggers automatic staging deployment:

```bash
git push origin develop
```

GitHub Actions will:
1. Run full test & build suite
2. Deploy to staging if all checks pass

### Production Release

Create a version tag to trigger production deployment:

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release v1.0.0"

# Push tag to trigger workflow
git push origin v1.0.0
```

GitHub Actions will:
1. Run full test & build suite
2. Create GitHub Release with tag name
3. Deploy to production if all checks pass

---

## Environment Management

### Development → Staging → Production

**develop** branch → Tests pass → Auto-deploy to staging

**version tag** (v*) → Tests pass → Manual review → Deploy to production

---

## Workflow Status Page

View workflow runs: https://github.com/yourusername/audit-workspace/actions

Each commit/PR shows:
- ✅ Passing jobs (green)
- ❌ Failed jobs (red)
- ⏳ In-progress jobs (yellow)

---

## Troubleshooting

### Workflow Fails at Deploy Step

Check that secrets are configured:

```bash
# View available secrets (GitHub CLI)
gh secret list
```

### Build Artifacts Missing

Ensure previous job succeeded before deployment job runs:

```yaml
needs: test-build  # Depends on previous job
```

### Concurrent Runs Cancelled

Concurrency settings cancel older runs on new push:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

To disable, remove the `concurrency` section from workflow file.
