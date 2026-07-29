# Vercel Deployment Setup Guide

## Prerequisites

1. Vercel Account: https://vercel.com
2. GitHub repository connected to Vercel
3. Node.js 20+ installed locally

## Environment Variables Setup

Add the following environment variables in Vercel Project Settings → Environment Variables:

```
# Development
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NODE_ENV=production

# Production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
```

## Vercel Project Configuration

### 1. **Framework Settings**

- Framework: Next.js 16
- Node.js Version: 20
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 2. **Build & Development Settings**

- ✅ Override Build Command: `npm run build`
- ✅ Include Source Maps in Production Build: false (for performance)

### 3. **Deployment Settings**

- ✅ Git Automatic Deployments: Enabled for main branch
- ✅ Preview Deployments: Enabled for pull requests

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
npm ci
npm run validate
npm run build
```

### Environment Variables Not Found

- Verify all secrets are added in Vercel dashboard
- Restart deployment after adding variables
- Check `.env.example` for required variables

### Performance Issues

- Enable Image Optimization in vercel.json
- Use Vercel Analytics to identify bottlenecks
- Check Core Web Vitals in Vercel Dashboard

## Deployment Checklist

- [ ] All environment variables added to Vercel
- [ ] Build succeeds locally (`npm run build`)
- [ ] All tests pass (`npm run test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] ESLint validation passes (`npm run lint`)
- [ ] GitHub repository is connected
- [ ] Main branch is protected with status checks
- [ ] Pull request preview deployments are enabled

## Monitoring

### Vercel Dashboard

- Monitor build times and deployment history
- Track performance metrics
- Review error logs

### GitHub Actions

- CI pipeline validates PRs before merge
- Automated testing and type checking
- Security audits run on every push

## Commands Reference

```bash
# Local validation
npm run validate

# Build for production
npm run build

# Start production server
npm start

# Check for issues
npm run lint
npm run type-check
npm run test
```
