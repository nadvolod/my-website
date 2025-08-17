'use client';

import { EnvelopeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { NEWSLETTER_INFO } from '@/config/stats';

const Newsletters = () => {
  const newsletters = [
    NEWSLETTER_INFO.weekly,
    NEWSLETTER_INFO.jsTestingTips,
    NEWSLETTER_INFO.playwrightTips,
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
            Stay Updated with Expert Insights
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers and testers getting the latest tips, techniques, and industry insights delivered to their inbox.
          </p>
        </motion.div>

        {/* Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletters.map((newsletter, index) => (
            <motion.div
              key={newsletter.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${newsletter.color}`}></div>
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{newsletter.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {newsletter.title}
                    </h3>
                    <p className="text-sm text-gray-600">{newsletter.frequency}</p>
                  </div>
                </div>

                {/* Subtitle and Description */}
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  {newsletter.subtitle}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {newsletter.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <UserGroupIcon className="h-4 w-4" />
                    {newsletter.subscribers} subscribers
                  </div>
                </div>

                {/* Topics */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {newsletter.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonials for weekly newsletter */}
                {'testimonials' in newsletter && newsletter.testimonials.length > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      What readers say:
                    </h4>
                    {newsletter.testimonials.map((testimonial, idx) => (
                      <blockquote key={idx} className="text-sm text-gray-600 italic mb-2 last:mb-0">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                    ))}
                  </div>
                )}

                {/* Subscribe Button */}
                <motion.a
                  href={newsletter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${newsletter.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300`}
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  Subscribe Now
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Level Up Your Skills
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each newsletter is packed with actionable insights, real-world examples, and cutting-edge techniques 
              to help you stay ahead in the rapidly evolving world of development and testing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletters;