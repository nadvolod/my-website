'use client';

import {
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    GlobeAltIcon,
    PlayIcon,
    StarIcon,
    UserGroupIcon,
    VideoCameraIcon
} from '@heroicons/react/24/solid';
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
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'cicd', name: 'CI/CD' }
  ];

  const udemyCourses = [
    {
      id: 1,
      title: 'Complete Test Automation with Selenium WebDriver',
      category: 'automation',
      icon: '🔧',
      color: 'from-blue-500 to-blue-600',
      students: 45000,
      duration: '15 hours',
      lessons: 120,
      features: ['Selenium WebDriver', 'Page Object Model', 'TestNG Framework', 'CI/CD Integration'],
      testimonial: "Best automation course I've ever taken! Clear explanations and practical examples.",
      studentName: "Sarah Chen, QA Engineer",
      url: 'https://www.udemy.com/user/nikolaya/'
    },
    {
      id: 2,
      title: 'JavaScript for Test Automation Engineers',
      category: 'javascript',
      icon: '📜',
      color: 'from-yellow-500 to-yellow-600',
      students: 32000,
      duration: '12 hours',
      lessons: 95,
      features: ['ES6+ Features', 'Async/Await', 'DOM Manipulation', 'API Testing'],
      testimonial: "Perfect for testers wanting to level up their JavaScript skills!",
      studentName: "Mike Rodriguez, Automation Tester",
      url: 'https://www.udemy.com/user/nikolaya/'
    },
    {
      id: 3,
      title: 'TypeScript for Modern Test Automation',
      category: 'typescript',
      icon: '🔷',
      color: 'from-blue-600 to-indigo-600',
      students: 28000,
      duration: '18 hours',
      lessons: 140,
      features: ['Type Safety', 'Interface Design', 'Generics', 'Playwright with TypeScript'],
      testimonial: "Finally understand TypeScript! The examples are incredibly helpful.",
      studentName: "Lisa Park, Senior QA",
      url: 'https://www.udemy.com/user/nikolaya/'
    },
    {
      id: 4,
      title: 'CI/CD Pipeline Mastery for Testers',
      category: 'cicd',
      icon: '⚙️',
      color: 'from-green-500 to-green-600',
      students: 21000,
      duration: '14 hours',
      lessons: 105,
      features: ['Jenkins', 'GitHub Actions', 'Docker', 'Test Reporting'],
      testimonial: "Game-changer for understanding DevOps and testing integration!",
      studentName: "David Kim, DevOps Engineer",
      url: 'https://www.udemy.com/user/nikolaya/'
    }
  ];

  const podcastEpisodes = [
    {
      id: 1,
      title: 'Playwright vs Selenium: Which Should You Choose?',
      views: '125K',
      duration: '15:32',
      icon: '🎭',
      color: 'from-purple-500 to-purple-600',
      category: 'Comparison'
    },
    {
      id: 2,
      title: 'AI in Test Automation - The Future is Here',
      views: '89K',
      duration: '22:18',
      icon: '🤖',
      color: 'from-red-500 to-red-600',
      category: 'AI & Testing'
    },
    {
      id: 3,
      title: 'Building Your First Playwright Test',
      views: '156K',
      duration: '18:45',
      icon: '🏗️',
      color: 'from-blue-500 to-blue-600',
      category: 'Tutorial'
    },
    {
      id: 4,
      title: 'JavaScript Testing Best Practices',
      views: '73K',
      duration: '12:29',
      icon: '✨',
      color: 'from-green-500 to-green-600',
      category: 'Best Practices'
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
            <h3 className="text-xl font-bold mb-2">{video.title}</h3>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{video.views} views</span>
              <span>{video.duration}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
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
            Empowering 150,000+ students across 190 countries with cutting-edge automation skills
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
              All content is FREE - Join 150,000+ developers learning automation
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
              Join 150,000+ developers
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
                    <p className="text-sm text-gray-700 italic mb-2">"{course.testimonial}"</p>
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