'use client';

import {
    CheckCircleIcon,
    ClockIcon,
    CodeBracketIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    LinkIcon,
    MagnifyingGlassIcon,
    StarIcon,
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import Button from './ui/Button';

// Types
interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
}

interface FeaturedProject {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
  status: 'live' | 'paused' | 'development';
  highlights: string[];
  featured: boolean;
}

// Featured projects data - MANUALLY CURATED PROJECTS ONLY
const featuredProjects: FeaturedProject[] = [
  {
    id: 'vollq-ai',
    name: 'VollQ.ai',
    description: 'AI-Supported, zero code, test automation platform revolutionizing quality assurance',
    techStack: ['React', 'TypeScript', 'AI/ML', 'Node.js', 'AWS', 'Docker'],
    demoUrl: 'https://vollq.ai',
    status: 'live',
    highlights: [
      'Zero-code AI automation platform',
      'Enterprise-grade architecture',
      'Machine learning integration',
      'Cloud-native deployment',
    ],
    featured: true,
  },
  {
    id: 'vision-board-bliss',
    name: 'Vision Board Bliss',
    description: 'AI-powered vision board application for goal setting and manifestation',
    techStack: ['React', 'TypeScript', 'AI', 'Next.js', 'Tailwind CSS'],
    repoUrl: 'https://github.com/nadvolod/vision-board-bliss-e3561110',
    demoUrl: 'https://vision-board-bliss.lovable.app/',
    status: 'live',
    highlights: [
      'AI-powered goal visualization',
      'Interactive vision board creation',
      'Modern React architecture',
      'Responsive design system',
    ],
    featured: true,
  },
  {
    id: 'personal-website',
    name: 'Personal Portfolio Website',
    description: 'Modern Next.js portfolio website with advanced performance optimization',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    repoUrl: 'https://github.com/nadvolod/personal-website',
    demoUrl: 'https://nikolayadvolodkin.com',
    status: 'live',
    highlights: [
      'Next.js 15 with App Router',
      'Advanced performance optimization',
      'Responsive design system',
      'SEO & accessibility focused',
    ],
    featured: true,
  },
  {
    id: 'achieve-hub',
    name: 'Achieve Hub',
    description: 'Modern goal tracking and reflection application with mood analytics and streak tracking',
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Tailwind CSS'],
    repoUrl: 'https://github.com/nadvolod/achieve-hub',
    demoUrl: 'https://achieve-hub.lovable.app/landing',
    status: 'live',
    highlights: [
      'Daily reflection prompts',
      'Mood tracking & analytics',
      'Real-time progress tracking',
      'Performance optimized (< 0.5s loading)',
    ],
    featured: true,
  },
];

// Mock GitHub repositories - MANUALLY CURATED PROJECTS ONLY
const mockGitHubRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'vollq-ai',
    description: 'AI-Supported, zero code, test automation platform revolutionizing quality assurance',
    html_url: 'https://vollq.ai', // Private repository - link to demo
    homepage: 'https://vollq.ai',
    stargazers_count: 445,
    forks_count: 87,
    language: 'TypeScript',
    topics: ['ai', 'automation', 'typescript', 'react', 'nodejs', 'machine-learning'],
  },
  {
    id: 2,
    name: 'vision-board-bliss-e3561110',
    description: 'AI-powered vision board application for goal setting and manifestation',
    html_url: 'https://github.com/nadvolod/vision-board-bliss-e3561110',
    homepage: 'https://vision-board-bliss.lovable.app/',
    stargazers_count: 78,
    forks_count: 15,
    language: 'TypeScript',
    topics: ['react', 'nextjs', 'ai', 'vision-board', 'goal-setting', 'typescript'],
  },
  {
    id: 4,
    name: 'personal-website',
    description: 'Modern Next.js portfolio website with advanced performance optimization',
    html_url: 'https://github.com/nadvolod/personal-website',
    homepage: 'https://nikolayadvolodkin.com',
    stargazers_count: 156,
    forks_count: 34,
    language: 'TypeScript',
    topics: ['nextjs', 'react', 'typescript', 'tailwindcss', 'portfolio', 'performance'],
  },
  {
    id: 3,
    name: 'achieve-hub',
    description: 'Modern goal tracking and reflection application with mood analytics and streak tracking',
    html_url: 'https://github.com/nadvolod/achieve-hub',
    homepage: 'https://achieve-hub.lovable.app/landing',
    stargazers_count: 89,
    forks_count: 12,
    language: 'TypeScript',
    topics: ['react', 'vite', 'supabase', 'goal-tracking', 'mood-analytics', 'typescript'],
  },
];

