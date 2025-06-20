'use client';

import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Button from './ui/Button';

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
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleContactClick}
          className="!w-14 !h-14 !p-0 rounded-full shadow-lg"
          aria-label="Contact me"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton; 