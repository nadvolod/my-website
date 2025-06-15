'use client';

import {
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContactForm from './ContactForm';

const Contact = () => {
  const [selectedFormType, setSelectedFormType] = useState('general');
  const [isAvailable, setIsAvailable] = useState(true);

  // Check availability based on Miami timezone
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const miamiTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const hour = miamiTime.getHours();
      const day = miamiTime.getDay();
      
      // Available Mon-Fri 9AM-6PM Miami time
      setIsAvailable(day >= 1 && day <= 5 && hour >= 9 && hour <= 18);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const contactInfo = {
    email: 'nikolay@ultimateqa.com',
    location: 'Miami, FL',
    timezone: 'Eastern Time (UTC-5)'
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nikolayadvolodkin/',
      icon: '💼',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/nadvolod',
      icon: '🐙',
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      name: 'UltimateQA',
      url: 'https://ultimateqa.com/nikolay-advolodkin',
      icon: '🎯',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      name: 'Udemy',
      url: 'https://www.udemy.com/user/nikolaya/',
      icon: '📚',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@nikolayadvolodkin',
      icon: '📺',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com/nikolayadvolod',
      icon: '🐦',
      color: 'bg-black hover:bg-gray-800'
    }
  ];

  const formTypes = [
    {
      id: 'general',
      name: 'General Contact',
      description: 'General inquiries and consultation requests',
      icon: '💬',
      leadScore: 5
    },
    {
      id: 'speaking',
      name: 'Speaking Engagement',
      description: 'Conference talks, keynotes, and workshops',
      icon: '🎤',
      leadScore: 15
    },
    {
      id: 'corporate-training',
      name: 'Corporate Training',
      description: 'Team training and enterprise workshops',
      icon: '🏢',
      leadScore: 20
    },
    {
      id: 'automation-services',
      name: 'Automation Services',
      description: 'Test automation consulting and implementation',
      icon: '🤖',
      leadScore: 25
    },
    {
      id: 'ai-business',
      name: 'AI Training for Business',
      description: 'Executive AI workshops and business transformation',
      icon: '🧠',
      leadScore: 20
    },
    {
      id: 'ai-developers',
      name: 'AI Training for Developers',
      description: 'Developer-focused AI tools and techniques',
      icon: '👨‍💻',
      leadScore: 15
    },
    {
      id: 'web-development',
      name: 'Web Development',
      description: 'Custom web applications and development services',
      icon: '🌐',
      leadScore: 18
    },
    {
      id: 'education-partnership',
      name: 'Education Partnership',
      description: 'Course collaborations and educational content',
      icon: '🎓',
      leadScore: 12
    },
    {
      id: 'newsletter',
      name: 'Newsletter Subscription',
      description: 'Stay updated with latest insights and content',
      icon: '📧',
      leadScore: 3
    }
  ];

  const responseTimeInfo = [
    { type: 'General Inquiries', time: '24 hours', priority: 'standard' },
    { type: 'Speaking Engagements', time: '12 hours', priority: 'high' },
    { type: 'Corporate Training', time: '6 hours', priority: 'urgent' },
    { type: 'Automation Services', time: '4 hours', priority: 'urgent' }
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
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${link.color} text-white p-3 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg`}
                  >
                    <div className="text-lg mb-1">{link.icon}</div>
                    <div className="text-xs font-medium">{link.name}</div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Response Times</h3>
              <div className="space-y-3">
                {responseTimeInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{info.type}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      info.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                      info.priority === 'high' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {info.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              {/* Form Type Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What can I help you with?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedFormType(type.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                        selectedFormType === type.id
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{type.icon}</span>
                        <span className="font-medium text-sm">{type.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm 
                formType={selectedFormType}
                leadScore={formTypes.find(t => t.id === selectedFormType)?.leadScore || 5}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 