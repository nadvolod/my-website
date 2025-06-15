#!/usr/bin/env node

/**
 * Performance Testing Script for Nikolay Advolodkin's Website
 * Tests mobile performance, Core Web Vitals, and link validation
 */

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  url: 'http://localhost:3000',
  mobileViewport: {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
  desktopViewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  },
  lighthouseConfig: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'mobile',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
      screenEmulation: {
        mobile: true,
        width: 390,
        height: 844,
        deviceScaleFactor: 3,
        disabled: false,
      },
      emulatedUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    },
  },
};

// Real links to validate
const LINKS_TO_VALIDATE = [
  'https://www.linkedin.com/in/nikolayadvolodkin/',
  'https://github.com/nadvolod',
  'https://ultimateqa.com/nikolay-advolodkin/',
  'https://www.udemy.com/user/nikolaya/',
  'https://twitter.com/Nikolay_A00',
  'https://ultimateqa.com/blog/',
  'https://calendly.com/nikolay-advolodkin',
  'https://ultimateqa.com/case-studies/',
];

class PerformanceTester {
  constructor() {
    this.results = {
      mobile: {},
      desktop: {},
      links: {},
      timestamp: new Date().toISOString(),
    };
  }

  async runAllTests() {
    console.log('🚀 Starting comprehensive performance tests...\n');

    try {
      // Test mobile performance
      console.log('📱 Testing mobile performance...');
      this.results.mobile = await this.testMobilePerformance();

      // Test desktop performance
      console.log('🖥️  Testing desktop performance...');
      this.results.desktop = await this.testDesktopPerformance();

      // Validate links
      console.log('🔗 Validating external links...');
      this.results.links = await this.validateLinks();

      // Test Core Web Vitals
      console.log('⚡ Testing Core Web Vitals...');
      await this.testCoreWebVitals();

      // Generate report
      await this.generateReport();

      console.log('\n✅ All tests completed successfully!');
      console.log('📊 Report saved to: performance-report.json');

    } catch (error) {
      console.error('❌ Test failed:', error);
      process.exit(1);
    }
  }

  async testMobilePerformance() {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    try {
      const result = await lighthouse(CONFIG.url, {
        port: chrome.port,
        ...CONFIG.lighthouseConfig,
      });

      const scores = {
        performance: result.lhr.categories.performance.score * 100,
        accessibility: result.lhr.categories.accessibility.score * 100,
        bestPractices: result.lhr.categories['best-practices'].score * 100,
        seo: result.lhr.categories.seo.score * 100,
        pwa: result.lhr.categories.pwa?.score * 100 || 0,
      };

      const metrics = {
        firstContentfulPaint: result.lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: result.lhr.audits['largest-contentful-paint'].numericValue,
        firstInputDelay: result.lhr.audits['max-potential-fid'].numericValue,
        cumulativeLayoutShift: result.lhr.audits['cumulative-layout-shift'].numericValue,
        speedIndex: result.lhr.audits['speed-index'].numericValue,
        totalBlockingTime: result.lhr.audits['total-blocking-time'].numericValue,
      };

      console.log(`   Performance Score: ${scores.performance.toFixed(1)}/100`);
      console.log(`   LCP: ${(metrics.largestContentfulPaint / 1000).toFixed(2)}s`);
      console.log(`   CLS: ${metrics.cumulativeLayoutShift.toFixed(3)}`);

      return { scores, metrics };
    } finally {
      await chrome.kill();
    }
  }

