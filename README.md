# 🚀 Nikolay Advolodkin - Personal Website

<!-- Badges Section -->
<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[![Performance](https://img.shields.io/badge/Performance-95%2B-brightgreen?style=for-the-badge&logo=lighthouse&logoColor=white)](https://developers.google.com/web/tools/lighthouse)
[![Mobile First](https://img.shields.io/badge/Mobile_First-✓-success?style=for-the-badge&logo=mobile&logoColor=white)](https://web.dev/mobile-first/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![SEO Optimized](https://img.shields.io/badge/SEO-Optimized-orange?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/search/docs)

[![Playwright](https://img.shields.io/badge/Testing-Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)](https://choosealicense.com/licenses/)

</div>

---

**A high-performance, mobile-first personal website for Nikolay Advolodkin, Developer Advocate & Automation Expert. Built with cutting-edge technologies and optimized for exceptional user experience.**

## 📋 Table of Contents

- [🎯 Quick Start for Non-Technical Users](#-quick-start-for-non-technical-users)
- [📊 How to Update Website Data](#-how-to-update-website-data)
- [🚀 Developer Quick Start](#-developer-quick-start)
- [🛠️ Technical Stack](#️-technical-stack)
- [📱 Features & Capabilities](#-features--capabilities)
- [⚡ Performance Optimizations](#-performance-optimizations)
- [🤖 CI/CD Pipeline](#-cicd-pipeline)
- [🧪 Testing & Quality Assurance](#-testing--quality-assurance)
- [📈 Performance Targets](#-performance-targets)
- [🔧 Configuration](#-configuration)
- [📝 Available Scripts](#-available-scripts)
- [🌐 Deployment](#-deployment)
- [🤝 Support & Contact](#-support--contact)

---

## 🎯 Quick Start for Non-Technical Users

> **Perfect for Virtual Assistants and Content Managers**

### What You Can Update Without Technical Knowledge

✅ **Statistics & Numbers** (students taught, years of experience, etc.)  
✅ **Contact Information** (email, phone, location)  
✅ **Social Media Links** (LinkedIn, Twitter, YouTube, etc.)  
✅ **Achievement Badges** (conference talks, projects completed)  
✅ **Company Information** (founding year, team size)  
✅ **Response Times** (how fast Nikolay responds to different inquiries)

### ⚠️ What You Should NOT Touch

❌ Code files (anything ending in `.tsx`, `.ts`, `.js`)  
❌ Configuration files (`package.json`, `next.config.js`)  
❌ Styling files (`tailwind.config.js`, `.css` files)  
❌ Build or deployment settings

---

## 📊 How to Update Website Data

### 🎯 Step-by-Step Instructions

1. **Locate the Data File**
   - Navigate to: `src/config/stats.ts`
   - This file contains ALL the numbers and information on the website

2. **Update Statistics**
   ```typescript
   // Example: To change students taught from 150,000+ to 200,000+
   studentsTraught: "200,000+",  // Change this number
   ```

3. **Update Contact Information**
   ```typescript
   // Example: To change email address
   email: "new-email@example.com",  // Change this email
   ```

4. **Update Social Media Links**
   ```typescript
   // Example: To update LinkedIn URL
   linkedin: "https://www.linkedin.com/in/your-new-profile/",
   ```

### 📋 Complete List of Updatable Data

#### Student & Training Statistics
- `studentsTraught`: Total students trained (e.g., "150,000+")
- `countriesReached`: Countries reached (e.g., "190")
- `yearsExperience`: Years of experience (e.g., "16+")

#### Course & Education Stats
- `udemyStudents`: Udemy students (e.g., "75,000+")
- `udemyCourses`: Number of courses (e.g., "12")
- `udemyRating`: Course rating (e.g., "4.6")
- `udemyReviews`: Number of reviews (e.g., "8,500+")

#### Speaking & Content
- `conferenceTalks`: Conference presentations (e.g., "50+")
- `workshopsDelivered`: Workshops given (e.g., "100+")
- `blogPosts`: Blog articles written (e.g., "200+")

#### Business Impact
- `testingTimeReduction`: Efficiency improvement (e.g., "80%")
- `clientSatisfactionRate`: Client satisfaction (e.g., "98%")
- `projectsCompleted`: Projects finished (e.g., "200+")

#### Social Media Following
- `linkedInFollowers`: LinkedIn followers (e.g., "25,000+")
- `youTubeSubscribers`: YouTube subscribers (e.g., "15,000+")
- `newsletterSubscribers`: Newsletter subscribers (e.g., "10,000+")

#### Contact & Response Information
- `email`: Primary email address
- `location`: Current location (e.g., "Miami, FL")
- `timezone`: Time zone (e.g., "Eastern Time (UTC-5)")
- `generalInquiryResponse`: Response time in hours (e.g., "24")
- `speakingEngagementResponse`: Speaking inquiry response time (e.g., "12")

### ⚠️ Important Rules When Updating

1. **Keep the Quotes**: Always keep text in quotes: `"150,000+"`
2. **Keep the Commas**: Don't remove commas at the end of lines
3. **Test After Changes**: Check the website after updating
4. **Backup First**: Make a copy of the file before major changes

### 🆘 If Something Goes Wrong

- **Undo your changes** and restore the original file
- **Contact the developer** with details about what was changed
- **Check the browser console** for any error messages

---

## 🚀 Developer Quick Start

### Prerequisites
- **Node.js 18+** (Latest LTS recommended)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/nadvolod/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

### Development Environment

```bash
# Development server (with Turbopack for faster builds)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Code formatting
npm run format

# Linting
npm run lint
```

---

## 🛠️ Technical Stack

### Core Technologies
- **⚡ Next.js 15.3.3** - React framework with App Router
- **⚛️ React 19** - Latest React with modern hooks
- **🎨 Tailwind CSS 4** - Utility-first CSS framework
- **🎭 Framer Motion 11.18.2** - Smooth animations and interactions
- **📘 TypeScript 5** - Type safety throughout the application
- **🎯 Headless UI** - Accessible component primitives

### Development & Quality
- **🎭 Playwright** - End-to-end testing framework
- **🔍 ESLint** - Code quality and consistency
- **💅 Prettier** - Code formatting
- **📊 Lighthouse** - Performance monitoring
- **🔗 Link Validation** - Automated link checking

### Performance & SEO
- **🚀 Turbopack** - Ultra-fast bundler for development
- **📱 Mobile-First** - Responsive design approach
- **🌐 PWA Ready** - Progressive Web App capabilities
- **🔍 SEO Optimized** - Meta tags, structured data, sitemaps
- **⚡ Core Web Vitals** - Optimized for Google's performance metrics

---

## 📱 Features & Capabilities

### 🎮 Interactive Elements
- **Automation Tic-Tac-Toe Game** - Educational game showcasing automation vs manual testing
- **HubSpot Integration** - Contact forms and lead capture
- **Floating Action Button** - Quick access to contact options
- **Smooth Animations** - Framer Motion powered interactions

### 📊 Dynamic Content
- **Real-time Statistics** - Live updating of achievements and metrics
- **GitHub Integration** - Automatic project data fetching
- **Social Media Links** - Centralized link management
- **Achievement Badges** - Visual representation of accomplishments

### 🔧 Technical Features
- **Service Worker** - Offline functionality and caching
- **Image Optimization** - WebP/AVIF formats with lazy loading
- **Code Splitting** - Route-based and component-level splitting
- **Bundle Analysis** - Size optimization and tree shaking

### 📱 Mobile Optimizations
- **Touch-Friendly Interface** - 44px minimum touch targets
- **Responsive Navigation** - Hamburger menu with smooth animations
- **Mobile-First Design** - Optimized for mobile devices first
- **Safe Area Support** - Modern device compatibility

---

## ⚡ Performance Optimizations

### 🎯 Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 🖼️ Image Optimization
- **Next.js Image Component** - Automatic WebP/AVIF conversion
- **Responsive Images** - Multiple sizes for different screens
- **Lazy Loading** - Intersection Observer based loading
- **Critical Image Preloading** - Above-the-fold optimization

### 📦 Bundle Optimization
- **Route-Based Code Splitting** - Automatic with Next.js
- **Component Lazy Loading** - Dynamic imports for heavy components
- **Tree Shaking** - Unused code elimination
- **Bundle Analysis** - Size monitoring and optimization

### 🏠 Caching Strategy
- **Service Worker** - Offline functionality
- **Browser Caching** - Proper cache headers
- **CDN Caching** - Static asset optimization
- **Font Optimization** - Preload critical fonts only

---

## 🤖 CI/CD Pipeline

### 🔄 Automated Workflows

The project includes a comprehensive CI/CD pipeline powered by **GitHub Actions**:

#### 🧪 **Main CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
- **Quality Checks**: ESLint, Prettier, TypeScript compilation
- **Testing Suite**: Playwright E2E tests, link validation, performance tests
- **Security Audit**: npm audit, dependency vulnerability scanning
- **Build Analysis**: Bundle size monitoring and optimization
- **Preview Deployments**: Automatic Vercel preview for pull requests
- **Production Deployment**: Automated deployment to production on main branch
- **Health Checks**: Post-deployment monitoring and Lighthouse audits

#### 📦 **Dependency Management** (Renovate Bot)
- **Smart Scheduling**: Automated updates every Monday before 6 AM PT
- **Intelligent Grouping**: Related packages updated together (React, Next.js, TypeScript, etc.)
- **Auto-merge Capabilities**: Safe updates (patch/minor) automatically merged
- **Security Monitoring**: Immediate alerts for vulnerability fixes
- **Dependency Dashboard**: Centralized tracking via GitHub issue
- **GitHub Actions Pinning**: Automatic digest pinning for security

#### ⚡ **Performance Monitoring** (`.github/workflows/performance-monitor.yml`)
- **Daily Audits**: Lighthouse performance audits for mobile and desktop
- **Core Web Vitals**: Continuous monitoring of performance metrics
- **Threshold Alerts**: Automated alerts when performance drops below targets
- **Performance Reports**: Detailed artifacts with optimization recommendations

### 🔧 **Setup Requirements**

To enable CI/CD, configure these GitHub repository secrets:
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

📖 **Full setup guide**: [`.github/SETUP.md`](.github/SETUP.md)

---

## 🧪 Testing & Quality Assurance

### 🎭 Playwright Testing Suite

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Run specific test suites
npm run test:buttons          # Button functionality tests
npm run test:links:playwright # Link validation tests
npm run test:performance:playwright # Performance tests

# View test reports
npm run test:report
```

### 🔍 Performance Testing

```bash
# Run performance analysis
npm run test:performance

# Analyze bundle size
npm run analyze

# Validate all external links
npm run test:links
```

### 📊 Test Coverage
- **Button Functionality** - All interactive elements
- **Link Validation** - External link checking
- **Performance Metrics** - Core Web Vitals monitoring
- **Mobile Responsiveness** - Touch target validation
- **Accessibility** - WCAG compliance testing

---

## 📈 Performance Targets

### 🎯 Lighthouse Scores
- **Mobile Performance**: 90+ (Target: 95+)
- **Desktop Performance**: 95+ (Target: 98+)
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### 📊 Core Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Speed Index**: < 3.0s

### 🔗 Link Validation
- **External Links**: 100% valid
- **Internal Navigation**: Fully functional
- **Social Media Links**: All verified
- **Contact Forms**: Properly integrated

---

## 🔧 Configuration

### 🌍 Environment Variables

Create a `.env.local` file for local development:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Nikolay Advolodkin"

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# HubSpot Integration (Optional)
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-portal-id

# Performance Monitoring (Optional)
NEXT_PUBLIC_PERFORMANCE_MONITORING=true
```

### ⚙️ Tailwind Configuration

Custom configuration includes:
- **Mobile-First Breakpoints** - 320px, 768px, 1024px+
- **Touch-Friendly Utilities** - Minimum 44px sizing
- **Custom Color Palette** - Brand-consistent colors
- **Animation Utilities** - Smooth transitions and effects

### 🎨 Theme Configuration

The website supports:
- **Light/Dark Mode** - System preference detection
- **Custom Color Schemes** - Brand-consistent palette
- **Responsive Typography** - Fluid text scaling
- **Accessibility Features** - High contrast support

---

## 📝 Available Scripts

### 🚀 Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run format       # Format code with Prettier
npm run lint         # Run ESLint
```

### 🧪 Testing
```bash
npm run test                    # Run all Playwright tests
npm run test:ui                # Run tests with UI
npm run test:headed            # Run tests in headed mode
npm run test:buttons           # Test button functionality
npm run test:links:playwright  # Test link validation
npm run test:performance:playwright # Test performance
npm run test:report            # View test reports
npm run test:install           # Install Playwright browsers
```

### 📊 Analysis
```bash
npm run test:performance  # Run performance analysis
npm run test:links       # Validate external links
npm run analyze          # Bundle size analysis
```

---

## 🌐 Deployment

### 🚀 Vercel Deployment (Recommended)

The site is optimized for Vercel deployment:

1. **Connect Repository** to Vercel
2. **Configure Environment Variables** (if needed)
3. **Deploy** - Automatic builds on push to main branch

### 🤖 Automated CI/CD

The GitHub Actions pipeline automatically:
- **Tests** all code changes
- **Deploys previews** for pull requests
- **Deploys to production** when changes merge to main
- **Monitors performance** post-deployment
- **Updates dependencies** weekly

### 🔧 Build Configuration

```bash
# Production build
npm run build

# Test production build locally
npm run start
```

### 📊 Performance Monitoring

Post-deployment monitoring includes:
- **Core Web Vitals** tracking
- **Real User Monitoring** (RUM)
- **Error tracking** and reporting
- **Performance alerts** for regressions

---

## 🤝 Support & Contact

### 👨‍💻 Developer Contact
- **Website**: [nikolayadvolodkin.com](https://nikolayadvolodkin.com)
- **LinkedIn**: [Nikolay Advolodkin](https://www.linkedin.com/in/nikolayadvolodkin/)
- **GitHub**: [@nadvolod](https://github.com/nadvolod)
- **Email**: Contact through website form

### 🆘 Getting Help

**For Non-Technical Users:**
1. Check the [data update guide](#-how-to-update-website-data) above
2. Make sure to backup files before changes
3. Contact the developer if something breaks

**For Developers:**
1. Check the [development guide](#-developer-quick-start)
2. Run tests before deploying
3. Monitor performance after changes

### 📚 Additional Resources

- **[STATS-UPDATE-GUIDE.md](STATS-UPDATE-GUIDE.md)** - Detailed statistics update guide
- **[README-Contact.md](README-Contact.md)** - Contact form configuration
- **[README-Navigation-SEO.md](README-Navigation-SEO.md)** - SEO and navigation setup
- **[README-Projects.md](README-Projects.md)** - Projects section management
- **[README-Speaking.md](README-Speaking.md)** - Speaking engagements setup
- **[.github/SETUP.md](.github/SETUP.md)** - CI/CD pipeline setup guide

---

<div align="center">

**Built with ❤️ by Nikolay Advolodkin**  
*Developer Advocate & Automation Expert*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nikolayadvolodkin/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nadvolod)
[![Website](https://img.shields.io/badge/Website-Visit-FF6B6B?style=for-the-badge&logo=safari&logoColor=white)](https://nikolayadvolodkin.com)

</div> 