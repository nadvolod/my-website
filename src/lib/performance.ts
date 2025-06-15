'use client';

// Type definitions for performance APIs
declare global {
  interface Navigator {
    connection?: {
      effectiveType?: string;
    };
    deviceMemory?: number;
  }
}

// Core Web Vitals tracking and performance optimization utilities
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

// Rating function
function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Web Vitals tracking
export function trackWebVitals(onMetric: (metric: WebVitalsMetric) => void) {
  if (typeof window === 'undefined') return;

  // Track LCP (Largest Contentful Paint)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        
        if (lastEntry) {
          onMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            rating: getRating(lastEntry.startTime, THRESHOLDS.LCP),
            delta: lastEntry.startTime,
            id: 'lcp-' + Date.now(),
          });
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (error) {
      console.warn('LCP tracking failed:', error);
    }

    // Track FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & { processingStart: number };
          onMetric({
            name: 'FID',
            value: fidEntry.processingStart - fidEntry.startTime,
            rating: getRating(fidEntry.processingStart - fidEntry.startTime, THRESHOLDS.FID),
            delta: fidEntry.processingStart - fidEntry.startTime,
            id: 'fid-' + Date.now(),
          });
        });
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (error) {
      console.warn('FID tracking failed:', error);
    }

    // Track CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const clsEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        });
        
        onMetric({
          name: 'CLS',
          value: clsValue,
          rating: getRating(clsValue, THRESHOLDS.CLS),
          delta: clsValue,
          id: 'cls-' + Date.now(),
        });
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (error) {
      console.warn('CLS tracking failed:', error);
    }
  }

  // Track FCP (First Contentful Paint)
  if ('performance' in window && 'getEntriesByType' in performance) {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    
    if (fcpEntry) {
      onMetric({
        name: 'FCP',
        value: fcpEntry.startTime,
        rating: getRating(fcpEntry.startTime, THRESHOLDS.FCP),
        delta: fcpEntry.startTime,
        id: 'fcp-' + Date.now(),
      });
    }
  }

  // Track TTFB (Time to First Byte)
  if ('performance' in window && 'timing' in performance) {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      onMetric({
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
        delta: ttfb,
        id: 'ttfb-' + Date.now(),
      });
    }
  }
}

// Performance optimization utilities
export class PerformanceOptimizer {
  private static metrics: PerformanceMetrics = {};

  // Initialize performance tracking
  static init() {
    if (typeof window === 'undefined') return;

    // Track Web Vitals
    trackWebVitals((metric) => {
      this.metrics[metric.name.toLowerCase() as keyof PerformanceMetrics] = metric.value;
      
      // Log poor performance
      if (metric.rating === 'poor') {
        console.warn(`Poor ${metric.name} performance:`, metric.value);
      }
      
      // Send to analytics (implement your analytics service)
      this.sendToAnalytics(metric);
    });

    // Optimize images on scroll
    this.optimizeImageLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Optimize font loading
    this.optimizeFontLoading();
  }

  // Send metrics to analytics
  private static sendToAnalytics(metric: WebVitalsMetric) {
    // Implement your analytics service here
    // Example: Google Analytics 4, Vercel Analytics, etc.
    console.log('Web Vitals metric:', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
    
    // You can implement your preferred analytics service here
    // Examples:
    // - Google Analytics 4
    // - Vercel Analytics
    // - PostHog
    // - Custom analytics endpoint
  }

  // Optimize image loading with intersection observer
  private static optimizeImageLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01,
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  // Preload critical resources
  private static preloadCriticalResources() {
    const criticalResources = [
      { href: '/hero-image.jpg', as: 'image' },
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      document.head.appendChild(link);
    });
  }

  // Optimize font loading
  private static optimizeFontLoading() {
    if ('fonts' in document) {
      // Preload critical fonts
      const criticalFonts = [
        'Inter',
        'JetBrains Mono',
      ];

      criticalFonts.forEach((fontFamily) => {
        document.fonts.load(`1em ${fontFamily}`).catch(() => {
          console.warn(`Failed to preload font: ${fontFamily}`);
        });
      });
    }
  }

  // Get current metrics
  static getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Check if performance is good
  static isPerformanceGood(): boolean {
    const { lcp, fid, cls } = this.metrics;
    return (
      (!lcp || lcp <= THRESHOLDS.LCP.good) &&
      (!fid || fid <= THRESHOLDS.FID.good) &&
      (!cls || cls <= THRESHOLDS.CLS.good)
    );
  }

  // Get performance score (0-100)
  static getPerformanceScore(): number {
    const { lcp, fid, cls } = this.metrics;
    let score = 100;

    if (lcp) {
      if (lcp > THRESHOLDS.LCP.poor) score -= 40;
      else if (lcp > THRESHOLDS.LCP.good) score -= 20;
    }

    if (fid) {
      if (fid > THRESHOLDS.FID.poor) score -= 30;
      else if (fid > THRESHOLDS.FID.good) score -= 15;
    }

    if (cls) {
      if (cls > THRESHOLDS.CLS.poor) score -= 30;
      else if (cls > THRESHOLDS.CLS.good) score -= 15;
    }

    return Math.max(0, score);
  }
}

// Mobile-specific optimizations
export class MobileOptimizer {
  // Detect mobile device
  static isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Optimize for mobile
  static init() {
    if (!this.isMobile()) return;

    // Reduce motion for better performance
    this.reduceMotionOnLowEnd();
    
    // Optimize touch events
    this.optimizeTouchEvents();
    
    // Prevent zoom on input focus
    this.preventZoomOnInput();
  }

  // Reduce motion on low-end devices
  private static reduceMotionOnLowEnd() {
    // Check for low-end device indicators
    const isLowEnd = (
      navigator.hardwareConcurrency <= 2 ||
      navigator.deviceMemory && navigator.deviceMemory <= 2 ||
      navigator.connection?.effectiveType === 'slow-2g' ||
      navigator.connection?.effectiveType === '2g'
    );

    if (isLowEnd) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    }
  }

  // Optimize touch events
  private static optimizeTouchEvents() {
    // Add passive event listeners for better scroll performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
  }

  // Prevent zoom on input focus
  private static preventZoomOnInput() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        }
      });

      input.addEventListener('blur', () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes');
        }
      });
    });
  }
}

// Initialize performance tracking
if (typeof window !== 'undefined') {
  // Wait for page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      PerformanceOptimizer.init();
      MobileOptimizer.init();
    });
  } else {
    PerformanceOptimizer.init();
    MobileOptimizer.init();
  }
}

export default PerformanceOptimizer; 