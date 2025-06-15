"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import { Button } from "./ui";

// Type definitions
interface ServiceOffering {
  title: string;
  description: string;
  features: string[];
}

interface CaseStudy {
  title: string;
  url: string;
}

interface Service {
  id: string;
  title: string;
  headline: string;
  subheading: string;
  guarantee?: string;
  freeTrial?: string;
  technologies?: string[];
  socialProof?: string;
  targetAudience?: string;
  outcomes?: string;
  experience?: string;
  approach?: string;
  offerings: ServiceOffering[];
  caseStudies?: CaseStudy[];
  cta: string;
  icon: string;
}

// Service data - Updated per requirements
const services: Service[] = [
  {
    id: "automation",
    title: "Automated Testing Services",
    headline: "Transform Your Testing Strategy with Expert Automation",
    subheading: "16+ years of experience building enterprise-scale automation frameworks",
    guarantee: "7 days of free coding",
    technologies: ["TypeScript", "JavaScript", "C#", "Java", "Playwright", "Cypress", "Selenium"],
    socialProof: "Trusted by Fortune 500 companies",
    offerings: [
      {
        title: "Complete Program Creation",
        description: "Build enterprise automation frameworks from scratch",
        features: [
          "Custom test architecture design and implementation",
          "CI/CD pipeline integration and optimization",
          "Team training and knowledge transfer",
          "Best practices implementation and documentation"
        ]
      },
      {
        title: "Selenium to Playwright Migration",
        description: "Assessment of existing Selenium test suites",
        features: [
          "Migration strategy and timeline planning",
          "Parallel execution optimization (97% faster proven results)",
          "Cross-browser testing enhancement",
          "Maintenance overhead reduction"
        ]
      },
      {
        title: "Cypress to Playwright Migration",
        description: "Cypress test suite analysis and conversion planning",
        features: [
          "Enhanced debugging and testing capabilities",
          "Multi-browser support implementation",
          "Performance optimization and reliability improvements",
          "Team transition training and support"
        ]
      }
    ],
    caseStudies: [
      {
        title: "Healthcare Organization: 900 minutes daily time savings",
        url: "https://ultimateqa.com/automation-development-for-healthcare-organization/"
      },
      {
        title: "International Hotel Brand: 66% test execution time reduction",
        url: "https://ultimateqa.com/automation-saves-hospitality-business-66-in-test-execution-time/"
      },
      {
        title: "Banking Client: 82% faster feedback loops",
        url: "https://ultimateqa.com/case-studies/"
      }
    ],
    cta: "Free Discovery Call",
    icon: "🔧"
  },
  {
    id: "ai-business",
    title: "AI Training for Business",
    headline: "Accelerate Business Growth with Strategic AI Implementation",
    subheading: "Turn AI from buzzword to business advantage",
    targetAudience: "C-suite, Product Managers, Business Leaders",
    outcomes: "Increase team productivity 40-60% with strategic AI adoption",
    offerings: [
      {
        title: "Executive AI Strategy Workshops",
        description: "Strategic AI implementation for leadership teams",
        features: [
          "AI ROI assessment and implementation roadmaps",
          "Custom AI integration for business processes",
          "Team productivity training with AI tools",
          "AI-powered testing and quality assurance strategies"
        ]
      }
    ],
    cta: "Free Discovery Call",
    icon: "🤖"
  },
  {
    id: "ai-developers",
    title: "AI Training for Developers",
    headline: "Master AI-Powered Development and Testing",
    subheading: "Stay ahead of the curve with cutting-edge AI development skills",
    technologies: ["Claude", "ChatGPT", "GitHub Copilot", "AI testing tools"],
    experience: "Trained 150,000+ developers across 190 countries",
    offerings: [
      {
        title: "AI-Assisted Development Training",
        description: "Master modern AI development tools and methodologies",
        features: [
          "AI-assisted coding workshops (GitHub Copilot, Claude, ChatGPT)",
          "AI-powered testing methodology training",
          "Prompt engineering for developers",
          "AI integration in CI/CD pipelines",
          "Building AI-enhanced automation frameworks"
        ]
      }
    ],
    cta: "Free Discovery Call",
    icon: "👨‍💻"
  },
  {
    id: "web-dev",
    title: "Web Development Services",
    headline: "Modern Web Applications Built for Scale and Performance",
    subheading: "Full-stack development with automation-first approach",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Cloud platforms"],
    approach: "Quality-driven development with built-in automation",
    offerings: [
      {
        title: "Modern Web Development",
        description: "Full-stack applications with testing-first methodology",
        features: [
          "Modern web application development (Next.js, React, TypeScript)",
          "Testing-first development methodology",
          "Performance optimization and monitoring",
          "DevOps and deployment automation",
          "Technical architecture consulting"
        ]
      }
    ],
    cta: "Free Discovery Call",
    icon: "🌐"
  }
];

