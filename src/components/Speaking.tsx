'use client';

import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DocumentArrowDownIcon,
    EnvelopeIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PlayIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import HubSpotModal from './HubSpotModal';
import Button from './ui/Button';

// Types
interface SpeakingEngagement {
  id: string;
  title: string;
  conference: string;
  location: string;
  country: string;
  date: string;
  year: number;
  type: 'keynote' | 'workshop' | 'panel' | 'presentation';
  topic: string;
  description: string;
  audience: number;
  videoUrl?: string;
  slidesUrl?: string;
  featured: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

// Speaking engagements data - Updated with working links
const speakingEngagements: SpeakingEngagement[] = [
  {
    id: 'stareas-2024',
    title: 'AI-Driven Testing: The Future is Now',
    conference: 'StarEast 2024',
    location: 'Orlando, FL',
    country: 'USA',
    date: '2024-05-15',
    year: 2024,
    type: 'keynote',
    topic: 'AI & Testing',
    description: 'Exploring how AI is revolutionizing test automation and quality assurance practices',
    audience: 850,
    videoUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    slidesUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    featured: true,
    testimonial: {
      quote: "Nikolay's keynote was the highlight of our conference. His insights on AI testing were groundbreaking.",
      author: "Sarah Johnson",
      role: "Conference Director, StarEast"
    }
  },
  {
    id: 'infoshare-2023',
    title: 'ChatGPT Takes on Web Development',
    conference: 'InfoShare 2023',
    location: 'Gdansk, Poland',
    country: 'Poland',
    date: '2023-10-20',
    year: 2023,
    type: 'presentation',
    topic: 'AI & Development',
    description: 'Practical applications of ChatGPT in modern web development workflows',
    audience: 650,
    videoUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    slidesUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    featured: true,
    testimonial: {
      quote: "Attendees couldn't stop talking about Nikolay's practical AI examples. Exceptional speaker!",
      author: "Marcin Kowalski",
      role: "Event Organizer, InfoShare"
    }
  },
  {
    id: 'productivity-conf',
    title: 'Anthropic Unleashed: Revolutionizing Web Development',
    conference: 'Productivity Conference',
    location: 'San Francisco, CA',
    country: 'USA',
    date: '2024-03-12',
    year: 2024,
    type: 'workshop',
    topic: 'AI & Productivity',
    description: 'Hands-on workshop on leveraging Claude and other AI tools for development productivity',
    audience: 200,
    slidesUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    featured: true,
    testimonial: {
      quote: "The most practical AI workshop I've attended. Nikolay's expertise is unmatched.",
      author: "Alex Chen",
      role: "CTO, TechStartup Inc"
    }
  },
  {
    id: 'ato-2024',
    title: 'From Code to Cloud: CI/CD with Playwright',
    conference: 'All Things Open 2024',
    location: 'Raleigh, NC',
    country: 'USA',
    date: '2024-10-28',
    year: 2024,
    type: 'presentation',
    topic: 'Testing & DevOps',
    description: 'Complete guide to implementing Playwright in CI/CD pipelines for enterprise applications',
    audience: 750,
    videoUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    slidesUrl: 'https://ultimateqa.com/nikolay-advolodkin',
    featured: true
  }
];

// Speaker statistics - Removed rating
const speakerStats = [
  { label: 'Annual Presentations', value: '12+', icon: '🎤' },
  { label: 'Countries Visited', value: '25+', icon: '🌍' },
  { label: 'Total Attendees', value: '15K+', icon: '👥' },
  { label: 'Years Speaking', value: '8+', icon: '📅' },
];

// Conference logos - Updated with working links
const conferences = [
  { name: 'StarEast', logo: '⭐', website: 'https://stareast.techwell.com', location: 'Orlando, FL' },
  { name: 'InfoShare', logo: '💡', website: 'https://infoshare.pl', location: 'Gdansk, Poland' },
  { name: 'All Things Open', logo: '🔓', website: 'https://allthingsopen.org', location: 'Raleigh, NC' },
  { name: 'SeleniumConf', logo: '🧪', website: 'https://seleniumconf.com', location: 'Chicago, IL' },
  { name: 'DevOps Days', logo: '⚙️', website: 'https://devopsdays.org', location: 'Berlin, Germany' },
  { name: 'TestBash', logo: '🔨', website: 'https://testbash.com', location: 'Brighton, UK' },
];

const Speaking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Get unique years and topics
  const years = useMemo(() => {
    const uniqueYears = [...new Set(speakingEngagements.map(e => e.year))].sort((a, b) => b - a);
    return ['All', ...uniqueYears.map(String)];
  }, []);

