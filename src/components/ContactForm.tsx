'use client';

import {
    CheckCircleIcon,
    DocumentArrowUpIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface ContactFormProps {
  formType: string;
  leadScore: number;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  message: string;
  budget?: string;
  timeline?: string;
  eventDate?: string;
  attendeeCount?: string;
  topics?: string[];
  gdprConsent: boolean;
  marketingConsent: boolean;
  [key: string]: string | boolean | string[] | undefined;
}

const ContactForm: React.FC<ContactFormProps> = ({ formType, leadScore }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    message: '',
    gdprConsent: false,
    marketingConsent: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // HubSpot configuration
  const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || 'your-portal-id';
  const HUBSPOT_FORM_IDS = {
    general: process.env.NEXT_PUBLIC_HUBSPOT_FORM_GENERAL || 'general-form-id',
    speaking: process.env.NEXT_PUBLIC_HUBSPOT_FORM_SPEAKING || 'speaking-form-id',
    'corporate-training': process.env.NEXT_PUBLIC_HUBSPOT_FORM_CORPORATE || 'corporate-form-id',
    'automation-services': process.env.NEXT_PUBLIC_HUBSPOT_FORM_AUTOMATION || 'automation-form-id',
    'ai-business': process.env.NEXT_PUBLIC_HUBSPOT_FORM_AI_BUSINESS || 'ai-business-form-id',
    'ai-developers': process.env.NEXT_PUBLIC_HUBSPOT_FORM_AI_DEV || 'ai-dev-form-id',
    'web-development': process.env.NEXT_PUBLIC_HUBSPOT_FORM_WEB || 'web-form-id',
    'education-partnership': process.env.NEXT_PUBLIC_HUBSPOT_FORM_EDU || 'edu-form-id',
    newsletter: process.env.NEXT_PUBLIC_HUBSPOT_FORM_NEWSLETTER || 'newsletter-form-id'
  };

  // Load HubSpot tracking script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.hbspt) {
      const script = document.createElement('script');
      script.src = '//js.hs-scripts.com/' + HUBSPOT_PORTAL_ID + '.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const budgetRanges = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: 'over-100k', label: 'Over $100,000' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const speakingTopics = [
    'Test Automation Strategy',
    'AI in Testing',
    'Playwright vs Selenium',
    'CI/CD for Testing',
    'JavaScript Testing',
    'TypeScript for QA',
    'API Testing',
    'Performance Testing',
    'Mobile Testing',
    'DevOps for Testers'
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return !value ? 'This field is required' : '';
      case 'email':
        return !value ? 'Email is required' : 
               !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email' : '';
      case 'company':
        return !value ? 'Company is required' : '';
      case 'message':
        return !value ? 'Message is required' : 
               value.length < 10 ? 'Message must be at least 10 characters' : '';
      case 'gdprConsent':
        return !value ? 'You must agree to the privacy policy' : '';
      default:
        return '';
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, file: 'File size must be under 5MB' }));
        return;
      }
      setUploadedFile(file);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const submitToHubSpot = async (data: FormData) => {
    const formId = HUBSPOT_FORM_IDS[formType as keyof typeof HUBSPOT_FORM_IDS];
    
    const hubspotData = {
      portalId: HUBSPOT_PORTAL_ID,
      formId: formId,
      fields: [
        { name: 'firstname', value: data.firstName },
        { name: 'lastname', value: data.lastName },
        { name: 'email', value: data.email },
        { name: 'phone', value: data.phone },
        { name: 'company', value: data.company },
        { name: 'jobtitle', value: data.jobTitle },
        { name: 'message', value: data.message },
        { name: 'lead_score', value: leadScore.toString() },
        { name: 'inquiry_type', value: formType },
        { name: 'lead_source', value: 'website_contact_form' },
        { name: 'gdpr_consent', value: data.gdprConsent ? 'true' : 'false' },
        { name: 'marketing_consent', value: data.marketingConsent ? 'true' : 'false' }
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        hutk: document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      }
    };

    // Add form-specific fields
    if (data.budget) {
      hubspotData.fields.push({ name: 'budget_range', value: data.budget });
    }
    if (data.timeline) {
      hubspotData.fields.push({ name: 'project_timeline', value: data.timeline });
    }
    if (data.eventDate) {
      hubspotData.fields.push({ name: 'event_date', value: data.eventDate });
    }
    if (data.attendeeCount) {
      hubspotData.fields.push({ name: 'attendee_count', value: data.attendeeCount });
    }
    if (data.topics) {
      hubspotData.fields.push({ name: 'speaking_topics', value: data.topics.join(', ') });
    }

    try {
      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      return await response.json();
    } catch {
      setSubmitStatus('error');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Validate all required fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await submitToHubSpot(formData);
      setSubmitStatus('success');
      
      // Track conversion event
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: formType,
          value: leadScore
        });
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        message: '',
        gdprConsent: false,
        marketingConsent: false
      });
      setCurrentStep(1);
      
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    const titles = {
      general: 'General Contact Form',
      speaking: 'Speaking Engagement Request',
      'corporate-training': 'Corporate Training Inquiry',
      'automation-services': 'Automation Services Quote',
      'ai-business': 'AI Training for Business',
      'ai-developers': 'AI Training for Developers',
      'web-development': 'Web Development Project',
      'education-partnership': 'Education Partnership',
      newsletter: 'Newsletter Subscription'
    };
    return titles[formType as keyof typeof titles] || 'Contact Form';
  };

  const getStepCount = () => {
    if (formType === 'newsletter') return 1;
    if (['speaking', 'corporate-training', 'automation-services'].includes(formType)) return 3;
    return 2;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your first name"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your last name"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@company.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your job title"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Form-specific fields based on type */}
      {formType === 'speaking' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={formData.eventDate || ''}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Attendees
              </label>
              <select
                value={formData.attendeeCount || ''}
                onChange={(e) => handleInputChange('attendeeCount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select range</option>
                <option value="under-50">Under 50</option>
                <option value="50-100">50-100</option>
                <option value="100-250">100-250</option>
                <option value="250-500">250-500</option>
                <option value="over-500">Over 500</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speaking Topics of Interest
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {speakingTopics.map((topic) => (
                <label key={topic} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.topics?.includes(topic) || false}
                    onChange={(e) => {
                      const currentTopics = formData.topics || [];
                      const newTopics = e.target.checked
                        ? [...currentTopics, topic]
                        : currentTopics.filter(t => t !== topic);
                      handleInputChange('topics', newTopics);
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{topic}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Requirements Document
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Click to upload
                </span>
                <span className="text-gray-600"> or drag and drop</span>
              </label>
              <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX, TXT up to 5MB</p>
              {uploadedFile && (
                <p className="text-sm text-green-600 mt-2">✓ {uploadedFile.name}</p>
              )}
            </div>
          </div>
        </>
      )}

      {['corporate-training', 'automation-services', 'web-development'].includes(formType) && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {budgetRanges.map((range) => (
              <label key={range.value} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="budget"
                  value={range.value}
                  checked={formData.budget === range.value}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="mr-3"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Tell me more about your project or requirements..."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Timeline
        </label>
        <select
          value={formData.timeline || ''}
          onChange={(e) => handleInputChange('timeline', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-month">Within 1 month</option>
          <option value="1-3-months">1-3 months</option>
          <option value="3-6-months">3-6 months</option>
          <option value="6-months-plus">6+ months</option>
          <option value="planning">Just planning</option>
        </select>
      </div>

      {/* GDPR Compliance */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="gdpr-consent"
            checked={formData.gdprConsent}
            onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
            className="mt-1 mr-3"
          />
          <label htmlFor="gdpr-consent" className="text-sm text-gray-700">
            I agree to the <a href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</a> and 
            consent to the processing of my personal data for the purpose of this inquiry. *
          </label>
        </div>
        {errors.gdprConsent && <p className="text-red-500 text-sm">{errors.gdprConsent}</p>}

        <div className="flex items-start">
          <input
            type="checkbox"
            id="marketing-consent"
            checked={formData.marketingConsent}
            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
            className="mt-1 mr-3"
          />
          <label htmlFor="marketing-consent" className="text-sm text-gray-700">
            I would like to receive marketing communications about services, events, and educational content.
          </label>
        </div>
      </div>
    </div>
  );

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 shadow-lg text-center"
      >
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 mb-6">
          Your message has been received. I&apos;ll get back to you within {
            ['speaking', 'corporate-training', 'automation-services'].includes(formType) ? '4-12 hours' : '24 hours'
          }.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• You&apos;ll receive an email confirmation shortly</li>
            <li>• I&apos;ll review your requirements and prepare a response</li>
            <li>• We&apos;ll schedule a call to discuss your needs in detail</li>
            {formType === 'speaking' && <li>• I&apos;ll send you my speaker kit and availability</li>}
          </ul>
        </div>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-8 shadow-lg text-center"
      >
        <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">
          There was an error submitting your form. Please try again or contact me directly at nadvolod@gmail.com.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const totalSteps = getStepCount();

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{getFormTitle()}</h3>
        
        {totalSteps > 1 && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i + 1 <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
          )}

          <div className="ml-auto">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;