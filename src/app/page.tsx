'use client';

import Courses from "@/components/Courses";
import { MobileOptimizer, PerformanceOptimizer } from "@/lib/performance";
import { useEffect } from 'react';
import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Speaking from "../components/Speaking";

export default function Home() {
  useEffect(() => {
    // Initialize performance monitoring
    PerformanceOptimizer.init();
    MobileOptimizer.init();

    // Register service worker for offline functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    // Preload critical resources
    const criticalImages = [
      '/hero-image.jpg',
      '/nikolay-profile.jpg',
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Add viewport meta tag for mobile optimization
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
    }

    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Page Load Performance:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
          });
        }
      });
    });

    performanceObserver.observe({ entryTypes: ['navigation'] });

    return () => {
      performanceObserver.disconnect();
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section - Critical above-the-fold content */}
      <section id="hero" className="relative">
        <Hero />
      </section>

      {/* Services Section */}
      <section id="services" className="relative">
        <Services />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative">
        <Projects />
      </section>

      {/* Speaking Section */}
      <section id="speaking" className="relative">
        <Speaking />
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative">
        <Courses />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <Contact />
      </section>

      {/* About Section */}
      <section id="about" className="relative">
        <About />
      </section>
    </main>
  );
}