  const topics = useMemo(() => {
    const uniqueTopics = [...new Set(speakingEngagements.map(e => e.topic))];
    return ['All', ...uniqueTopics];
  }, []);

  // Filter engagements
  const filteredEngagements = useMemo(() => {
    return speakingEngagements.filter(engagement => {
      const matchesSearch = engagement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          engagement.conference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopic === 'All' || engagement.topic === selectedTopic;
      const matchesYear = selectedYear === 'All' || engagement.year.toString() === selectedYear;

      return matchesSearch && matchesTopic && matchesYear;
    });
  }, [searchTerm, selectedTopic, selectedYear]);

  // Get testimonials
  const testimonials = useMemo(() => {
    return speakingEngagements
      .filter(e => e.featured && e.testimonial)
      .map(e => e.testimonial!);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'keynote': return '🎯';
      case 'workshop': return '🛠️';
      case 'panel': return '💬';
      case 'presentation': return '📊';
      default: return '🎤';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'keynote': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'workshop': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'panel': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'presentation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" id="speaking">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              International <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Speaking</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Sharing expertise on AI, automation, and testing with global audiences at premier tech conferences
            </p>

            {/* Speaker Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {speakerStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search presentations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic === 'All' ? 'All Topics' : topic}</option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Speaking Engagements Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {filteredEngagements.map((engagement, index) => (
              <motion.div
                key={engagement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden ${engagement.featured ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getTypeIcon(engagement.type)}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(engagement.type)}`}>
                        {engagement.type}
                      </span>
                    </div>
                    {engagement.featured && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title and Conference */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {engagement.title}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-3">
                    <span className="font-semibold">{engagement.conference}</span>
                  </div>

                  {/* Location and Date */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      {engagement.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(engagement.date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {engagement.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <UserGroupIcon className="h-4 w-4" />
                      {engagement.audience.toLocaleString()} attendees
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {engagement.videoUrl && (
                      <a
                        href={engagement.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        <PlayIcon className="h-4 w-4" />
                        Watch
                      </a>
                    )}
                    {engagement.slidesUrl && (
                      <a
                        href={engagement.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                        Slides
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                What Event Organizers Say
              </h3>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-6xl mb-4">💬</div>
                    <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed max-w-4xl mx-auto">
                      &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                    </blockquote>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                {testimonials.length > 1 && (
                  <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                      className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Conference Logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Trusted by Premier Conferences
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
                {conferences.map((conference, index) => (
                  <motion.a
                    key={conference.name}
                    href={conference.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    <div className="text-3xl">{conference.logo}</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {conference.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 text-center">
                      {conference.location}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Book Nikolay Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-3xl font-bold mb-4">Book Nikolay for Your Event</h3>
            <p className="text-xl mb-6 opacity-90">
              Bring world-class expertise in AI, automation, and testing to your conference
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold mb-1">Keynotes</div>
                <div className="text-sm opacity-80">Inspire your audience</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🛠️</div>
                <div className="font-semibold mb-1">Workshops</div>
                <div className="text-sm opacity-80">Hands-on learning</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold mb-1">Presentations</div>
                <div className="text-sm opacity-80">Expert insights</div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowBookingForm(true)}
                className="bg-white text-blue-600 border-white hover:bg-gray-50 shadow-lg"
                leftIcon={<EnvelopeIcon className="h-5 w-5" />}
              >
                Request Speaking Proposal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HubSpot Modal */}
      <HubSpotModal
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        title="Book Nikolay for Speaking"
        subtitle="Interested in having me speak at your event? Let's discuss how I can help inspire your audience with insights on AI, automation, and testing."
      />
    </>
  );
};

export default Speaking; 