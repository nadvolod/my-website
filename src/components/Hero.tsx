"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui";

// Professional headshot component - simplified
const ProfessionalHeadshot = () => (
  <div className="mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-700 mb-8">
    <div className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-secondary-500 flex items-center justify-center relative">
      {/* Professional silhouette */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-24 h-24 md:w-28 md:h-28 text-white/90"
        fill="currentColor"
      >
        <circle cx="50" cy="35" r="15" />
        <path d="M20 85 C20 65, 35 55, 50 55 C65 55, 80 65, 80 85 L20 85 Z" />
      </svg>
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  </div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Professional Headshot */}
          <ProfessionalHeadshot />

          {/* Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white leading-tight">
            Nikolay Advolodkin
          </h1>

          {/* Static Title - removed typewriter animation */}
          <div className="h-16 md:h-20 flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Developer Advocate & Automation Expert
            </h2>
          </div>

          {/* Key Statistics - Restructured as requested */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              <span className="font-semibold text-primary-600 dark:text-primary-400">Trained 150,000+ developers across 190 countries</span>
              <span className="mx-2">|</span>
              <span className="font-semibold text-secondary-600 dark:text-secondary-400">International Speaker</span>
              <span className="mx-2">|</span>
              <span className="font-semibold text-accent-600 dark:text-accent-400">Founder of UltimateQA</span>
              <br className="hidden sm:block" />
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">16+ years experience</span>
              <span className="mx-2">|</span>
              <span className="text-neutral-600 dark:text-neutral-400">Expert in: TypeScript, JavaScript, C#, Java, Playwright, Cypress</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center space-x-2 text-neutral-500 dark:text-neutral-400 mb-8">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg font-medium">Miami, FL</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pb-20">
            <Button
              variant="gradient-primary"
              size="lg"
              className="shadow-glow hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View Speaking Topics
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="transform hover:scale-105 transition-all duration-300"
            >
              Explore Courses
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Simplified Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
} 