"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

// Types
interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  color: string;
}

interface Stat {
  number: string;
  label: string;
  suffix?: string;
  icon: string;
  color: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

// Data
const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Developer Advocate & Automation Expert",
    company: "Independent Consulting",
    description: "Leading automation transformation for Fortune 500 companies, training 150K+ developers globally",
    icon: "🚀",
    color: "from-primary-500 to-secondary-500"
  },
  {
    year: "2020-2024",
    title: "Senior Solutions Architect",
    company: "Sauce Labs",
    description: "Architected enterprise testing solutions, led developer advocacy initiatives",
    icon: "🏗️",
    color: "from-secondary-500 to-accent-500"
  },
  {
    year: "2016",
    title: "Founder & CEO",
    company: "UltimateQA",
    description: "Founded leading test automation education platform, reaching developers in 190 countries",
    icon: "🎓",
    color: "from-accent-500 to-primary-500"
  },
  {
    year: "2008-2016",
    title: "QA Engineer to Test Lead",
    company: "Various Tech Companies",
    description: "Built expertise in automation frameworks, mentored teams, developed testing best practices",
    icon: "⚡",
    color: "from-neutral-600 to-neutral-500"
  }
];

const statsData: Stat[] = [
  {
    number: "150000",
    label: "Students Trained",
    suffix: "+",
    icon: "👨‍🎓",
    color: "text-primary-600"
  },
  {
    number: "190",
    label: "Countries Reached",
    suffix: "",
    icon: "🌍",
    color: "text-secondary-600"
  },
  {
    number: "45000",
    label: "Monthly YouTube Views",
    suffix: "+",
    icon: "📺",
    color: "text-accent-600"
  },
  {
    number: "16",
    label: "Years Experience",
    suffix: "+",
    icon: "⏰",
    color: "text-neutral-600"
  }
];

const testimonials: Testimonial[] = [
  {
    quote: "Nikolay's automation expertise transformed our testing approach. His practical guidance helped us achieve 82% faster feedback loops.",
    author: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechCorp",
    avatar: "👩‍💼"
  },
  {
    quote: "UltimateQA courses are the gold standard for automation training. Nikolay's teaching style makes complex concepts accessible.",
    author: "Marcus Rodriguez",
    role: "Senior QA Engineer",
    company: "Healthcare Inc",
    avatar: "👨‍💻"
  },
  {
    quote: "Working with Nikolay at Sauce Labs was inspiring. His developer advocacy work has impacted thousands of engineers globally.",
    author: "Jennifer Wu",
    role: "Product Manager",
    company: "Sauce Labs",
    avatar: "👩‍🚀"
  }
];

const achievements = [
  { icon: "🏆", label: "Top 1% Automation Instructor", color: "text-yellow-600" },
  { icon: "📈", label: "97% Faster Test Execution", color: "text-green-600" },
  { icon: "🎯", label: "Fortune 500 Trusted", color: "text-blue-600" },
  { icon: "📚", label: "10+ Courses Published", color: "text-purple-600" },
  { icon: "🎤", label: "100+ Speaking Events", color: "text-red-600" },
  { icon: "🌟", label: "45K+ YouTube Subscribers", color: "text-orange-600" }
];

// Counter animation hook
const useCounter = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

// Stats counter component
const StatsCounter: React.FC<{ stat: Stat; inView: boolean }> = ({ stat, inView }) => {
  const counter = useCounter(parseInt(stat.number), 2000, inView);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
    >
      <div className="text-4xl mb-2">{stat.icon}</div>
      <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
        {counter.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-neutral-600 dark:text-neutral-400 font-medium">
        {stat.label}
      </div>
    </motion.div>
  );
};

// Timeline component
const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <div ref={timelineRef} className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>
      
      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className="relative flex items-start mb-12 last:mb-0"
        >
          <div className="absolute left-6 w-4 h-4 bg-white dark:bg-neutral-800 border-4 border-primary-500 rounded-full z-10"></div>
          <div className="ml-16 bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                  {item.year}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  {item.company}
                </div>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Testimonials carousel
const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 relative overflow-hidden">
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
        What People Say
      </h3>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{testimonials[currentIndex].avatar}</div>
                     <blockquote className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 italic leading-relaxed">
             &ldquo;{testimonials[currentIndex].quote}&rdquo;
           </blockquote>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">
              {testimonials[currentIndex].author}
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary-500' 
                : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Achievement badges
const AchievementBadges: React.FC = () => {
  const badgesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(badgesRef, { once: true, amount: 0.2 });

  return (
    <div ref={badgesRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-4 text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
        >
          <div className="text-2xl mb-2">{achievement.icon}</div>
          <div className={`text-sm font-semibold ${achievement.color}`}>
            {achievement.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Main About component
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-br from-white via-neutral-50 to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white mb-6">
            About <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Transforming how developers and organizations approach test automation with 16+ years of expertise
          </p>
        </motion.div>

        {/* Two-column layout on desktop */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Left column - Personal story and mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >


            {/* Personal introduction */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                             <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                 Hi, I&apos;m Nikolay! 👋
               </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                                 With over 16 years in the software testing industry, I&apos;ve dedicated my career to helping developers and organizations build better software through intelligent automation strategies. As the founder of UltimateQA and former Senior Solutions Architect at Sauce Labs, I&apos;ve had the privilege of training over 150,000 developers across 190 countries.
              </p>
              
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                🎯 My Mission
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                I believe that quality software is the foundation of digital transformation. My mission is to democratize test automation knowledge, making it accessible to developers worldwide while helping organizations scale their testing practices efficiently.
              </p>

              <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                🌟 Beyond Work
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                                 When I&apos;m not crafting automation frameworks or creating educational content, you&apos;ll find me networking with fellow developers, traveling to tech conferences around the world, spending quality time with family, or practicing meditation to maintain balance in this fast-paced tech world.
              </p>
            </div>

            {/* Achievement badges */}
            <div>
              <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Key Achievements
              </h4>
              <AchievementBadges />
            </div>
          </motion.div>

          {/* Right column - Timeline and testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-12"
          >
            {/* Career Timeline */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
                Career Journey
              </h3>
              <Timeline />
            </div>

            {/* Testimonials */}
            <TestimonialsCarousel />
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white text-center mb-12">
            Impact by the Numbers
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatsCounter key={index} stat={stat} inView={statsInView} />
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Testing Strategy?
          </h3>
                     <p className="text-lg md:text-xl mb-6 opacity-90">
             Let&apos;s discuss how I can help your team achieve automation excellence
           </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 font-bold py-3 px-8 rounded-xl hover:bg-neutral-50 transition-all duration-300 shadow-medium"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 