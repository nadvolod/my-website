"use client";
import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// Types
interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  color: string;
}

interface Achievement {
  icon: string;
  label: string;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  icon: string;
  color: string;
}

// Data
const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Senior Developer Advocate",
    company: "UltimateQA",
    description: "Leading global developer education initiatives, training 150,000+ developers across 190 countries in modern test automation practices.",
    icon: "🚀",
    color: "text-blue-600"
  },
  {
    year: "2020",
    title: "Founder & CEO",
    company: "UltimateQA",
    description: "Founded comprehensive testing education platform, creating courses and content that have reached hundreds of thousands of developers worldwide.",
    icon: "🏢",
    color: "text-green-600"
  },
  {
    year: "2018",
    title: "Senior Test Automation Engineer",
    company: "Enterprise Solutions",
    description: "Led automation initiatives for Fortune 500 companies, implementing robust testing frameworks and CI/CD pipelines.",
    icon: "⚙️",
    color: "text-purple-600"
  },
  {
    year: "2015",
    title: "QA Engineer",
    company: "Tech Startup",
    description: "Developed comprehensive testing strategies for high-growth startup, establishing quality processes from ground up.",
    icon: "🔧",
    color: "text-orange-600"
  },
  {
    year: "2008",
    title: "Software Developer",
    company: "Development Agency",
    description: "Started career as full-stack developer, building web applications and discovering passion for quality assurance.",
    icon: "💻",
    color: "text-indigo-600"
  }
];

const achievements: Achievement[] = [
  { icon: "🎓", label: "150K+ Students Trained", color: "text-blue-600" },
  { icon: "🌍", label: "190 Countries Reached", color: "text-green-600" },
  { icon: "🎤", label: "100+ Speaking Events", color: "text-purple-600" },
  { icon: "📚", label: "50+ Courses Created", color: "text-orange-600" },
  { icon: "⭐", label: "4.8/5 Average Rating", color: "text-yellow-600" },
  { icon: "🏆", label: "Industry Recognition", color: "text-red-600" }
];

const statsData: Stat[] = [
  {
    number: "150,000+",
    label: "Developers Trained",
    icon: "👨‍💻",
    color: "text-blue-600"
  },
  {
    number: "190",
    label: "Countries Reached",
    icon: "🌍",
    color: "text-green-600"
  },
  {
    number: "16+",
    label: "Years Experience",
    icon: "📅",
    color: "text-purple-600"
  },
  {
    number: "4.8/5",
    label: "Student Rating",
    icon: "⭐",
    color: "text-yellow-600"
  }
];

// Simplified Stats Counter Component
const StatsCounter: React.FC<{ stat: Stat; inView: boolean }> = ({ stat }) => (
  <div className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-soft">
    <div className="text-3xl mb-2">{stat.icon}</div>
    <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
      {stat.number}
    </div>
    <div className="text-neutral-600 dark:text-neutral-400 font-medium">
      {stat.label}
    </div>
  </div>
);

// Simplified Timeline Component
const TimelineItem: React.FC<{ item: TimelineItem; index: number; inView: boolean }> = ({ item }) => (
  <div className="flex items-start space-x-4 mb-8">
    <div className="flex-shrink-0">
      <div className={`w-12 h-12 rounded-full bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-xl shadow-soft`}>
        {item.icon}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            {item.title}
          </h3>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-700 ${item.color}`}>
            {item.year}
          </span>
        </div>
        <p className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          {item.company}
        </p>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  </div>
);

// Achievement badges - simplified
const AchievementBadges: React.FC = () => {
  const badgesRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={badgesRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
        >
          <div className="text-2xl mb-2">{achievement.icon}</div>
          <div className={`text-sm font-semibold ${achievement.color}`}>
            {achievement.label}
          </div>
        </div>
      ))}
    </div>
  );
};

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
            With over 16 years of experience in software development and test automation, 
            I&apos;ve dedicated my career to helping developers and organizations achieve excellence 
            in software quality and testing practices.
          </p>
        </motion.div>

        {/* Achievement Badges */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            Achievements & Impact
          </h3>
          <AchievementBadges />
        </div>

        {/* Professional Timeline */}
        <div ref={timelineRef} className="mb-16">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            Professional Journey
          </h3>
          <div className="max-w-4xl mx-auto">
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index} 
                item={item} 
                index={index} 
                inView={timelineInView}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mb-16">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            Impact by the Numbers
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatsCounter key={index} stat={stat} inView={statsInView} />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Testing Strategy?
          </h3>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            Let&apos;s discuss how I can help your team achieve automation excellence
          </p>
          <button className="bg-white text-primary-600 font-bold py-3 px-8 rounded-xl hover:bg-neutral-50 transition-all duration-300 shadow-medium hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default About; 