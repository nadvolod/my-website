# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal website for Nikolay Advolodkin (Developer Advocate & Automation Expert) built with:
- **Next.js 15.3.3** with App Router and TypeScript
- **React 19** with modern hooks
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Playwright** for end-to-end testing

## Common Development Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint linting
npm run format       # Format code with Prettier
```

### Testing
```bash
npm run test                         # Run all Playwright tests
npm run test:ui                      # Run tests with Playwright UI
npm run test:buttons                 # Test button functionality
npm run test:links:playwright        # Test link validation (browser)
npm run test:links:api              # Test link validation (API only)
npm run test:performance:playwright  # Test performance metrics
npm run test:report                  # View test reports
npm run test:performance             # Node.js performance analysis
npm run test:links                   # Node.js link validation
```

### Analysis
```bash
npm run analyze      # Bundle size analysis with @next/bundle-analyzer
```

## Architecture & Code Organization

### App Router Structure
- Uses Next.js App Router (`src/app/`)
- Layout defined in `src/app/layout.tsx` with comprehensive SEO metadata
- Main page at `src/app/page.tsx`
- API routes in `src/app/api/`

### Component Architecture
Components are organized in `src/components/` with clear separation:
- **Layout Components**: `Navigation`, `Header`, `ClientLayout`, `ThemeProvider`
- **Content Components**: `Hero`, `About`, `Projects`, `Speaking`, `Contact`
- **Utility Components**: `OptimizedImage`, `StructuredData`, `FloatingActionButton`
- **UI Components**: `src/components/ui/` for reusable UI elements

### Configuration Management
- **Website Data**: All statistics, contact info, and external links centralized in `src/config/stats.ts`
- **Non-technical updates**: Users can modify numbers, contact info, and social links in `stats.ts` without touching other code
- **Type Safety**: Configuration exported with `as const` for type safety

### Key Configuration Files
- `src/config/stats.ts` - All website data (stats, links, contact info)
- `src/lib/` - Utility functions (GitHub API, performance testing, link validation)
- `src/types/global.d.ts` - TypeScript type definitions

## Testing Strategy

### Playwright Configuration
- Test only on Chrome for the functional browser tests. Run the tests in headless mode and don't display html reports.
- Separate projects for API tests vs UI tests
- Performance monitoring with Core Web Vitals
- Link validation for all external URLs

### Test Structure
- `tests/button-functionality.spec.ts` - Interactive element testing
- `tests/link-validation.spec.ts` - External link validation
- `tests/performance.spec.ts` - Performance metrics testing
- `scripts/` - Node.js testing utilities for CI/CD

## Important Development Notes

### Data Updates
- Non-technical users update website content via `src/config/stats.ts`
- All external links are centralized and categorized for easy maintenance
- Critical vs non-critical links are separated for testing priorities

### Performance Optimization
- Images optimized with Next.js Image component
- Fonts preloaded with fallbacks defined
- Service Worker registered for offline functionality
- Bundle analysis available via `npm run analyze`

### SEO & Meta Configuration
- Comprehensive metadata in `layout.tsx`
- Structured data via `StructuredData` component
- Sitemap and robots.txt generation
- Social media cards configured

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to `src/*`
- Custom types in `src/types/`

## Deployment & CI/CD

- Optimized for Vercel deployment
- GitHub Actions workflows for quality checks
- Automated dependency updates via Renovate
- Performance monitoring with Lighthouse audits

## Development Best Practices

- Use TypeScript strict mode
- Follow existing component patterns in `src/components/`
- Update `src/config/stats.ts` for any data changes
- Run tests before deploying: `npm run test`
- Check bundle size after significant changes: `npm run analyze`
- Validate external links: `npm run test:links`