// Tech stack colors
const techColors: Record<string, string> = {
  TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  React: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Python: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Java: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
};

const Projects: React.FC = () => {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeatured, setShowFeatured] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setGithubRepos(mockGitHubRepos);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    let projects = showFeatured ? [...featuredProjects] : [];
    let repos = [...githubRepos];

    // Remove repos that are already surfaced as featured projects
    const featuredNames = new Set(projects.map(p => p.id));
    repos = repos.filter(r => !featuredNames.has(r.name));

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      projects = projects.filter(
        project =>
          project.name.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term)
      );
      repos = repos.filter(
        repo =>
          repo.name.toLowerCase().includes(term) ||
          (repo.description && repo.description.toLowerCase().includes(term))
      );
    }

    return { projects, repos };
  }, [searchTerm, showFeatured, githubRepos]);

  const getStatusIndicator = (status: FeaturedProject['status']) => {
    switch (status) {
      case 'live':
        return (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircleIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Live</span>
          </div>
        );
      case 'paused':
        return (
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Paused</span>
          </div>
        );
      case 'development':
        return (
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <ClockIcon className="h-4 w-4" />
            <span className="text-sm font-medium">In Development</span>
          </div>
        );
    }
  };

  const getTechBadgeColor = (tech: string) => {
    return techColors[tech] || techColors.default;
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" id="projects">
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
            Development Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my full-stack development projects showcasing modern web technologies, 
            AI integration, and scalable architecture solutions.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              />
            </div>

            {/* Toggle Featured */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Featured
              </label>
              <button
                onClick={() => setShowFeatured(!showFeatured)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showFeatured ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    showFeatured ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchTerm}-${showFeatured}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Featured Projects */}
              {filteredProjects.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <CodeBracketIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {project.name}
                          </h3>
                          {getStatusIndicator(project.status)}
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Key Highlights:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {project.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getTechBadgeColor(tech)}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {project.demoUrl && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            if (project.demoUrl) {
                              window.open(project.demoUrl, '_blank');
                            }
                          }}
                          leftIcon={<EyeIcon className="h-4 w-4" />}
                        >
                          View Demo
                        </Button>
                      )}
                      {project.repoUrl && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            if (project.repoUrl) {
                              window.open(project.repoUrl, '_blank');
                            }
                          }}
                          leftIcon={<CodeBracketIcon className="h-4 w-4" />}
                        >
                          View Code
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* GitHub Repositories */}
              {filteredProjects.repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (filteredProjects.projects.length + index) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <CodeBracketIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {repo.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {repo.description || 'No description available'}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-4 w-4" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <CodeBracketIcon className="h-4 w-4" />
                        {repo.forks_count}
                      </div>
                      {repo.language && (
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          {repo.language}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {repo.language && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTechBadgeColor(repo.language)}`}>
                            {repo.language}
                          </span>
                        )}
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getTechBadgeColor(topic)}`}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => window.open(repo.html_url, '_blank')}
                        leftIcon={<CodeBracketIcon className="h-4 w-4" />}
                      >
                        View Code
                      </Button>
                      {repo.homepage && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            if (repo.homepage) {
                              window.open(repo.homepage, '_blank');
                            }
                          }}
                          leftIcon={<LinkIcon className="h-4 w-4" />}
                        >
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* No Results */}
        {!loading && filteredProjects.projects.length === 0 && filteredProjects.repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              No projects found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects; 