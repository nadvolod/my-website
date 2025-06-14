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
  const [selectedVideo, setSelectedVideo] = useState(null);

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
      thumbnail: '/api/placeholder/300/200',
      rating: 4.6,
      students: 45000,
      price: '$89.99',
      originalPrice: '$199.99',
      duration: '15 hours',
      lessons: 120,
      features: ['Selenium WebDriver', 'Page Object Model', 'TestNG Framework', 'CI/CD Integration'],
      testimonial: "Best automation course I've ever taken! Clear explanations and practical examples.",
      studentName: "Sarah Chen, QA Engineer"
    },
    {
      id: 2,
      title: 'JavaScript for Test Automation Engineers',
      category: 'javascript',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.7,
      students: 32000,
      price: '$79.99',
      originalPrice: '$179.99',
      duration: '12 hours',
      lessons: 95,
      features: ['ES6+ Features', 'Async/Await', 'DOM Manipulation', 'API Testing'],
      testimonial: "Perfect for testers wanting to level up their JavaScript skills!",
      studentName: "Mike Rodriguez, Automation Tester"
    },
    {
      id: 3,
      title: 'TypeScript for Modern Test Automation',
      category: 'typescript',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.8,
      students: 28000,
      price: '$94.99',
      originalPrice: '$219.99',
      duration: '18 hours',
      lessons: 140,
      features: ['Type Safety', 'Interface Design', 'Generics', 'Playwright with TypeScript'],
      testimonial: "Finally understand TypeScript! The examples are incredibly helpful.",
      studentName: "Lisa Park, Senior QA"
    },
    {
      id: 4,
      title: 'CI/CD Pipeline Mastery for Testers',
      category: 'cicd',
      thumbnail: '/api/placeholder/300/200',
      rating: 4.5,
      students: 21000,
      price: '$99.99',
      originalPrice: '$229.99',
      duration: '14 hours',
      lessons: 105,
      features: ['Jenkins', 'GitHub Actions', 'Docker', 'Test Reporting'],
      testimonial: "Game-changer for understanding DevOps and testing integration!",
      studentName: "David Kim, DevOps Engineer"
    }
  ];

  const youtubeVideos = [
    {
      id: 1,
      title: 'Playwright vs Selenium: Which Should You Choose?',
      views: '125K',
      duration: '15:32',
      thumbnail: '/api/placeholder/400/225',
      category: 'Comparison'
    },
    {
      id: 2,
      title: 'AI in Test Automation - The Future is Here',
      views: '89K',
      duration: '22:18',
      thumbnail: '/api/placeholder/400/225',
      category: 'AI & Testing'
    },
    {
      id: 3,
      title: 'Building Your First Playwright Test',
      views: '156K',
      duration: '18:45',
      thumbnail: '/api/placeholder/400/225',
      category: 'Tutorial'
    },
    {
      id: 4,
      title: 'JavaScript Testing Best Practices',
      views: '73K',
      duration: '12:29',
      thumbnail: '/api/placeholder/400/225',
      category: 'Best Practices'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? udemyCourses 
    : udemyCourses.filter(course => course.category === selectedCategory);

  const VideoModal = ({ video, onClose }) => {
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
              { icon: ChartBarIcon, stat: '45K+', label: 'Monthly YouTube Views' }
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

        {/* Udemy Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <AcademicCapIcon className="h-8 w-8 text-purple-600" />
              Udemy Courses
            </h3>
            
            {/* Category Filter */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <PlayIcon className="h-16 w-16 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {Math.round(((parseFloat(course.originalPrice.slice(1)) - parseFloat(course.price.slice(1))) / parseFloat(course.originalPrice.slice(1))) * 100)}% OFF
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h4>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <UserGroupIcon className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="text-gray-600">
                      {course.duration} • {course.lessons} lessons
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <blockquote className="text-sm text-gray-700 mb-2">
                      "{course.testimonial}"
                    </blockquote>
                    <cite className="text-xs text-gray-500">- {course.studentName}</cite>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* YouTube Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <VideoCameraIcon className="h-8 w-8 text-red-600" />
              YouTube Content
            </h3>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              <VideoCameraIcon className="h-5 w-5" />
              Subscribe
            </button>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  "The Test Automation Experience" Show
                </h4>
                <p className="text-gray-600 mb-4">
                  Weekly episodes covering the latest in test automation, AI tools, and industry insights
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">45K+ monthly views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserGroupIcon className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">25K+ subscribers</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <PlayIcon className="h-16 w-16 text-red-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {youtubeVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <PlayIcon className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h5>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{video.views} views</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {video.category}
                    </span>
                  </div>
                </div>
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
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="h-8 w-8" />
                <h3 className="text-3xl font-bold">UltimateQA Platform</h3>
              </div>
              <p className="text-blue-100 text-lg mb-6">
                Our mission is to democratize test automation knowledge and make it accessible to developers worldwide.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-blue-100">Free Articles</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-blue-100">Premium Courses</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-blue-100">Success Rate</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-blue-100">Community Support</div>
                </div>
              </div>

              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
                Join 150K+ Developers
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2">Free Tier</h4>
                <ul className="text-blue-100 space-y-1">
                  <li>• Access to 500+ free articles</li>
                  <li>• Basic tutorials and guides</li>
                  <li>• Community forum access</li>
                  <li>• Weekly newsletter</li>
                </ul>
              </div>
              
              <div className="bg-white/20 rounded-lg p-6 border-2 border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg">Premium Tier</h4>
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-sm font-bold">
                    POPULAR
                  </span>
                </div>
                <ul className="text-blue-100 space-y-1">
                  <li>• Everything in Free tier</li>
                  <li>• 50+ premium courses</li>
                  <li>• 1-on-1 mentoring sessions</li>
                  <li>• Certification programs</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
};

export default Courses;