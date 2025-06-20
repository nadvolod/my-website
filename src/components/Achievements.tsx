"use client";
import { ACHIEVEMENTS } from "@/config/stats";
import { motion } from "framer-motion";
import { useState } from "react";
import HubSpotModal from './HubSpotModal';

const Achievements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Proven Track Record
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Over a decade of experience helping organizations and developers achieve automation excellence
            </p>
          </motion.div>

          {/* Achievement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700"
              >
                {/* Icon */}
                <div className="text-4xl mb-4 text-center">
                  {achievement.icon}
                </div>
                
                {/* Value */}
                <div className="text-center mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {achievement.value}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-neutral-600 dark:text-neutral-300 mb-6">
              Ready to achieve similar results for your organization?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* HubSpot Modal */}
      <HubSpotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get Started Today"
        subtitle="Ready to achieve automation excellence? Let's discuss how I can help your organization reach similar results."
      />
    </>
  );
};

export default Achievements; 