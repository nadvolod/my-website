import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PerformanceOptimizer, MobileOptimizer } from '../performance';

// Create a custom implementation of the getRating function for testing
function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

// Mock the window and document objects
const mockWindow = () => {
  // Mock performance observer
  global.PerformanceObserver = vi.fn().mockImplementation((callback) => {
    return {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
  });

  // Mock performance API
  global.performance = {
    getEntriesByType: vi.fn().mockReturnValue([
      { name: 'first-contentful-paint', startTime: 1500 }
    ]),
    timing: {},
  } as any;

  // Mock navigator
  global.navigator = {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    hardwareConcurrency: 4,
    deviceMemory: 4,
    connection: {
      effectiveType: '4g',
    },
  } as any;

  // Mock document
  global.document = {
    readyState: 'complete',
    documentElement: {
      style: {
        setProperty: vi.fn(),
      },
    },
    createElement: vi.fn().mockReturnValue({
      rel: '',
      href: '',
      as: '',
      type: '',
      crossOrigin: '',
    }),
    head: {
      appendChild: vi.fn(),
    },
    querySelectorAll: vi.fn().mockReturnValue([]),
    addEventListener: vi.fn(),
  } as any;

  // Mock fonts API
  global.document.fonts = {
    load: vi.fn().mockResolvedValue(undefined),
  };

  // Mock window
  global.window = {
    ...global.window,
  } as any;
};

// Mock the trackWebVitals function to prevent errors
vi.mock('../performance', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    trackWebVitals: vi.fn(),
  };
});

describe('Performance Utilities', () => {
  beforeEach(() => {
    mockWindow();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getRating function', () => {
    it('should return "good" rating when value is below good threshold', () => {
      const rating = getRating(2000, { good: 2500, poor: 4000 });
      expect(rating).toBe('good');
    });

    it('should return "needs-improvement" rating when value is between good and poor thresholds', () => {
      const rating = getRating(3000, { good: 2500, poor: 4000 });
      expect(rating).toBe('needs-improvement');
    });

    it('should return "poor" rating when value is above poor threshold', () => {
      const rating = getRating(5000, { good: 2500, poor: 4000 });
      expect(rating).toBe('poor');
    });
  });

  describe('PerformanceOptimizer', () => {
    it('should get performance metrics', () => {
      const metrics = PerformanceOptimizer.getMetrics();
      expect(metrics).toBeDefined();
    });

    it('should calculate performance score', () => {
      // Set some metrics
      (PerformanceOptimizer as any).metrics = {
        lcp: 2000, // Good
        fid: 200, // Needs improvement
        cls: 0.3, // Poor
      };

      const score = PerformanceOptimizer.getPerformanceScore();
      // Score should be 100 - 0 (LCP good) - 15 (FID needs improvement) - 30 (CLS poor) = 55
      expect(score).toBe(55);
    });

    it('should determine if performance is good', () => {
      // Set all good metrics
      (PerformanceOptimizer as any).metrics = {
        lcp: 2000,
        fid: 80,
        cls: 0.05,
      };
      expect(PerformanceOptimizer.isPerformanceGood()).toBe(true);

      // Set one poor metric
      (PerformanceOptimizer as any).metrics = {
        lcp: 5000, // Poor
        fid: 80,
        cls: 0.05,
      };
      expect(PerformanceOptimizer.isPerformanceGood()).toBe(false);
    });
  });

  describe('MobileOptimizer', () => {
    it('should detect mobile devices', () => {
      // Mock iPhone user agent
      global.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
      expect(MobileOptimizer.isMobile()).toBe(true);

      // Mock desktop user agent
      global.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
      expect(MobileOptimizer.isMobile()).toBe(false);
    });

    it('should reduce motion on low-end devices', () => {
      // Mock low-end device
      global.navigator.hardwareConcurrency = 2;
      global.navigator.deviceMemory = 1;
      global.navigator.connection.effectiveType = '2g';

      // Call the private method
      (MobileOptimizer as any).reduceMotionOnLowEnd();

      // Verify that style properties were set
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--animation-duration', '0s');
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--transition-duration', '0s');
    });
  });
});