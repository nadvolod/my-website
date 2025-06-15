'use client';

import { realLinks } from '@/lib/links';
import { ChatBubbleLeftRightIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface FloatingActionButtonProps {
  onContactClick?: () => void;
}

const FloatingActionButton = ({ onContactClick }: FloatingActionButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsExpanded(false);
  };

  const handleCalendlyClick = () => {
    window.open(realLinks.calendly, '_blank', 'noopener,noreferrer');
    setIsExpanded(false);
  };

  const actionItems = [
    {
      id: 'contact',
      label: 'Contact Form',
      icon: ChatBubbleLeftRightIcon,
      onClick: handleContactClick,
      className: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      id: 'calendly',
      label: 'Schedule Call',
      icon: PhoneIcon,
      onClick: handleCalendlyClick,
      className: 'bg-green-600 hover:bg-green-700 text-white',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actionItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 20,
                  transition: { delay: (actionItems.length - index - 1) * 0.1 }
                }}
                onClick={item.onClick}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-full shadow-lg
                  min-h-touch min-w-touch transition-all duration-200
                  ${item.className}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-lg
          transition-all duration-300 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-blue-500
          ${isExpanded 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        aria-label={isExpanded ? 'Close contact options' : 'Open contact options'}
      >
        {isExpanded ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </motion.button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton; 