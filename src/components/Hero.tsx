"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui";

// Tech stack icons as SVG components
const TechIcons = {
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  React: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
    </svg>
  ),
  Automation: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )
};

// Animated typing hook
const useTypewriter = (texts: string[], speed = 100, deleteSpeed = 50, pause = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentText = texts[currentTextIndex];
    
    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts, speed, deleteSpeed, pause]);

  return displayText;
};

// Floating tech icon component
const FloatingIcon = ({ children, delay = 0, duration = 6 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    className="absolute text-primary-400/30 dark:text-primary-300/20"
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Professional headshot component
const ProfessionalHeadshot = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-700 mb-8"
  >
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
  </motion.div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const typingText = useTypewriter([
    "Developer Advocate",
    "International Speaker", 
    "Automation Expert",
    "Course Creator"
  ]);

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900" />
      
      {/* Animated mesh gradient overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(0,102,204,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(255,107,53,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(0,208,132,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(0,102,204,0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Tech Icons */}
      <FloatingIcon delay={0} duration={5}>
        <div className="absolute top-20 left-20 lg:top-32 lg:left-32">
          <TechIcons.TypeScript />
        </div>
      </FloatingIcon>
      
      <FloatingIcon delay={1} duration={7}>
        <div className="absolute top-40 right-16 lg:top-48 lg:right-24">
          <TechIcons.JavaScript />
        </div>
      </FloatingIcon>
      
      <FloatingIcon delay={2} duration={6}>
        <div className="absolute bottom-32 left-12 lg:bottom-40 lg:left-20">
          <TechIcons.React />
        </div>
      </FloatingIcon>
      
      <FloatingIcon delay={3} duration={8}>
        <div className="absolute bottom-20 right-20 lg:bottom-32 lg:right-32">
          <TechIcons.Automation />
        </div>
      </FloatingIcon>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Professional Headshot */}
          <ProfessionalHeadshot />

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white leading-tight"
          >
            Nikolay Advolodkin
          </motion.h1>

          {/* Animated Typing Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-16 md:h-20 flex items-center justify-center"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {typingText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-primary-500"
              >
                |
              </motion.span>
            </h2>
          </motion.div>

          {/* Key Statistics/Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8"
          >
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-4 shadow-soft">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">150,000+</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Developers Trained</div>
            </div>
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-4 shadow-soft">
              <div className="text-2xl md:text-3xl font-bold text-secondary-600 dark:text-secondary-400">190</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Countries Reached</div>
            </div>
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-4 shadow-soft">
              <div className="text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400">16+</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Years Experience</div>
            </div>
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl p-4 shadow-soft">
              <div className="text-lg md:text-xl font-bold text-neutral-700 dark:text-neutral-300">UltimateQA</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">Founder</div>
            </div>
          </motion.div>

          {/* Expertise Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {['TypeScript', 'JavaScript', 'C#', 'Java', 'Playwright', 'Cypress'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-700"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center space-x-2 text-neutral-500 dark:text-neutral-400"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg font-medium">Miami, FL</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
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
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 