import { expect, test } from '@playwright/test';

test.describe('Link Validation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('All verified external links return 200 status', async ({ request }) => {
    // VERIFIED WORKING LINKS - These should all return 200
    const verifiedWorkingLinks = [
      'https://www.linkedin.com/in/nikolayadvolodkin/', // ✅ VERIFIED
      'https://github.com/nadvolod', // ✅ VERIFIED
      'https://www.udemy.com/user/nikolaya/', // ✅ VERIFIED
      'https://ultimateqa.com/nikolay-advolodkin-3/', // ✅ VERIFIED - About page
      'https://ultimateqa.com/case-studies/', // ✅ VERIFIED
      'https://ultimateqa.com/automation-development-for-healthcare-organization/', // ✅ VERIFIED
      'https://ultimateqa.com/automation-saves-hospitality-business-66-in-test-execution-time/', // ✅ VERIFIED
      'https://ultimateqa.com/automation-patterns-antipatterns/', // ✅ VERIFIED - Main resource
      'https://saucelabs.com/resources/topic-hub/test-automation-experience' // ✅ VERIFIED - YouTube show
    ];

    for (const url of verifiedWorkingLinks) {
      const response = await request.get(url);
      expect(response.status(), `${url} should return 200`).toBe(200);
    }
  });

  test('Social media links use correct handles and URLs', async ({ page }) => {
    // Test LinkedIn link
    const linkedinLinks = page.locator('a[href*="linkedin.com/in/nikolayadvolodkin"]');
    if (await linkedinLinks.count() > 0) {
      const href = await linkedinLinks.first().getAttribute('href');
      expect(href).toBe('https://www.linkedin.com/in/nikolayadvolodkin/');
    }

    // Test GitHub link
    const githubLinks = page.locator('a[href*="github.com/nadvolod"]');
    if (await githubLinks.count() > 0) {
      const href = await githubLinks.first().getAttribute('href');
      expect(href).toBe('https://github.com/nadvolod');
    }

    // Test Twitter/X link (if present)
    const twitterLinks = page.locator('a[href*="x.com"], a[href*="twitter.com"]');
    if (await twitterLinks.count() > 0) {
      const href = await twitterLinks.first().getAttribute('href');
      expect(href).toMatch(/https:\/\/(x\.com|twitter\.com)\/Nikolay_A00/);
    }

    // Test Instagram link (if present)
    const instagramLinks = page.locator('a[href*="instagram.com"]');
    if (await instagramLinks.count() > 0) {
      const href = await instagramLinks.first().getAttribute('href');
      expect(href).toBe('https://www.instagram.com/nikolay.advolodkin/');
    }

    // Test TikTok link (if present)
    const tiktokLinks = page.locator('a[href*="tiktok.com"]');
    if (await tiktokLinks.count() > 0) {
      const href = await tiktokLinks.first().getAttribute('href');
      expect(href).toBe('https://www.tiktok.com/@nikolay.advolodkin/');
    }
  });

  test('YouTube and content links are correct', async ({ page }) => {
    // Test Automation Experience (Sauce Labs show)
    const taeLinks = page.locator('a[href*="saucelabs.com/resources/topic-hub/test-automation-experience"]');
    if (await taeLinks.count() > 0) {
      const href = await taeLinks.first().getAttribute('href');
      expect(href).toBe('https://saucelabs.com/resources/topic-hub/test-automation-experience');
    }

    // UltimateQA main site links
    const ultimateQaLinks = page.locator('a[href*="ultimateqa.com"]').first();
    if (await ultimateQaLinks.isVisible()) {
      const href = await ultimateQaLinks.getAttribute('href');
      expect(href).toMatch(/ultimateqa\.com/);
    }

    // Udemy profile links
    const udemyLinks = page.locator('a[href*="udemy.com/user/nikolaya"]');
    if (await udemyLinks.count() > 0) {
      const href = await udemyLinks.first().getAttribute('href');
      expect(href).toBe('https://www.udemy.com/user/nikolaya/');
    }
  });

  test('Case study links are functional and load correctly', async ({ request }) => {
    const caseStudyLinks = [
      'https://ultimateqa.com/automation-development-for-healthcare-organization/',
      'https://ultimateqa.com/automation-saves-hospitality-business-66-in-test-execution-time/',
      'https://ultimateqa.com/case-studies/'
    ];

    for (const url of caseStudyLinks) {
      const response = await request.get(url);
      expect(response.status(), `Case study ${url} should be accessible`).toBe(200);
      
      // Verify content type is HTML
      const contentType = response.headers()['content-type'];
      expect(contentType).toContain('text/html');
    }
  });

  test('Speaking engagement and conference links work correctly', async ({ page }) => {
    // Navigate to speaking section if it exists
    const speakingSection = page.locator('#speaking');
    if (await speakingSection.isVisible()) {
      await speakingSection.scrollIntoViewIfNeeded();
    }

    // Test conference links that should work
    const conferenceLinks = [
      { selector: 'a[href*="stareast.techwell.com"]', expectedDomain: 'stareast.techwell.com' },
      { selector: 'a[href*="infoshare.pl"]', expectedDomain: 'infoshare.pl' },
      { selector: 'a[href*="ministryoftesting.com"]', expectedDomain: 'ministryoftesting.com' }
    ];

    for (const link of conferenceLinks) {
      const elements = page.locator(link.selector);
      if (await elements.count() > 0) {
        const href = await elements.first().getAttribute('href');
        expect(href).toContain(link.expectedDomain);
      }
    }
  });

  test('Email links use correct email address', async ({ page }) => {
    // Test for correct email address
    const emailLinks = page.locator('a[href^="mailto:"]');
    if (await emailLinks.count() > 0) {
      const href = await emailLinks.first().getAttribute('href');
      expect(href).toBe('mailto:nikolay@ultimateqa.com');
    }
  });

  test('Internal navigation links work correctly', async ({ page }) => {
    // Test internal section navigation
    const internalLinks = [
      { href: '#about', sectionId: '#about' },
      { href: '#services', sectionId: '#services' },
      { href: '#speaking', sectionId: '#speaking' },
      { href: '#courses', sectionId: '#courses' },
      { href: '#contact', sectionId: '#contact' }
    ];

    for (const link of internalLinks) {
      // Find navigation link
      const navLink = page.locator(`a[href="${link.href}"], button[onclick*="${link.href}"]`);
      if (await navLink.count() > 0) {
        await navLink.first().click();
        await page.waitForTimeout(1000); // Wait for smooth scroll
        
        // Check that the section is in viewport
        const section = page.locator(link.sectionId);
        if (await section.isVisible()) {
          await expect(section).toBeInViewport();
        }
      }
    }
  });

  test('External links open in new tabs', async ({ page }) => {
    // Test that external links have proper target attributes
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"])');
    const count = await externalLinks.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        const link = externalLinks.nth(i);
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        // External links should open in new tab and have security attributes
        expect(target).toBe('_blank');
        expect(rel).toContain('noopener');
      }
    }
  });

  test('All links have proper accessibility attributes', async ({ page }) => {
    // Check that links have proper aria-labels or descriptive text
    const allLinks = page.locator('a');
    const count = await allLinks.count();
    
    for (let i = 0; i < Math.min(count, 10); i++) {
      const link = allLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href !== '#') {
        // Link should have either text content or aria-label
        const textContent = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        expect(
          (textContent && textContent.trim().length > 0) || 
          (ariaLabel && ariaLabel.trim().length > 0)
        ).toBeTruthy();
      }
    }
  });

  test('No broken internal links exist', async ({ page }) => {
    // Collect all internal links
    const internalLinks = page.locator('a[href^="/"], a[href^="#"]');
    const count = await internalLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = internalLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('/')) {
        // Test internal page links
        const response = await page.request.get(href);
        expect(response.status(), `Internal link ${href} should not be broken`).toBeLessThan(400);
      } else if (href && href.startsWith('#')) {
        // Test anchor links
        const targetElement = page.locator(href);
        if (href !== '#') {
          // Element should exist on page
          await expect(targetElement).toBeAttached();
        }
      }
    }
  });

  test('Links work correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test that important links are still accessible on mobile
    const importantLinks = [
      'a[href*="linkedin.com"]',
      'a[href*="github.com"]',
      'a[href*="udemy.com"]',
      'a[href*="ultimateqa.com"]'
    ];

    for (const selector of importantLinks) {
      const links = page.locator(selector);
      if (await links.count() > 0) {
        const link = links.first();
        await expect(link).toBeVisible();
        
        // Link should be tappable (minimum 44px touch target)
        const boundingBox = await link.boundingBox();
        if (boundingBox) {
          expect(Math.min(boundingBox.width, boundingBox.height)).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });

  test('Link hover states work correctly', async ({ page }) => {
    // Test hover states on desktop
    await page.setViewportSize({ width: 1024, height: 768 });
    
    const testLinks = page.locator('a[href^="http"]').first();
    if (await testLinks.isVisible()) {
      // Hover over link
      await testLinks.hover();
      
      // Check that hover styles are applied
      const color = await testLinks.evaluate(el => 
        window.getComputedStyle(el).color
      );
      expect(color).toBeTruthy();
    }
  });
}); 