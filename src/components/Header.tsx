"use client";
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#speaking", label: "Speaking" },
  { href: "#courses", label: "Courses" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDark((d) => {
      if (!d) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return !d;
    });
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 glass backdrop-blur-md border-b border-border">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="font-bold text-xl tracking-tight text-gradient-primary">
          DevAdvocate
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <motion.li key={link.href} whileHover={{ scale: 1.05 }}>
              <Link 
                href={link.href} 
                className="text-foreground hover:text-primary-500 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {dark ? (
              <SunIcon className="w-5 h-5 text-secondary-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-primary-500" />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass backdrop-blur-md border-t border-border"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-foreground hover:text-primary-500 transition-colors duration-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
} 