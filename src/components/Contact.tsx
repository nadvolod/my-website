'use client';

import {
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import HubSpotForm from './HubSpotForm';

const Contact = () => {
  const [isAvailable, setIsAvailable] = useState(false);

  // Check if it's business hours (9 AM - 6 PM EST)
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const est = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const hour = est.getHours();
      const day = est.getDay();
      
      // Monday = 1, Friday = 5, Saturday = 6, Sunday = 0
      const isWeekday = day >= 1 && day <= 5;
      const isBusinessHours = hour >= 9 && hour < 18;
      
      setIsAvailable(isWeekday && isBusinessHours);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const contactInfo = {
    email: 'nikolay@ultimateqa.com',
    location: 'Miami, FL',
    timezone: 'Eastern Time (EST/EDT)',
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/nikolayadvolodkin',
      icon: '💼',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@UltimateQA',
      icon: '📺',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/nikolayadvolodkin',
      icon: '🐙',
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/nikolayadvolod',
      icon: '🐦',
      color: 'bg-black hover:bg-gray-800'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ready to transform your testing strategy? Let&apos;s discuss how I can help your team achieve automation excellence.
          </p>
          
          {/* Availability Status */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isAvailable ? 'Available now' : 'Outside business hours'} • Response within {isAvailable ? '2-4 hours' : '24 hours'}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Direct Contact */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-700">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-600">{contactInfo.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Timezone</div>
                    <div className="text-gray-600">{contactInfo.timezone}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${link.color} text-white p-3 rounded-lg text-center transition-colors flex flex-col items-center gap-1`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* HubSpot Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <HubSpotForm 
                formTitle="Send Me a Message"
                className="hubspot-contact-form"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 