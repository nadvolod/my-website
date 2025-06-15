"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { Button } from "./ui";

// Type definitions
interface ServiceOffering {
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  badge?: string;
  id: string;
  hubspotFormId?: string;
}

interface HubSpotFormConfig {
  portalId: string;
  formId: string;
  redirectUrl: string;
}

// HubSpot form configuration
const hubspotForms = {
  automatedTesting: {
    portalId: "YOUR_PORTAL_ID", // Replace with actual HubSpot portal ID
    formId: "automated-testing-form", // Replace with actual form ID
    redirectUrl: "/thank-you/automated-testing"
  },
  aiTrainingBusiness: {
    portalId: "YOUR_PORTAL_ID",
    formId: "ai-business-form",
    redirectUrl: "/thank-you/ai-business"
  },
  aiTrainingDevelopers: {
    portalId: "YOUR_PORTAL_ID",
    formId: "ai-developers-form",
    redirectUrl: "/thank-you/ai-developers"
  },
  webDevelopment: {
    portalId: "YOUR_PORTAL_ID",
    formId: "web-development-form",
    redirectUrl: "/thank-you/web-development"
  }
};

// HubSpot Form Modal Component
const HubSpotFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  formConfig: HubSpotFormConfig;
  serviceTitle: string;
}> = ({ isOpen, onClose, formConfig, serviceTitle }) => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isOpen && typeof window !== 'undefined' && (window as any).hbspt) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).hbspt.forms.create({
        portalId: formConfig.portalId,
        formId: formConfig.formId,
        target: `#hubspot-form-${formConfig.formId}`,
        onFormSubmit: () => {
          // Track conversion
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (typeof window !== 'undefined' && (window as any).gtag) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).gtag('event', 'form_submit', {
              form_type: formConfig.formId,
              service: serviceTitle
            });
          }
          // Close modal after submission
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      });
    }
  }, [isOpen, formConfig, serviceTitle, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-testid="hubspot-modal"
    >
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700"
          data-testid="modal-close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
          {serviceTitle} - Discovery Call
        </h3>
        <div id={`hubspot-form-${formConfig.formId}`}>
          {/* Fallback form if HubSpot doesn&apos;t load */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstname"
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastname"
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell us about your testing challenges..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
            >
              Schedule Discovery Call
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Service data with updated information
const services: ServiceOffering[] = [
  {
    id: "automated-testing",
    title: "Automated Testing Services",
    description: "Transform your testing strategy with enterprise-grade automation solutions. Reduce testing time by 80% while improving coverage and reliability.",
    features: [
      "Custom automation framework development",
      "CI/CD pipeline integration",
      "Cross-browser and mobile testing",
      "Performance and load testing",
      "Team training and knowledge transfer"
    ],
    icon: "🤖",
    color: "from-blue-500 to-cyan-500",
    badge: "7 days of free coding",
    hubspotFormId: "automated-testing-form"
  },
  {
    id: "ai-training-business",
    title: "AI Training for Business",
    description: "Empower your organization with AI-driven development and testing practices. Stay ahead of the competition with cutting-edge AI integration.",
    features: [
      "AI-powered test generation",
      "ChatGPT integration for development",
      "AI code review and optimization",
      "Executive AI strategy workshops",
      "ROI measurement and reporting"
    ],
    icon: "🧠",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "ai-training-developers",
    title: "AI Training for Developers",
    description: "Level up your development skills with hands-on AI training. Learn to leverage ChatGPT, GitHub Copilot, and other AI tools effectively.",
    features: [
      "Hands-on AI tool workshops",
      "Prompt engineering mastery",
      "AI-assisted debugging techniques",
      "Code generation best practices",
      "Certification programs available"
    ],
    icon: "👨‍💻",
    color: "from-green-500 to-teal-500"
  },
  {
    id: "web-development",
    title: "Web Development Services",
    description: "Full-stack web development with modern technologies. From concept to deployment, we build scalable, performant web applications.",
    features: [
      "React/Next.js development",
      "TypeScript implementation",
      "API design and development",
      "Database architecture",
      "Performance optimization"
    ],
    icon: "🌐",
    color: "from-orange-500 to-red-500"
  }
];

// Service Card Component
const ServiceCard: React.FC<{
  service: ServiceOffering;
  isActive: boolean;
  onClick: () => void;
  onDiscoveryCall: () => void;
}> = ({ service, isActive, onClick, onDiscoveryCall }) => (
  <div
    className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
      isActive
        ? 'bg-white dark:bg-neutral-800 shadow-xl scale-105'
        : 'bg-neutral-50 dark:bg-neutral-900 hover:bg-white dark:hover:bg-neutral-800 shadow-soft hover:shadow-medium'
    }`}
    onClick={onClick}
  >
    {/* Badge for testing service only */}
    {service.badge && service.id === "automated-testing" && (
      <div className="absolute -top-3 -right-3 z-20">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
          {service.badge}
        </div>
      </div>
    )}

    <div className="text-center">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl`}>
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
        {service.title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        {service.description}
      </p>
      
      {/* Discovery Call Button */}
      <Button
        variant="primary"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDiscoveryCall();
        }}
        data-testid={`${service.id}-discovery-call`}
        className="w-full"
      >
        Free Discovery Call
      </Button>
    </div>
  </div>
);

// Service Detail Component
const ServiceDetail: React.FC<{ service: ServiceOffering | null }> = ({ service }) => {
  if (!service) return null;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-xl">
      <div className="flex items-center mb-6">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-xl mr-4`}>
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {service.title}
        </h3>
      </div>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
        {service.description}
      </p>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          What&apos;s Included:
        </h4>
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-neutral-600 dark:text-neutral-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Trusted by Fortune 500 companies
        </p>
        <div className="flex justify-center space-x-8 opacity-60">
          <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-xs font-semibold">
            LOGO
          </div>
          <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-xs font-semibold">
            LOGO
          </div>
          <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-xs font-semibold">
            LOGO
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Services component
const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceOffering | null>(null);

  const activeServiceData = services.find(service => service.id === activeService) || services[0];

  const handleDiscoveryCall = (service: ServiceOffering) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const getFormConfig = (serviceId: string) => {
    switch (serviceId) {
      case 'automated-testing':
        return hubspotForms.automatedTesting;
      case 'ai-training-business':
        return hubspotForms.aiTrainingBusiness;
      case 'ai-training-developers':
        return hubspotForms.aiTrainingDevelopers;
      case 'web-development':
        return hubspotForms.webDevelopment;
      default:
        return hubspotForms.automatedTesting;
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-neutral-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Services & Expertise
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive automation and AI solutions to accelerate your development lifecycle 
            and improve software quality at enterprise scale.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <ServiceCard
                service={service}
                isActive={activeService === service.id}
                onClick={() => setActiveService(service.id)}
                onDiscoveryCall={() => handleDiscoveryCall(service)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Active service detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ServiceDetail service={activeServiceData} />
        </motion.div>
      </div>

      {/* HubSpot Form Modal */}
      {selectedService && (
        <HubSpotFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          formConfig={getFormConfig(selectedService.id)}
          serviceTitle={selectedService.title}
        />
      )}
    </section>
  );
};

export default Services; 