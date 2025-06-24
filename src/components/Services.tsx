"use client";
import { WEBSITE_STATS } from "@/config/stats";
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
    formId: "enterprise-automation-form", // Updated form ID
    redirectUrl: "/thank-you/enterprise-automation"
  },
  aiTrainingBusiness: {
    portalId: "YOUR_PORTAL_ID",
    formId: "ai-team-training-form", // Updated form ID
    redirectUrl: "/thank-you/ai-team-training"
  },
  aiTrainingDevelopers: {
    portalId: "YOUR_PORTAL_ID",
    formId: "ai-developer-workshops-form", // Updated form ID
    redirectUrl: "/thank-you/ai-developer-workshops"
  },
  speakingConsulting: {
    portalId: "YOUR_PORTAL_ID",
    formId: "speaking-consulting-form", // New form ID
    redirectUrl: "/thank-you/speaking-consulting"
  }
};

// Service offerings data
const serviceOfferings: ServiceOffering[] = [
  {
    id: "automated-testing",
    title: "Enterprise Test Automation Consulting",
    description: `Transform your testing strategy with 15+ years of expertise. Helped 100s of corporate customers reduce testing time by ${WEBSITE_STATS.testingTimeReduction} while achieving enterprise-scale quality.`,
    features: [
      "Custom automation framework architecture",
      "AI-powered test generation and maintenance",
      "Cross-browser and mobile automation",
      "CI/CD pipeline optimization",
      "Performance and load testing solutions",
      "Team training and knowledge transfer"
    ],
    icon: "🤖",
    color: "from-blue-500 to-cyan-500",
    badge: "Most Popular"
  },
  {
    id: "ai-training-business",
    title: "AI-Powered Testing Training for Teams",
    description: "Leading-edge AI integration training based on insights from 9 international conferences and training 150,000+ developers worldwide.",
    features: [
      "ChatGPT-4 for test automation workflows",
      "AI-driven test case generation",
      "Intelligent bug detection systems",
      "Modern testing with AI tools",
      "Executive AI strategy workshops",
      "Corporate team transformation programs"
    ],
    icon: "🧠",
    color: "from-purple-500 to-pink-500",
    badge: "Conference Speaker Expertise"
  },
  {
    id: "ai-training-developers",
    title: "Developer AI Integration Workshops",
    description: "Hands-on training from a Top 33 Test Automation Leader and contributing author to industry publications. Master AI tools for development excellence.",
    features: [
      "ChatGPT integration for developers",
      "AI-assisted debugging and optimization",
      "Prompt engineering for code generation",
      "Modern JavaScript/TypeScript with AI",
      "Playwright and Cypress with AI enhancement",
      "Real-world project implementations"
    ],
    icon: "👨‍💻",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "speaking-consulting",
    title: "Conference Speaking & Consulting",
    description: "International speaker with presentations at All Things Open, StarEast, InfoShare, and more. Available for keynotes, workshops, and strategic consulting.",
    features: [
      "Conference keynotes and presentations",
      "AI in testing and development workshops",
      "Executive strategy consulting",
      "Team transformation roadmaps",
      "Industry thought leadership",
      "Custom workshop development"
    ],
    icon: "🎤",
    color: "from-orange-500 to-red-500",
    badge: "International Speaker"
  }
];

// HubSpot Modal Component
const HubSpotModal: React.FC<{
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" data-testid="hubspot-modal">
      <div className="bg-white dark:bg-neutral-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              {serviceTitle} - Free Discovery Call
            </h3>
            <button
              onClick={onClose}
              data-testid="modal-close"
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* HubSpot Form Container */}
          <div id={`hubspot-form-${formConfig.formId}`} className="mb-6"></div>
          
          {/* Fallback Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-neutral-700 dark:text-white"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-neutral-700 dark:text-white"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-neutral-700 dark:text-white"
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-neutral-700 dark:text-white"
            />
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              rows={4}
              className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-neutral-700 dark:text-white"
            ></textarea>
            <Button
              variant="gradient-primary"
              size="lg"
              className="w-full"
            >
              Schedule Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const [selectedService, setSelectedService] = useState<ServiceOffering>(serviceOfferings[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<HubSpotFormConfig | null>(null);

  const handleDiscoveryCall = (service: ServiceOffering) => {
    const config = hubspotForms[service.id as keyof typeof hubspotForms];
    if (config) {
      setModalConfig(config);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-neutral-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Services & Expertise
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Comprehensive solutions to accelerate your development and testing capabilities
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Service Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Choose Your Service
            </h3>
            
            {serviceOfferings.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedService.id === service.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-primary-300'
                }`}
              >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                      {service.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                      Click to view details
                    </p>
                  </div>
                  {selectedService.id === service.id && (
                    <div className="text-primary-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Service Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700">
              
              {/* Service Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedService.color} flex items-center justify-center text-3xl`}>
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {selectedService.title}
                  </h3>
                  {selectedService.badge && (
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-1">
                      {selectedService.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                {selectedService.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                  What&apos;s Included:
                </h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                variant="gradient-primary"
                size="lg"
                className="w-full"
                onClick={() => handleDiscoveryCall(selectedService)}
                data-testid={`${selectedService.id}-discovery-call`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Free Discovery Call</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Button>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {WEBSITE_STATS.clientSatisfactionRate}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-300">
                      Client Satisfaction
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {WEBSITE_STATS.projectsCompleted}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-300">
                      Projects Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* HubSpot Modal */}
      {modalConfig && (
        <HubSpotModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formConfig={modalConfig}
          serviceTitle={selectedService.title}
        />
      )}
    </section>
  );
};

export default Services; 