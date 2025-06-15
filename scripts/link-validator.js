#!/usr/bin/env node

/**
 * Link Validator for Nikolay Advolodkin's Website
 * Validates all external links to ensure they're working
 */

// Import the real links directly
const realLinks = {
  linkedin: "https://www.linkedin.com/in/nikolayadvolodkin/",
  github: "https://github.com/nadvolod",
  ultimateQA: "https://ultimateqa.com/nikolay-advolodkin/",
  udemy: "https://www.udemy.com/user/nikolaya/",
  twitter: "https://twitter.com/Nikolay_A00",
  youtube: "https://www.youtube.com/@UltimateQA",
  blog: "https://ultimateqa.com/blog/",
  newsletter: "https://ultimateqa.com/newsletter/",
  company: "https://ultimateqa.com/",
  companyAbout: "https://ultimateqa.com/about/",
  healthcareCase: "https://ultimateqa.com/automation-development-for-healthcare-organization/",
  hotelCase: "https://ultimateqa.com/automation-saves-hospitality-business-66-in-test-execution-time/",
  allCaseStudies: "https://ultimateqa.com/case-studies/",
  automationCourse: "https://www.udemy.com/course/selenium-webdriver-with-java-testng-and-log4j/",
  playwrightCourse: "https://www.udemy.com/course/playwright-from-zero-to-hero/",
  seleniumCourse: "https://www.udemy.com/course/selenium-webdriver-with-java-testng-and-log4j/",
  starEast: "https://stareast.techwell.com/",
  infoShare: "https://infoshare.pl/",
  seleniumConf: "https://seleniumconf.com/",
  calendly: "https://calendly.com/nikolay-advolodkin",
};

const TIMEOUT = 10000; // 10 seconds

class LinkValidator {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      total: 0,
      timestamp: new Date().toISOString(),
    };
  }

  async validateAllLinks() {
    console.log('🔗 Starting link validation...\n');

    // Get all external links from realLinks
    const linksToTest = Object.entries(realLinks)
      .filter(([_key, url]) => url.startsWith('http'))
      .map(([key, url]) => ({ key, url }));

    this.results.total = linksToTest.length;

    for (const { key, url } of linksToTest) {
      await this.validateLink(key, url);
    }

    this.generateReport();
  }

  async validateLink(key, url) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      const response = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkValidator/1.0)',
        },
      });

      clearTimeout(timeoutId);

      const result = {
        key,
        url,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      };

      if (response.ok) {
        this.results.passed.push(result);
        console.log(`✅ ${key}: ${url} (${response.status})`);
      } else {
        this.results.failed.push(result);
        console.log(`❌ ${key}: ${url} (${response.status} ${response.statusText})`);
      }
    } catch (error) {
      const result = {
        key,
        url,
        error: error.message,
        ok: false,
      };

      this.results.failed.push(result);
      console.log(`❌ ${key}: ${url} (${error.message})`);
    }
  }

  generateReport() {
    const passRate = (this.results.passed.length / this.results.total) * 100;

    console.log('\n📊 Link Validation Summary:');
    console.log(`   Total Links: ${this.results.total}`);
    console.log(`   Passed: ${this.results.passed.length}`);
    console.log(`   Failed: ${this.results.failed.length}`);
    console.log(`   Pass Rate: ${passRate.toFixed(1)}%`);

    if (this.results.failed.length > 0) {
      console.log('\n❌ Failed Links:');
      this.results.failed.forEach(({ key, url, error, status }) => {
        console.log(`   ${key}: ${url} - ${error || `${status}`}`);
      });
    }

    const allPassed = this.results.failed.length === 0;
    console.log(`\n${allPassed ? '✅' : '❌'} Link Validation: ${allPassed ? 'PASSED' : 'FAILED'}`);

    return this.results;
  }
}

// Run validation if called directly
const validator = new LinkValidator();
validator.validateAllLinks().catch(console.error); 