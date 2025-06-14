declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: Record<string, unknown>) => void;
      };
      cta: {
        load: (portalId: string, ctaId: string, containerId: string) => void;
      };
    };
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export { };