  async testDesktopPerformance() {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    try {
      const desktopConfig = {
        ...CONFIG.lighthouseConfig,
        settings: {
          ...CONFIG.lighthouseConfig.settings,
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
            disabled: false,
          },
        },
      };

      const result = await lighthouse(CONFIG.url, {
        port: chrome.port,
        ...desktopConfig,
      });

      const scores = {
        performance: result.lhr.categories.performance.score * 100,
        accessibility: result.lhr.categories.accessibility.score * 100,
        bestPractices: result.lhr.categories['best-practices'].score * 100,
        seo: result.lhr.categories.seo.score * 100,
      };

      console.log(`   Performance Score: ${scores.performance.toFixed(1)}/100`);

      return { scores };
    } finally {
      await chrome.kill();
    }
  }

  async validateLinks() {
    const results = {};
    
    for (const link of LINKS_TO_VALIDATE) {
      try {
        const response = await fetch(link, { 
          method: 'HEAD',
          timeout: 10000,
        });
        
        results[link] = {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
        };
        
        console.log(`   ✅ ${link} - ${response.status}`);
      } catch (error) {
        results[link] = {
          status: 0,
          ok: false,
          error: error.message,
        };
        
        console.log(`   ❌ ${link} - ${error.message}`);
      }
    }

    return results;
  }

  async testCoreWebVitals() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Set mobile viewport
      await page.setViewport(CONFIG.mobileViewport);

      // Navigate to page
      await page.goto(CONFIG.url, { waitUntil: 'networkidle0' });

      // Inject Web Vitals measurement
      const vitals = await page.evaluate(() => {
        return new Promise((resolve) => {
          const vitals = {};
          
          // Measure LCP
          if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              const lastEntry = entries[entries.length - 1];
              vitals.lcp = lastEntry.startTime;
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

            // Measure CLS
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries();
              entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              });
              vitals.cls = clsValue;
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
          }

          // Wait for measurements
          setTimeout(() => {
            resolve(vitals);
          }, 3000);
        });
      });

      console.log(`   LCP: ${(vitals.lcp / 1000).toFixed(2)}s`);
      console.log(`   CLS: ${vitals.cls.toFixed(3)}`);

      this.results.coreWebVitals = vitals;
    } finally {
      await browser.close();
    }
  }

  async testMobileFriendliness() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.setViewport(CONFIG.mobileViewport);
      await page.goto(CONFIG.url);

      // Test touch targets
      const touchTargets = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button, a');
        const smallTargets = [];
        
        buttons.forEach((button) => {
          const rect = button.getBoundingClientRect();
          const size = Math.min(rect.width, rect.height);
          if (size < 44) {
            smallTargets.push({
              element: button.tagName,
              size: size,
              text: button.textContent?.slice(0, 50),
            });
          }
        });
        
        return smallTargets;
      });

      // Test viewport
      const viewportTest = await page.evaluate(() => {
        const viewport = document.querySelector('meta[name="viewport"]');
        return {
          hasViewport: !!viewport,
          content: viewport?.getAttribute('content'),
        };
      });

      console.log(`   Touch targets < 44px: ${touchTargets.length}`);
      console.log(`   Viewport configured: ${viewportTest.hasViewport}`);

      return { touchTargets, viewportTest };
    } finally {
      await browser.close();
    }
  }

  async generateReport() {
    const reportPath = path.join(process.cwd(), 'performance-report.json');
    await fs.writeFile(reportPath, JSON.stringify(this.results, null, 2));

    // Generate summary
    const summary = {
      mobilePerformance: this.results.mobile.scores?.performance || 0,
      desktopPerformance: this.results.desktop.scores?.performance || 0,
      validLinks: Object.values(this.results.links).filter(link => link.ok).length,
      totalLinks: Object.keys(this.results.links).length,
      coreWebVitals: this.results.coreWebVitals,
    };

    console.log('\n📊 Performance Summary:');
    console.log(`   Mobile Performance: ${summary.mobilePerformance.toFixed(1)}/100`);
    console.log(`   Desktop Performance: ${summary.desktopPerformance.toFixed(1)}/100`);
    console.log(`   Valid Links: ${summary.validLinks}/${summary.totalLinks}`);
    
    if (summary.coreWebVitals) {
      console.log(`   LCP: ${(summary.coreWebVitals.lcp / 1000).toFixed(2)}s`);
      console.log(`   CLS: ${summary.coreWebVitals.cls.toFixed(3)}`);
    }

    // Check if targets are met
    const targets = {
      mobilePerformance: summary.mobilePerformance >= 90,
      desktopPerformance: summary.desktopPerformance >= 95,
      allLinksValid: summary.validLinks === summary.totalLinks,
      lcpGood: summary.coreWebVitals?.lcp <= 2500,
      clsGood: summary.coreWebVitals?.cls <= 0.1,
    };

    const allTargetsMet = Object.values(targets).every(Boolean);
    
    console.log(`\n${allTargetsMet ? '✅' : '❌'} Performance Targets: ${allTargetsMet ? 'PASSED' : 'FAILED'}`);
    
    return summary;
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new PerformanceTester();
  tester.runAllTests().catch(console.error);
}

module.exports = PerformanceTester; 