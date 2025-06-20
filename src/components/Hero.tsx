"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import HubSpotModal from './HubSpotModal';
import { Button } from "./ui";

// Floating particles component for visual interest
const FloatingParticles = () => {
  const particles = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-primary-400/30 to-secondary-400/30 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            left: `${20 + (i * 15)}%`,
            top: `${30 + (i * 10)}%`,
          }}
        />
      ))}
    </div>
  );
};

// Modern professional avatar with gradient border
const ModernAvatar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative mx-auto mb-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated gradient border */}
      <div className="relative w-40 h-40 md:w-48 md:h-48">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 p-1"
          animate={{
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 flex items-center justify-center relative overflow-hidden">
            {/* Profile image */}
            <Image
              src="/nikolay-profile.jpeg"
              alt="Nikolay Advolodkin"
              width={192}
              height={192}
              className="w-full h-full object-cover"
              priority
            />
            
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: isHovered ? "100%" : "-100%",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            {/* Subtle overlay patterns */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </motion.div>
        
        {/* Floating status indicator */}
        <motion.div
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white dark:border-neutral-900 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-green-600 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Interactive typing effect for subtitle
const AnimatedTitle = () => {
  const titles = [
    "Developer Advocate & Automation Expert",
    "Training 150k+ Developers Worldwide",
    "International Speaker & Educator",
    "Founder of UltimateQA"
  ];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <motion.div
      key={currentTitle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[5rem] flex items-center justify-center"
    >
      <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent leading-tight text-center">
        {titles[currentTitle]}
      </h2>
    </motion.div>
  );
};

// Scroll-based parallax effect
const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="absolute inset-0 z-0"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      
      {/* Dynamic gradient overlays */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-secondary-500/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(0,102,204,0.1) 0%, rgba(255,107,53,0.1) 100%)",
            "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(0,208,132,0.1) 100%)",
            "linear-gradient(225deg, rgba(0,208,132,0.1) 0%, rgba(0,102,204,0.1) 100%)",
            "linear-gradient(315deg, rgba(0,102,204,0.1) 0%, rgba(255,107,53,0.1) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary-200/30 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200/20 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-accent-300/40 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
    </motion.div>
  );
};

// Navigation helper function
// const scrollToSection = (sectionId: string) => {
//   const element = document.getElementById(sectionId);
//   if (element) {
//     const headerOffset = 80;
//     const elementPosition = element.getBoundingClientRect().top;
//     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

//     window.scrollTo({
//       top: offsetPosition,
//       behavior: 'smooth'
//     });
//   }
// };

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', subtitle: '' });

  const handleViewCourses = () => {
    setModalContent({
      title: "View My Courses",
      subtitle: "Discover comprehensive courses designed to elevate your automation and testing skills. From beginner to expert level."
    });
    setIsModalOpen(true);
  };

  const handlePartnerWithNikolay = () => {
    setModalContent({
      title: "Partner with Nikolay",
      subtitle: "Ready to transform your organization's approach to testing and automation? Let's discuss how we can work together."
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <ParallaxBackground />
        
        {/* Floating particles */}
        <FloatingParticles />

        {/* Main content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Name with proper spacing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                  <span className="block">Nikolay</span>
                  <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Advolodkin
                  </span>
                </h1>
                
                {/* Professional Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <AnimatedTitle />
                </motion.div>
              </motion.div>

              {/* Purpose Statement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                <p className="text-2xl lg:text-3xl font-bold text-primary-600 dark:text-primary-400 leading-relaxed">
                  &ldquo;My purpose is to elevate how people create technology&rdquo;
                </p>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                  Empowering developers and organizations worldwide with cutting-edge automation, 
                  AI integration, and testing excellence through education, consulting, and innovation.
                </p>
              </motion.div>

              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { label: "Developers Trained", value: "150,000+", icon: "👨‍💻" },
                  { label: "Countries Reached", value: "190", icon: "🌍" },
                  { label: "Years Experience", value: "16+", icon: "⚡" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    className="text-center p-4 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md rounded-xl border border-white/20 shadow-soft hover:shadow-medium transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400"
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </motion.svg>
                <span className="text-lg font-medium">Miami, FL</span>
              </motion.div>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Button
                  variant="gradient-primary"
                  size="lg"
                  onClick={handleViewCourses}
                  data-testid="view-courses"
                  className="flex-1 sm:flex-none min-w-[200px]"
                >
                  View Courses
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePartnerWithNikolay}
                  data-testid="partner-with-nikolay"
                  className="flex-1 sm:flex-none min-w-[200px]"
                >
                  Partner with Nikolay
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative flex flex-col items-center space-y-8"
            >
              {/* Enhanced Avatar */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ModernAvatar />
              </motion.div>

              {/* Tech Stack Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex flex-wrap justify-center gap-3 max-w-md"
              >
                {[
                  { name: "TypeScript", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
                  { name: "Playwright", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
                  { name: "AI Training", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
                  { name: "Test Automation", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
                  { name: "JavaScript", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
                  { name: "Cypress", color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200" }
                ].map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.2 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-3 py-2 rounded-full text-sm font-medium ${tech.color} backdrop-blur-md border border-white/20 shadow-soft hover:shadow-medium transition-all duration-200`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>

              {/* Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="grid grid-cols-2 gap-4 w-full max-w-sm"
              >
                {[
                  { icon: "🏆", label: "Industry Leader", desc: "Automation Excellence" },
                  { icon: "🎯", label: "UltimateQA", desc: "Founder & CEO" },
                  { icon: "🌟", label: "International", desc: "Speaker & Trainer" },
                  { icon: "🚀", label: "Innovation", desc: "AI & Testing Pioneer" }
                ].map((badge, index) => (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="text-center p-3 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-md rounded-lg border border-white/30 shadow-soft hover:shadow-medium transition-all duration-300"
                  >
                    <div className="text-xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {badge.label}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-300">
                      {badge.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-neutral-400/50 dark:border-neutral-600/50 rounded-full flex justify-center cursor-pointer hover:border-primary-400 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            aria-label="Scroll down"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
          >
            <motion.div 
              className="w-1 h-3 bg-gradient-to-b from-primary-400 to-secondary-400 rounded-full mt-2"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* HubSpot Modal */}
      <HubSpotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        subtitle={modalContent.subtitle}
      />
    </>
  );
} 