// Service card component - Fixed badge positioning and contrast
interface ServiceCardProps {
  service: Service;
  isActive: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isActive, onClick }) => {
  return (
    <motion.div
      className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200 dark:border-primary-800'
          : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-700'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Fixed guarantee badge - only for automated testing */}
      {service.guarantee && (
        <div className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          {service.guarantee}
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className="text-4xl">{service.icon}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            {service.title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            {service.subheading}
          </p>

          {/* Technology badges */}
          {service.technologies && (
            <div className="flex flex-wrap gap-2 mb-4">
              {service.technologies.slice(0, 4).map((tech: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-lg">
                  {tech}
                </span>
              ))}
              {service.technologies.length > 4 && (
                <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-lg">
                  +{service.technologies.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Key highlight */}
          {service.outcomes && (
            <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm mb-2">
              {service.outcomes}
            </p>
          )}

          {service.experience && (
            <p className="text-secondary-600 dark:text-secondary-400 font-semibold text-sm mb-2">
              {service.experience}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Detailed service view
interface ServiceDetailProps {
  service: Service;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-medium"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          {service.headline}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
          {service.subheading}
        </p>

        {/* Social proof */}
        {service.socialProof && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-6">
            <p className="text-primary-700 dark:text-primary-300 font-medium text-center">
              {service.socialProof}
            </p>
          </div>
        )}
      </div>

      {/* Service offerings */}
      <div className="grid md:grid-cols-1 gap-6 mb-8">
        {service.offerings.map((offering: ServiceOffering, index: number) => (
          <div key={index} className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
              {offering.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              {offering.description}
            </p>
            <ul className="space-y-2">
              {offering.features.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-start space-x-2">
                  <span className="text-accent-500 font-bold text-lg">•</span>
                  <span className="text-neutral-600 dark:text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Case studies */}
      {service.caseStudies && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Proven Results
          </h3>
          <div className="grid sm:grid-cols-1 gap-4">
            {service.caseStudies.map((study: CaseStudy, index: number) => (
              <a
                key={index}
                href={study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-lg hover:shadow-medium transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {study.title}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Click to read full case study →
                    </p>
                  </div>
                </div>
              </a>
            ))}
            <a
              href="https://ultimateqa.com/case-studies/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg hover:shadow-medium transition-all duration-300 group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📚</span>
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                    Complete Case Studies Portfolio
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    View all success stories →
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center">
        <Button
          variant="gradient-primary"
          size="lg"
          className="shadow-glow hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {service.cta}
        </Button>
      </div>
    </motion.div>
  );
};

// Client logos for social proof - Updated to remove specific company names
const ClientLogos: React.FC = () => {
  const logos = [
    { name: "Fortune 500 Company", logo: "🏢" },
    { name: "Healthcare Corp", logo: "🏥" },
    { name: "Banking Group", logo: "🏦" },
    { name: "Tech Enterprise", logo: "💻" },
    { name: "Global Retail", logo: "🛍️" }
  ];

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-medium mb-8">
      <h3 className="text-xl font-bold text-center mb-6 text-neutral-900 dark:text-white">
        Trusted by Industry Leaders
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {logos.map((client, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="text-4xl">{client.logo}</div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
              {client.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Services component
const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string>(services[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeServiceData = services.find(service => service.id === activeService) || services[0];

  return (
    <section ref={ref} className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white mb-6">
            Services & <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Transform your development and testing processes with proven strategies and cutting-edge automation
          </p>
        </motion.div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ClientLogos />
        </motion.div>

        {/* Service selection */}
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
    </section>
  );
};

export default Services; 