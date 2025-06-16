'use client';

import {
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Contact = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

          {/* Simple Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Me a Message</h3>
              
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                  <p className="text-gray-600 mb-4">Your message has been sent successfully. I&apos;ll get back to you soon!</p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell me about your project or how I can help..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      There was an error sending your message. Please try again or email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 