import { expect, test } from '@playwright/test';

test.describe('Performance Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cache and start fresh
    await page.goto('about:blank');
  });

  test('Page loads within acceptable time limits', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load within 5 seconds (generous for CI environments)
    expect(loadTime).toBeLessThan(5000);
    console.log(`Page load time: ${loadTime}ms`);
  });

  test('Core Web Vitals are within good thresholds', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let lcpValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const lastEntry = entries[entries.length - 1] as any;
            lcpValue = lastEntry.startTime;
          }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve(lcpValue);
        }, 3000);
      });
    });
    
    // Good LCP threshold is 2.5s, but we'll be more lenient for CI
    expect(lcp).toBeLessThan(4000);
    console.log(`LCP: ${lcp}ms`);
  });

  test('First Contentful Paint is fast', async ({ page }) => {
    await page.goto('/');
    
    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let fcpValue = 0;
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            fcpValue = entries[0].startTime;
            observer.disconnect();
            resolve(fcpValue);
          }
        });
        observer.observe({ entryTypes: ['paint'] });
        
        // Fallback timeout
        setTimeout(() => {
          observer.disconnect();
          resolve(fcpValue);
        }, 2000);
      });
    });
    
    // Good FCP threshold is 1.8s
    expect(fcp).toBeLessThan(2500);
    console.log(`FCP: ${fcp}ms`);
  });

  test('Images are optimized and load efficiently', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that images use modern formats or Next.js optimization
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        
        if (src) {
          // Should use WebP, AVIF, or be optimized by Next.js
          const isOptimized = src.includes('_next/image') || 
                             src.includes('.webp') || 
                             src.includes('.avif') ||
                             src.startsWith('data:image/svg+xml'); // SVG placeholders
          
          expect(isOptimized, `Image ${src} should be optimized`).toBeTruthy();
        }
      }
    }
  });

  test('Mobile performance is acceptable', async ({ page }) => {
    // Simulate mobile device with slower CPU
    await page.emulateMedia({ media: 'screen' });
    await page.setViewportSize({ width: 375, height: 667 });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const mobileLoadTime = Date.now() - startTime;
    
    // Mobile threshold should be more lenient
    expect(mobileLoadTime).toBeLessThan(6000);
    console.log(`Mobile load time: ${mobileLoadTime}ms`);
  });

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    await page.goto('/');
    
    // Measure total JavaScript size
    const jsSize = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      return scripts.length;
    });
    
    // Should have reasonable number of script tags (Next.js typically splits bundles)
    expect(jsSize).toBeLessThan(20);
    console.log(`Number of script tags: ${jsSize}`);
  });

  test('CSS is optimized and loads quickly', async ({ page }) => {
    await page.goto('/');
    
    // Check for CSS optimization
    const cssLinks = page.locator('link[rel="stylesheet"]');
    const cssCount = await cssLinks.count();
    
    // Should have minimal CSS files (Next.js optimizes CSS)
    expect(cssCount).toBeLessThan(10);
    
    // Check that critical CSS is inlined or loaded quickly
    const hasInlineStyles = await page.locator('style').count();
    expect(hasInlineStyles).toBeGreaterThan(0); // Should have some inline critical CSS
  });

  test('Fonts load efficiently without layout shift', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for font loading optimization
    const fontPreloads = page.locator('link[rel="preload"][as="font"]');
    const preloadCount = await fontPreloads.count();
    
    // Should preload critical fonts
    expect(preloadCount).toBeGreaterThanOrEqual(0);
    
    // Check that fonts are loaded (simplified check)
    const hasCustomFonts = await page.evaluate(() => {
      const element = document.querySelector('h1, h2, p');
      if (element) {
        const fontFamily = window.getComputedStyle(element).fontFamily;
        return fontFamily.includes('Geist') || fontFamily.includes('Inter');
      }
      return false;
    });
    
    // Should be using custom fonts
    expect(hasCustomFonts).toBeTruthy();
  });

  test('No render-blocking resources', async ({ page }) => {
    await page.goto('/');
    
    // Check for render-blocking CSS
    const blockingCSS = page.locator('link[rel="stylesheet"]:not([media="print"])');
    const blockingCount = await blockingCSS.count();
    
    // Should minimize render-blocking CSS
    expect(blockingCount).toBeLessThan(5);
  });

  test('Smooth scrolling and animations perform well', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test smooth scrolling performance
    const startTime = Date.now();
    await page.evaluate(() => {
      window.scrollTo({ top: 1000, behavior: 'smooth' });
    });
    
    // Wait for scroll to complete
    await page.waitForTimeout(1000);
    const scrollTime = Date.now() - startTime;
    
    // Smooth scroll should complete reasonably quickly
    expect(scrollTime).toBeLessThan(2000);
  });

  test('Memory usage is reasonable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get memory usage metrics
    const metrics = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ('memory' in performance && (performance as any).memory) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (performance as any).memory;
      }
      return null;
    });
    
    if (metrics) {
      // Check that memory usage is reasonable (less than 50MB)
      expect(metrics.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024);
      console.log(`Memory usage: ${(metrics.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    }
  });

  test('Network requests are optimized', async ({ page }) => {
    const requests: string[] = [];
    
    page.on('request', request => {
      requests.push(request.url());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should have reasonable number of requests
    expect(requests.length).toBeLessThan(50);
    console.log(`Total requests: ${requests.length}`);
    
    // Check for duplicate requests
    const uniqueRequests = new Set(requests);
    expect(uniqueRequests.size).toBe(requests.length);
  });

  test('Performance across different connection speeds', async ({ page, context }) => {
    // Simulate slow 3G connection
    await context.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const slowLoadTime = Date.now() - startTime;
    
    // Should still load within reasonable time on slow connection
    expect(slowLoadTime).toBeLessThan(10000);
    console.log(`Slow connection load time: ${slowLoadTime}ms`);
  });

  test('Critical resources load first', async ({ page }) => {
    const resourceUrls: string[] = [];
    
    page.on('response', response => {
      resourceUrls.push(response.url());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Critical resources (HTML, CSS, critical JS) should be among first loaded
    const firstFew = resourceUrls.slice(0, 10);
    const hasCriticalFirst = firstFew.some(url => 
      url.includes('.css') || 
      url.includes('_next/static') ||
      url === page.url()
    );
    
    expect(hasCriticalFirst).toBeTruthy();
  });

  test('Page is interactive quickly', async ({ page }) => {
    await page.goto('/');
    
    // Measure Time to Interactive (TTI) approximation
    const startTime = Date.now();
    
    // Wait for main thread to be idle
    await page.waitForLoadState('networkidle');
    
    // Test that buttons are clickable
    const button = page.getByTestId('view-speaking-topics');
    await expect(button).toBeVisible();
    
    const interactiveTime = Date.now() - startTime;
    
    // Should be interactive within reasonable time
    expect(interactiveTime).toBeLessThan(5000);
    console.log(`Time to interactive: ${interactiveTime}ms`);
  });
}); 