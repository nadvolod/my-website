'use client';

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  onContactClick?: () => void;
}

const FloatingActionButton = ({ onContactClick }: FloatingActionButtonProps) => {
  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {/* Simple contact button */}
      <motion.button
        onClick={handleContactClick}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Contact me"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default FloatingActionButton; 