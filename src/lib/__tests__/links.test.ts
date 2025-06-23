import { LinkValidator, realLinks, navigationItems, socialLinks } from '../links';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('LinkValidator', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('checkUrl', () => {
    it('should return valid status for successful fetch', async () => {
      // Mock implementation for successful fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      // Use the private method through a workaround
      const result = await (LinkValidator as any).checkUrl('https://example.com');

      expect(result).toEqual({
        url: 'https://example.com',
        status: 'valid',
        statusCode: 200,
      });
      expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
        method: 'HEAD',
        mode: 'no-cors',
      });
    });

    it('should return invalid status for failed fetch', async () => {
      // Mock implementation for failed fetch
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      // Use the private method through a workaround
      const result = await (LinkValidator as any).checkUrl('https://example.com');

      expect(result).toEqual({
        url: 'https://example.com',
        status: 'invalid',
        error: 'Network error',
      });
      expect(global.fetch).toHaveBeenCalledWith('https://example.com', {
        method: 'HEAD',
        mode: 'no-cors',
      });
    });
  });

  describe('validateExternalLinks', () => {
    it('should validate all external links', async () => {
      // Mock implementation for successful fetch
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
      });

      const results = await LinkValidator.validateExternalLinks();

      // Count the number of external links in realLinks
      const externalLinks = Object.values(realLinks).filter(link => 
        link.startsWith('http') && !link.includes('localhost')
      );

      expect(results.length).toBe(externalLinks.length);
      expect(results[0].status).toBe('valid');
      expect(global.fetch).toHaveBeenCalledTimes(externalLinks.length);
    });
  });

  describe('validateInternalRoutes', () => {
    it('should validate all internal routes', async () => {
      // Mock implementation for successful fetch
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
      });

      const results = await LinkValidator.validateInternalRoutes();

      expect(results.length).toBe(3); // Based on the hardcoded routes in the method
      expect(results[0].exists).toBe(true);
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    it('should handle failed routes', async () => {
      // Mock implementation for failed fetch
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Route not found'));

      const results = await LinkValidator.validateInternalRoutes();

      expect(results.length).toBe(3);
      expect(results[0].exists).toBe(false);
      expect(results[0].error).toBe('Route not found');
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('generateWorkingLinks', () => {
    it('should return the realLinks object', () => {
      const links = LinkValidator.generateWorkingLinks();
      expect(links).toBe(realLinks);
    });
  });
});

describe('Navigation and Social Links', () => {
  it('should have valid navigation items', () => {
    expect(navigationItems.length).toBeGreaterThan(0);
    navigationItems.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('label');
      expect(item).toHaveProperty('href');
    });
  });

  it('should have valid social links', () => {
    expect(socialLinks.length).toBeGreaterThan(0);
    socialLinks.forEach(link => {
      expect(link).toHaveProperty('name');
      expect(link).toHaveProperty('url');
      expect(link).toHaveProperty('icon');
      expect(link.url).toMatch(/^https?:\/\//); // Should be a valid URL
    });
  });
});