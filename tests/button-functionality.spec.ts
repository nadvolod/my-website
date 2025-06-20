import { expect, test } from '@playwright/test';

test.describe('Button Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('Hero section buttons are clickable and navigate correctly', async ({ page }) => {
    // Test "View Speaking Topics" button
    const viewSpeakingBtn = page.getByTestId('view-speaking-topics');
    await expect(viewSpeakingBtn).toBeVisible();
    await viewSpeakingBtn.click();
    
    // Should scroll to speaking section
    await page.waitForTimeout(1000); // Wait for smooth scroll
    const speakingSection = page.locator('#speaking');
    await expect(speakingSection).toBeInViewport();

    // Test "Explore Courses" button
    const exploreCoursesBtn = page.getByTestId('explore-courses');
    await expect(exploreCoursesBtn).toBeVisible();
    await exploreCoursesBtn.click();
    
    // Should scroll to courses section
    await page.waitForTimeout(1000); // Wait for smooth scroll
    const coursesSection = page.locator('#courses');
    await expect(coursesSection).toBeInViewport();
  });

  test('All service discovery call buttons are present and functional', async ({ page }) => {
    // Test that all 4 service discovery call buttons exist
    const discoveryButtons = [
      'automated-testing-discovery-call',
      'ai-training-business-discovery-call', 
      'ai-training-developers-discovery-call',
      'web-development-discovery-call'
    ];

    for (const buttonId of discoveryButtons) {
      const button = page.getByTestId(buttonId);
      await expect(button).toBeVisible();
      
      // Click the button to open modal
      await button.click();
      
      // Check that HubSpot modal opens
      const modal = page.getByTestId('hubspot-modal');
      await expect(modal).toBeVisible();
      
      // Close modal
      const closeBtn = page.getByTestId('modal-close');
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    }
  });

  test('HubSpot forms load and can be filled out', async ({ page }) => {
    // Click first discovery call button
    const discoveryBtn = page.getByTestId('automated-testing-discovery-call');
    await discoveryBtn.click();
    
    // Wait for modal to appear
    const modal = page.getByTestId('hubspot-modal');
    await expect(modal).toBeVisible();
    
    // Fill out the fallback form (since HubSpot might not load in tests)
    await page.fill('input[name="firstname"]', 'Test');
    await page.fill('input[name="lastname"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'Test Company');
    await page.fill('textarea[name="message"]', 'Test automation inquiry');
    
    // Verify form fields are filled
    await expect(page.locator('input[name="firstname"]')).toHaveValue('Test');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });

  test('Theme toggle button works correctly', async ({ page }) => {
    const themeToggle = page.getByTestId('theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Get initial theme
    const htmlElement = page.locator('html');
    const initialClass = await htmlElement.getAttribute('class');
    
    // Click theme toggle
    await themeToggle.click();
    await page.waitForTimeout(500); // Wait for theme change
    
    // Verify theme changed
    const newClass = await htmlElement.getAttribute('class');
    expect(newClass).not.toBe(initialClass);
    
    // Click again to toggle back
    await themeToggle.click();
    await page.waitForTimeout(500);
    
    const finalClass = await htmlElement.getAttribute('class');
    expect(finalClass).toBe(initialClass);
  });

  test('Mobile hamburger menu opens and closes correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuToggle = page.getByTestId('mobile-menu-toggle');
    await expect(menuToggle).toBeVisible();
    
    // Open mobile menu
    await menuToggle.click();
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Close mobile menu
    await menuToggle.click();
    await expect(mobileMenu).not.toBeVisible();
  });

  test('Mobile menu navigation links work', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open mobile menu
    const menuToggle = page.getByTestId('mobile-menu-toggle');
    await menuToggle.click();
    
    const mobileMenu = page.getByTestId('mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Test navigation to About section
    await page.getByRole('button', { name: 'About' }).click();
    await page.waitForTimeout(1000);
    
    // Menu should close and page should scroll to about section
    await expect(mobileMenu).not.toBeVisible();
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('Newsletter signup and YouTube subscribe buttons work', async ({ page }) => {
    // Test "Join 150,000+ developers" button (if present)
    const joinButton = page.getByText('Join 150,000+ developers').first();
    if (await joinButton.isVisible()) {
      await expect(joinButton).toBeVisible();
      // Should link to UltimateQA signup - we'll test the href attribute
      const href = await joinButton.getAttribute('href');
      expect(href).toContain('ultimateqa.com');
    }
    
    // Test YouTube subscribe button (if present)
    const subscribeButton = page.getByText('Subscribe').first();
    if (await subscribeButton.isVisible()) {
      await expect(subscribeButton).toBeVisible();
      // Should link to YouTube channel
      const href = await subscribeButton.getAttribute('href');
      expect(href).toMatch(/youtube\.com|youtu\.be/);
    }
  });

  test('Contact form and meeting scheduler buttons work', async ({ page }) => {
    // Navigate to contact section
    await page.goto('/#contact');
    await page.waitForLoadState('networkidle');
    
    // Test "Schedule a Meeting" button (if present)
    const scheduleMeetingBtn = page.getByText('Schedule a Meeting').first();
    if (await scheduleMeetingBtn.isVisible()) {
      await expect(scheduleMeetingBtn).toBeVisible();
      // Should link to Calendly or similar
      const href = await scheduleMeetingBtn.getAttribute('href');
      expect(href).toMatch(/calendly\.com|cal\.com/);
    }
  });

  test('All buttons have proper accessibility attributes', async ({ page }) => {
    // Check theme toggle has proper aria-label
    const themeToggle = page.getByTestId('theme-toggle');
    const ariaLabel = await themeToggle.getAttribute('aria-label');
    expect(ariaLabel).toContain('Toggle theme');
    
    // Check mobile menu toggle has proper aria attributes
    await page.setViewportSize({ width: 375, height: 667 });
    const menuToggle = page.getByTestId('mobile-menu-toggle');
    const menuAriaLabel = await menuToggle.getAttribute('aria-label');
    expect(menuAriaLabel).toContain('Toggle mobile menu');
    
    const ariaExpanded = await menuToggle.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
    
    // Open menu and check aria-expanded changes
    await menuToggle.click();
    const expandedState = await menuToggle.getAttribute('aria-expanded');
    expect(expandedState).toBe('true');
  });

  test('Buttons have proper hover and focus states', async ({ page }) => {
    // Test hero button hover state
    const viewSpeakingBtn = page.getByTestId('view-speaking-topics');
    
    // Hover over button
    await viewSpeakingBtn.hover();
    
    // Check that hover styles are applied (transform scale)
    const transform = await viewSpeakingBtn.evaluate(el => 
      window.getComputedStyle(el).transform
    );
    expect(transform).not.toBe('none');
    
    // Test focus state
    await viewSpeakingBtn.focus();
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBe(viewSpeakingBtn);
  });

  test('Buttons work correctly across different screen sizes', async ({ page }) => {
    const screenSizes = [
      { width: 320, height: 568 }, // iPhone SE
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // Desktop small
      { width: 1920, height: 1080 } // Desktop large
    ];

    for (const size of screenSizes) {
      await page.setViewportSize(size);
      
      // Test that main CTA buttons are visible and clickable
      const viewSpeakingBtn = page.getByTestId('view-speaking-topics');
      await expect(viewSpeakingBtn).toBeVisible();
      
      // Test theme toggle is always visible
      const themeToggle = page.getByTestId('theme-toggle');
      await expect(themeToggle).toBeVisible();
      
      // On mobile, hamburger menu should be visible
      if (size.width < 768) {
        const menuToggle = page.getByTestId('mobile-menu-toggle');
        await expect(menuToggle).toBeVisible();
      }
    }
  });
}); 