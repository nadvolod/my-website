'use client';

import { navigationItems } from '@/lib/links';
import {
    ChevronUpIcon,
    MagnifyingGlassIcon,
    MoonIcon,
    SunIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';
import Button from './ui/Button';

// Throttle function for scroll events
const throttle = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  return (...args: unknown[]) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Throttled scroll handler - 100ms throttle for better performance
  const handleScroll = useCallback(
    throttle(() => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setShowBackToTop(scrollPosition > 500);

      // Simplified active section detection
      if (scrollPosition < 100) {
        setActiveSection('hero');
      } else if (scrollPosition < 800) {
        setActiveSection('about');
      } else if (scrollPosition < 1600) {
        setActiveSection('services');
      } else if (scrollPosition < 2400) {
        setActiveSection('speaking');
      } else if (scrollPosition < 3200) {
        setActiveSection('courses');
      } else {
        setActiveSection('contact');
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Handle back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // You could integrate with a search service or filter content
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Don't render theme toggle until mounted
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                NA
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Main Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg transform' 
            : 'bg-transparent'
        }`}
        style={{
          transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0"
            >
              <button
                onClick={() => scrollToSection('hero')}
                className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Go to homepage"
              >
                Nikolay Advolodkin
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Open search"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  data-testid="theme-toggle"
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {resolvedTheme === 'dark' ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* CTA Button */}
              <Button
                variant="primary"
                size="md"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-1">
              <button
                onClick={toggleMobileMenu}
                data-testid="mobile-menu-toggle"
                className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors min-h-touch min-w-touch rounded-lg"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.svg
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search content, courses, or topics..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="Search"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="flex-1 px-6 py-4" role="navigation" aria-label="Mobile navigation">
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      item.external ? (
                        <a
                          key={item.id}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 min-h-touch text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-4 py-4 rounded-lg text-base font-medium transition-all duration-200 min-h-touch ${
                            activeSection === item.id
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          aria-current={activeSection === item.id ? 'page' : undefined}
                        >
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                </nav>

                {/* Mobile Search */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-label="Search"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </form>
                </div>

                {/* Mobile CTA */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => scrollToSection('contact')}
                    className="w-full"
                  >
                    Get In Touch
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-8 right-8 z-40"
          >
            <Button
              variant="primary"
              size="md"
              onClick={scrollToTop}
              className="!p-3 rounded-full shadow-lg"
              aria-label="Back to top"
            >
              <ChevronUpIcon className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 