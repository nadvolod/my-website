// Newsletter Types
export interface NewsletterTestimonial {
  quote: string;
  author: string;
}

export interface Newsletter {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  subscribers: string;
  frequency: string;
  topics: string[];
  testimonials?: NewsletterTestimonial[];
  icon: string;
  color: string;
}

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
