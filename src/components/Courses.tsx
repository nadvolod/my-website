'use client';

import { WEBSITE_STATS } from '@/config/stats';
import {
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    GlobeAltIcon,
    PlayIcon,
    StarIcon,
    UserGroupIcon,
    VideoCameraIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<{
    id: number;
    title: string;
    views: string;
    duration: string;
    icon: string;
    color: string;
    category: string;
  } | null>(null);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'automation', name: 'Test Automation' },
    { id: 'ai', name: 'AI & Testing' },
    { id: 'javascript', name: 'JavaScript & Web' },
    { id: 'enterprise', name: 'Enterprise Solutions' }
  ];

  const udemyCourses = [
    {
      id: 1,
      title: 'Complete Selenium WebDriver with Java Bootcamp',
      category: 'automation',
      icon: '☕',
      color: 'from-orange-500 to-orange-600',
      students: 100000,
      duration: '25 hours',
      lessons: 150,
      rating: '4.5',
      features: ['Complete Selenium WebDriver', 'TestNG Framework', 'Page Object Model', 'Maven Integration', 'CI/CD Pipeline'],
      testimonial: "The most comprehensive Selenium course available. Nikolay's teaching style is exceptional!",
      studentName: "Alex Rodriguez, Senior QA Engineer",
      url: 'https://www.udemy.com/course/selenium-webdriver-java-testng-framework/'
    },
    {
      id: 2,
      title: 'AI-Powered Testing: Modern Automation with ChatGPT',
      category: 'ai',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      students: 25000,
      duration: '18 hours',
      lessons: 120,
      rating: '4.6',
      features: ['ChatGPT Integration', 'AI Test Generation', 'Automated Test Creation', 'Prompt Engineering', 'Modern Testing Workflows'],
      testimonial: "Revolutionary approach to testing! AI integration changed how I work completely.",
      studentName: "Sarah Chen, Lead QA Engineer",
      url: 'https://www.udemy.com/user/nikolaya/'
    },
    {
      id: 3,
      title: 'Modern Web Testing with JavaScript & TypeScript',
      category: 'javascript',
      icon: '🌐',
      color: 'from-blue-500 to-blue-600',
      students: 45000,
      duration: '20 hours',
      lessons: 140,
      rating: '4.5',
      features: ['Playwright Automation', 'Cypress Testing', 'JavaScript ES6+', 'TypeScript Patterns', 'Modern Frameworks'],
      testimonial: "Perfect for modern web development testing. Covers all the latest tools and techniques.",
      studentName: "Mike Johnson, Full Stack Developer",
      url: 'https://www.udemy.com/user/nikolaya/'
    },
    {
      id: 4,
      title: 'Enterprise Test Automation Architecture',
      category: 'automation',
      icon: '🏗️',
      color: 'from-green-500 to-green-600',
      students: 32000,
      duration: '22 hours',
      lessons: 160,
      rating: '4.7',
      features: ['Enterprise Architecture', 'Scalable Frameworks', 'CI/CD Integration', 'Docker & Kubernetes', 'Best Practices'],
      testimonial: "Transformed our entire testing strategy. Enterprise-grade knowledge from a true expert.",
      studentName: "Lisa Park, QA Director",
      url: 'https://www.udemy.com/user/nikolaya/'
    },
    {
      id: 5,
      title: 'AI Development Workshop: From Concept to Deployment',
      category: 'ai',
      icon: '🚀',
      color: 'from-indigo-500 to-indigo-600',
      students: 18000,
      duration: '16 hours',
      lessons: 100,
      rating: '4.8',
      features: ['Full AI Workflow', 'ChatGPT Integration', 'Development Automation', 'Deployment Strategies', 'Real-world Projects'],
      testimonial: "Hands-on AI development course. Exactly what I needed to integrate AI into my workflow.",
      studentName: "David Kim, Senior Developer",
      url: 'https://www.udemy.com/user/nikolaya/'
    }
  ];

  const podcastEpisodes = [
    {
      id: 1,
      title: 'AI in Code, Testing, CI/CD: Revolutionizing Web Dev',
      views: '245K',
      duration: '28:15',
      icon: '🤖',
      color: 'from-purple-500 to-purple-600',
      category: 'AI & Development'
    },
    {
      id: 2,
      title: 'ChatGPT-4 Unleashed: Web Development Revolution',
      views: '189K',
      duration: '35:42',
      icon: '🚀',
      color: 'from-blue-500 to-blue-600',
      category: 'AI Integration'
    },
    {
      id: 3,
      title: 'Modern Testing with Playwright and AI',
      views: '156K',
      duration: '22:18',
      icon: '🎭',
      color: 'from-green-500 to-green-600',
      category: 'Testing & AI'
    },
    {
      id: 4,
      title: 'Enterprise Automation: Scaling Quality',
      views: '123K',
      duration: '31:29',
      icon: '🏢',
      color: 'from-orange-500 to-orange-600',
      category: 'Enterprise Solutions'
    },
    {
      id: 5,
      title: 'Training 150K+ Developers: Lessons Learned',
      views: '98K',
      duration: '25:33',
      icon: '👨‍🎓',
      color: 'from-red-500 to-red-600',
      category: 'Education & Training'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? udemyCourses 
    : udemyCourses.filter(course => course.category === selectedCategory);

  interface VideoModalProps {
    video: {
      id: number;
      title: string;
      views: string;
      duration: string;
      category: string;
    } | null;
    onClose: () => void;
  }

  // eslint-disable-next-line react/prop-types
  const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
    if (!video) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-video bg-gray-900 flex items-center justify-center">
            <PlayIcon className="h-16 w-16 text-white opacity-50" />
          </div>
          <div className="p-6">
            {/* eslint-disable-next-line react/prop-types */}
            <h3 className="text-xl font-bold mb-2">{video.title}</h3>
            <div className="flex items-center gap-4 text-gray-600">
              {/* eslint-disable-next-line react/prop-types */}
              <span>{video.views} views</span>
              {/* eslint-disable-next-line react/prop-types */}
              <span>{video.duration}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                {/* eslint-disable-next-line react/prop-types */}
                {video.category}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
            Educational Content & Courses
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Empowering {WEBSITE_STATS.studentsTraught} students across {WEBSITE_STATS.countriesReached} countries with cutting-edge automation skills
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: UserGroupIcon, stat: '150K+', label: 'Students Worldwide' },
              { icon: GlobeAltIcon, stat: '190', label: 'Countries Reached' },
              { icon: StarIcon, stat: '4.7', label: 'Average Rating' },
              { icon: ChartBarIcon, stat: '45K+', label: 'Monthly Podcast Views' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-md"
              >
                <item.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{item.stat}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* UltimateQA Platform Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-16"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">UltimateQA Platform</h3>
            <p className="text-xl mb-6 text-purple-100">
              All content is FREE - Join {WEBSITE_STATS.studentsTraught} developers learning automation
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <BookOpenIcon className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Comprehensive Courses</h4>
                <p className="text-sm text-purple-100">Complete learning paths for all skill levels</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <UserGroupIcon className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Community Support</h4>
                <p className="text-sm text-purple-100">Connect with fellow automation engineers</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <AcademicCapIcon className="h-8 w-8 mx-auto mb-2" />
                <h4 className="font-semibold mb-2">Expert Guidance</h4>
                <p className="text-sm text-purple-100">Learn from industry-leading practices</p>
              </div>
            </div>
            <motion.a
              href="https://ultimateqa.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Join {WEBSITE_STATS.studentsTraught} developers
            </motion.a>
          </div>
        </motion.div>

        {/* Course Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Udemy Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Udemy Courses
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Course Icon Header */}
                <div className={`h-32 bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                  <span className="text-6xl">{course.icon}</span>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h4>
                  
                  {/* Course Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <UserGroupIcon className="h-4 w-4" />
                      {course.students.toLocaleString()} students
                    </span>
                    <span className="flex items-center gap-1">
                      <VideoCameraIcon className="h-4 w-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpenIcon className="h-4 w-4" />
                      {course.lessons} lessons
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                      {course.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{course.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700 italic mb-2">&quot;{course.testimonial}&quot;</p>
                    <p className="text-xs text-gray-600">- {course.studentName}</p>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Course on Udemy
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* UltimateQA Podcast Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Host of the UltimateQA Podcast
            </h3>
            <p className="text-gray-600 mb-6">
              Weekly episodes covering the latest in test automation, AI, and software quality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {podcastEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(episode)}
              >
                {/* Episode Icon Header */}
                <div className={`h-24 bg-gradient-to-r ${episode.color} flex items-center justify-center`}>
                  <span className="text-4xl">{episode.icon}</span>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{episode.title}</h4>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{episode.views} views</span>
                    <span>{episode.duration}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {episode.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.a
              href="https://ultimateqa.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <PlayIcon className="h-5 w-5" />
              Listen to UltimateQA Podcast
            </motion.a>
          </div>
        </motion.div>

        {/* Video Modal */}
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </div>
    </section>
  );
};

export default Courses;