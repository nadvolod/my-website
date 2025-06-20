# 🔧 GitHub Actions CI/CD Setup Guide

This guide explains how to configure the GitHub repository for automated testing and deployment.

## 📋 Required Secrets

Add these secrets to your GitHub repository settings (`Settings > Secrets and variables > Actions`):

### 🚀 Vercel Deployment Secrets

1. **`VERCEL_TOKEN`**
   - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
   - Create a new token with appropriate permissions
   - Copy the token value

2. **`VERCEL_ORG_ID`**
   ```bash
   # Run this in your project directory
   npx vercel link
   cat .vercel/project.json
   ```
   - Copy the `orgId` value

3. **`VERCEL_PROJECT_ID`**
   ```bash
   # From the same .vercel/project.json file
   cat .vercel/project.json
   ```
   - Copy the `projectId` value

### 🔐 GitHub Token (Optional)

- **`GITHUB_TOKEN`** - Automatically provided by GitHub Actions
- No additional setup required for basic functionality

## 🛠️ Repository Settings

### 1. Enable GitHub Actions
- Go to `Settings > Actions > General`
- Allow all actions and reusable workflows
- Allow GitHub Actions to create and approve pull requests

### 2. Branch Protection Rules
Set up branch protection for `main`:
- Go to `Settings > Branches`
- Add rule for `main` branch
- Enable:
  - ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - ✅ Status checks: `test`, `security`, `build-analysis`
  - ✅ Restrict pushes that create files larger than 100 MB

### 3. Environment Protection (Optional)
- Go to `Settings > Environments`
- Create `production` environment
- Add protection rules:
  - ✅ Required reviewers (optional)
  - ✅ Wait timer (optional)
  - ✅ Deployment branches: `main` only

### 4. Enable Renovate Bot
- Install the [Renovate GitHub App](https://github.com/apps/renovate)
- Grant access to your repository
- Renovate will automatically detect `renovate.json` configuration
- First run will create a "Configure Renovate" PR

## 🔄 Workflow Overview

### Main CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**Jobs:**
1. **🧪 Tests & Quality Checks**
   - ESLint code quality
   - Prettier formatting check
   - Build verification
   - Playwright end-to-end tests
   - Link validation
   - Performance tests

2. **🔒 Security Audit**
   - npm security audit
   - Dependency vulnerability check

3. **📊 Build Analysis**
   - Bundle size analysis
   - Build optimization check

4. **🔍 Deploy Preview** (Pull Requests)
   - Deploy to Vercel preview environment
   - Comment on PR with preview URL

5. **🚀 Deploy Production** (Main branch)
   - Deploy to Vercel production
   - Run post-deployment health checks

6. **🏥 Health Check** (Post-deployment)
   - Site availability check
   - Lighthouse performance audit

### Renovate Bot Dependency Management

**Automated via Renovate GitHub App:**
- Schedule: Every Monday before 6 AM PT
- Intelligent package grouping (React, Next.js, TypeScript, etc.)
- Auto-merge for safe updates (patch/minor)
- Security vulnerability monitoring

**Features:**
- Dependency Dashboard issue for centralized tracking
- Smart scheduling and rate limiting
- GitHub Actions digest pinning for security
- Comprehensive PR descriptions with confidence scores

### Performance Monitor (`.github/workflows/performance-monitor.yml`)

**Triggers:**
- Schedule: Daily at 6 AM UTC
- Manual trigger via GitHub Actions UI

**Features:**
- Daily Lighthouse audits (Mobile & Desktop)
- Core Web Vitals monitoring
- Performance threshold checks
- Automated reports

## 🔧 Configuration Files

### Renovate Bot (`renovate.json`)
- Advanced dependency management with intelligent grouping
- Weekly schedule for npm packages and GitHub Actions
- Auto-merge capabilities for safe updates
- Vulnerability alerts and security monitoring
- Dependency dashboard for centralized tracking

### Vercel (`vercel.json`)
- Deployment configuration
- Security headers
- Caching strategies
- API route configuration

## 🚨 Troubleshooting

### Common Issues

1. **Vercel deployment fails**
   - Check if `VERCEL_TOKEN` has correct permissions
   - Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
   - Ensure Vercel project is linked correctly

2. **Tests fail in CI but pass locally**
   - Check Node.js version consistency
   - Verify environment variables
   - Review Playwright browser installation

3. **Security audit fails**
   - Review and fix npm security vulnerabilities
   - Update dependencies with security patches
   - Consider using `npm audit fix`

4. **Performance checks fail**
   - Review Lighthouse reports in artifacts
   - Check Core Web Vitals metrics
   - Optimize images, scripts, and styles

5. **Renovate Bot issues**
   - Check the Dependency Dashboard issue for status
   - Verify `renovate.json` configuration is valid
   - Review Renovate logs in PR descriptions
   - Ensure GitHub App has proper permissions

### Getting Help

1. Check GitHub Actions logs for detailed error messages
2. Review artifact uploads for test reports and performance data
3. Verify all required secrets are properly configured
4. Ensure branch protection rules allow the workflows to run
5. Check Renovate Dashboard issue for dependency status

## 📊 Monitoring & Reports

### Artifacts Generated
- **Playwright Reports** - Test execution results and screenshots
- **Lighthouse Reports** - Performance audit data
- **Bundle Analysis** - Size and optimization reports
- **Renovate Dashboard** - Dependency status and update tracking

### Notifications
- PR comments with preview deployment URLs
- Renovate dependency update PRs with detailed information
- Failed workflow notifications via email/GitHub
- Security vulnerability alerts from Renovate

## 🎯 Best Practices

1. **Keep secrets secure** - Never commit sensitive information
2. **Review dependency updates** - Major version updates require manual review
3. **Monitor performance** - Set up alerts for performance regressions
4. **Regular maintenance** - Keep workflows and dependencies updated
5. **Test locally** - Run tests locally before pushing changes
6. **Use Renovate Dashboard** - Monitor dependency health centrally

---

**Need help?** Check the [GitHub Actions documentation](https://docs.github.com/en/actions) or [Renovate documentation](https://docs.renovatebot.com/) or create an issue in this repository. 