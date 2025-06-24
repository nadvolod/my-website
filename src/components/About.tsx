"use client";
import { PROFESSIONAL_RECOGNITION, WEBSITE_STATS } from "@/config/stats";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// Types
interface Stat {
  number: string;
  label: string;
  icon: string;
  color: string;
}

// Data
const statsData: Stat[] = [
  {
    number: WEBSITE_STATS.studentsTraught,
    label: "Students Trained",
    icon: "👨‍🎓",
    color: "text-blue-600"
  },
  {
    number: WEBSITE_STATS.countriesReached,
    label: "Countries Reached",
    icon: "🌍",
    color: "text-green-600"
  },
  {
    number: WEBSITE_STATS.yearsExperience,
    label: "Years Experience",
    icon: "📅",
    color: "text-purple-600"
  },
  {
    number: WEBSITE_STATS.conferenceTalks,
    label: "Conference Talks",
    icon: "🎤",
    color: "text-orange-600"
  }
];

// Simplified Stats Counter Component
const StatsCounter: React.FC<{ stat: Stat }> = ({ stat }) => (
  <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="text-3xl mb-2">{stat.icon}</div>
    <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
      {stat.number}
    </div>
    <div className="text-neutral-600 dark:text-neutral-400 font-medium">
      {stat.label}
    </div>
  </div>
);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.1 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-20 bg-neutral-50 dark:bg-neutral-900" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            CEO & Founder of UltimateQA with {WEBSITE_STATS.yearsExperience} years of leading and creating test automation experts. 
            I&apos;ve trained {WEBSITE_STATS.studentsTraught} people in {WEBSITE_STATS.countriesReached} countries and helped 100s of corporate customers 
            transform their automation practices using cutting-edge AI integration and testing excellence.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StatsCounter stat={stat} />
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            🏆 Professional Recognition
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROFESSIONAL_RECOGNITION.map((recognition, index) => (
              <motion.div
                key={recognition.title}
                initial={{ opacity: 0, y: 20 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-2xl mb-3">{recognition.icon}</div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {recognition.title}
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">
                  {recognition.description}
                </p>
                <span className="text-primary-600 dark:text-primary-400 text-xs font-medium">
                  {recognition.year}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 30 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Core Expertise
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                🔧 Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {['AI Integration', 'Selenium', 'Playwright', 'Cypress', 'JavaScript', 'TypeScript', 'Python', 'Java', 'CI/CD', 'Docker', 'AWS'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                🎯 Specializations
              </h4>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  AI-Powered Testing Solutions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Test Automation Architecture
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Developer Training & Education
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                  Enterprise Quality Strategy
                </li>
              </ul>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8 border border-primary-200 dark:border-primary-800 mt-8">
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4 text-center">
              🚀 Mission
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-center max-w-3xl mx-auto">
              Training {WEBSITE_STATS.studentsTraught} developers worldwide with cutting-edge automation, 
              AI integration, and testing excellence. Empowering organizations to build better software through 
              comprehensive testing education and innovative quality assurance strategies that integrate the latest AI tools and methodologies.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 