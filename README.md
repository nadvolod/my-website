# Nikolay Advolodkin - Personal Website

A high-performance, mobile-first personal website for Nikolay Advolodkin, Developer Advocate & Automation Expert. Built with Next.js 15.3.3, React 19, Framer Motion, and Tailwind CSS.

## 🚀 Performance Optimizations

### Mobile-First Responsive Design
- **Breakpoint Strategy**: 
  - Mobile: 320px - 768px (primary focus)
  - Tablet: 768px - 1024px
  - Desktop: 1024px+ (progressive enhancement)
- **Touch-Friendly Interface**:
  - Minimum 44px touch targets for all interactive elements
  - Optimized mobile navigation with hamburger menu
  - Floating action button for quick contact access
  - Touch-optimized form inputs with proper keyboard types

### Core Web Vitals Optimization (Target: 90+ PageSpeed Score)
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Performance Features
- **Image Optimization**:
  - Next.js 15.3.3 Image component with WebP/AVIF formats
  - Responsive images with srcset for different screen sizes
  - Lazy loading with intersection observer
  - Critical images preloaded, others lazy-loaded
- **Code Splitting & Bundling**:
  - Route-based code splitting with Next.js dynamic imports
  - Component-level lazy loading for heavy components
  - Tree shaking to eliminate unused code
- **Caching Strategy**:
  - Service worker for offline functionality
  - Browser caching with proper headers
  - CDN caching for static assets
- **Font Optimization**:
  - Font display: swap for better performance
  - Preload critical fonts only
  - Fallback fonts for better loading experience

## 🔗 Link Validation & Real Links

All external links have been validated and replaced with real working URLs:

### Social Media
- **LinkedIn**: https://www.linkedin.com/in/nikolayadvolodkin/
- **GitHub**: https://github.com/nadvolod
- **Twitter**: https://twitter.com/Nikolay_A00
- **YouTube**: https://www.youtube.com/@UltimateQA
- **Udemy**: https://www.udemy.com/user/nikolaya/

### Professional Links
- **UltimateQA Profile**: https://ultimateqa.com/nikolay-advolodkin/
- **Blog**: https://ultimateqa.com/blog/
- **Case Studies**: https://ultimateqa.com/case-studies/
- **Calendly**: https://calendly.com/nikolay-advolodkin

### Courses
- **Selenium Course**: https://www.udemy.com/course/selenium-webdriver-with-java-testng-and-log4j/
- **Playwright Course**: https://www.udemy.com/course/playwright-from-zero-to-hero/

## 📱 Mobile Optimizations

### Navigation
- Responsive hamburger menu with smooth animations
- Sticky header that adapts to scroll behavior
- Touch-friendly navigation items (44px minimum)
- External link handling with proper security attributes

### Floating Action Button
- Quick access to contact options on mobile
- Expandable menu with contact form and Calendly links
- Touch-optimized with proper feedback animations

### Viewport & Touch
- Proper viewport configuration for mobile devices
- Touch event optimization for better scroll performance
- Prevent zoom on input focus for better UX
- Support for safe area insets on modern devices

## 🛠️ Technical Stack

- **Framework**: Next.js 15.3.3 with App Router
- **React**: React 19 with modern hooks
- **Styling**: Tailwind CSS 4 with custom design system
- **Animations**: Framer Motion for smooth interactions
- **TypeScript**: Full type safety throughout
- **Performance**: Custom performance monitoring and optimization

## 🧪 Testing & Validation

### Performance Testing
```bash
npm run test:performance
```
Runs comprehensive performance tests including:
- Mobile and desktop Lighthouse audits
- Core Web Vitals measurement
- Touch target validation
- Bundle size analysis

### Link Validation
```bash
npm run test:links
```
Validates all external links to ensure they're working correctly.

### Bundle Analysis
```bash
npm run analyze
```
Analyzes bundle size and identifies optimization opportunities.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/nadvolod/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 📊 Performance Monitoring

The website includes built-in performance monitoring:

- **Core Web Vitals tracking** with real-time metrics
- **Performance Observer** for detailed timing analysis
- **Service Worker** for offline functionality and caching
- **Mobile-specific optimizations** for low-end devices

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Mobile-first breakpoint strategy
- Touch-friendly sizing utilities
- Custom color palette and animations
- Performance-optimized CSS

## 📈 Performance Targets

- **Mobile Performance Score**: 90+
- **Desktop Performance Score**: 95+
- **Largest Contentful Paint**: < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **All External Links**: 100% valid

## 🌐 PWA Features

- **Web App Manifest** for installable experience
- **Service Worker** for offline functionality
- **App shortcuts** for quick navigation
- **Responsive icons** for all device types

## 📝 License

This project is private and proprietary to Nikolay Advolodkin.

## 🤝 Contact

- **Website**: https://nikolayadvolodkin.com
- **LinkedIn**: https://www.linkedin.com/in/nikolayadvolodkin/
- **Email**: Contact through the website form
- **Calendly**: https://calendly.com/nikolay-advolodkin

---

Built with ❤️ by Nikolay Advolodkin - Developer Advocate & Automation Expert
