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

// Featured projects data
const featuredProjects: FeaturedProject[] = [
  {
    id: 'ultimateqa',
    name: 'UltimateQA',
    description: 'Global developer education platform training 150K+ engineers',
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
    demoUrl: 'https://ultimateqa.com',
    status: 'live',
    highlights: [
      '150,000+ students trained',
      '190 countries reached',
      'Industry-leading curriculum',
      'Corporate training partnerships',
    ],
    featured: true,
  },
  {
    id: 'vollqai',
    name: 'VollQAI',
    description: 'AI-powered testing platform (paused for strategic reasons)',
    techStack: ['TypeScript', 'Next.js', 'OpenAI', 'PostgreSQL', 'Prisma'],
    status: 'paused',
    highlights: [
      'AI test case generation',
      'Natural language to automation',
      '90% test coverage improvement',
      'Intelligent bug detection',
    ],
    featured: true,
  },
  {
    id: 'open-source',
    name: 'Open Source Contributions',
    description: 'NUnit contributor, Simple Sauce creator',
    techStack: ['C#', '.NET', 'Java', 'JavaScript', 'Testing Frameworks'],
    repoUrl: 'https://github.com/nikolayadvolodkin',
    status: 'live',
    highlights: [
      'NUnit framework contributor',
      'Simple Sauce library creator',
      'Multiple testing tools',
      'Community-driven projects',
    ],
    featured: true,
  },
  {
    id: 'testing-frameworks',
    name: 'Testing Frameworks',
    description: 'Custom automation solutions for Fortune 500',
    techStack: ['Selenium', 'Playwright', 'Cypress', 'TestNG', 'Junit'],
    status: 'live',
    highlights: [
      'Fortune 500 implementations',
      'Enterprise-grade solutions',
      'Cross-browser automation',
      'CI/CD integration',
    ],
    featured: true,
  },
];

// Mock GitHub repositories
const mockGitHubRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'selenium-automation-framework',
    description: 'Comprehensive Selenium WebDriver framework with advanced patterns',
    html_url: 'https://github.com/nikolayadvolodkin/selenium-automation-framework',
    homepage: null,
    stargazers_count: 245,
    forks_count: 78,
    language: 'Java',
    topics: ['selenium', 'automation', 'testing', 'java'],
  },
  {
    id: 2,
    name: 'playwright-advanced-patterns',
    description: 'Advanced Playwright testing patterns and best practices',
    html_url: 'https://github.com/nikolayadvolodkin/playwright-advanced-patterns',
    homepage: 'https://playwright-patterns.dev',
    stargazers_count: 189,
    forks_count: 45,
    language: 'TypeScript',
    topics: ['playwright', 'testing', 'typescript', 'automation'],
  },
  {
    id: 3,
    name: 'cypress-course-materials',
    description: 'Complete Cypress testing course with hands-on examples',
    html_url: 'https://github.com/nikolayadvolodkin/cypress-course-materials',
    homepage: null,
    stargazers_count: 156,
    forks_count: 89,
    language: 'JavaScript',
    topics: ['cypress', 'testing', 'javascript', 'course'],
  },
  {
    id: 4,
    name: 'ai-testing-tools',
    description: 'AI-powered testing utilities and prompt engineering for QA',
    html_url: 'https://github.com/nikolayadvolodkin/ai-testing-tools',
    homepage: null,
    stargazers_count: 298,
    forks_count: 67,
    language: 'Python',
    topics: ['ai', 'testing', 'python', 'automation', 'openai'],
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
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [showFeatured, setShowFeatured] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setGithubRepos(mockGitHubRepos);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();

    featuredProjects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });

    githubRepos.forEach(repo => {
      if (repo.language) techSet.add(repo.language);
      repo.topics.forEach(topic => techSet.add(topic));
    });

    return ['All', ...Array.from(techSet).sort()];
  }, [githubRepos]);

  const filteredProjects = useMemo(() => {
    let projects = showFeatured ? [...featuredProjects] : [];
    let repos = [...githubRepos];

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

    if (selectedTech !== 'All') {
      const tech = selectedTech.toLowerCase();
      projects = projects.filter(project =>
        project.techStack.some(t => t.toLowerCase().includes(tech))
      );
      repos = repos.filter(
        repo =>
          (repo.language && repo.language.toLowerCase().includes(tech)) ||
          repo.topics.some(topic => topic.toLowerCase().includes(tech))
      );
    }

    return { projects, repos };
  }, [searchTerm, selectedTech, showFeatured, githubRepos]);

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
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my work in automation, AI, and developer education that has impacted
            thousands of engineers worldwide.
          </p>

          {/* GitHub Activity Graph Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              GitHub Activity
            </h3>
            <div className="h-32 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300">
                GitHub contribution graph integration ready
              </p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
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

            {/* Technology Filter */}
            <div className="flex flex-wrap gap-2">
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTech === tech
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-300'
                  }`}
                >
                  {tech}
                </button>
              ))}
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
              key={`${searchTerm}-${selectedTech}-${showFeatured}`}
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
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <EyeIcon className="h-4 w-4" />
                          View Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                          <CodeBracketIcon className="h-4 w-4" />
                          View Code
                        </a>
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
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        View Code
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          <LinkIcon className="h-4 w-4" />
                          Live Demo
                        </a>
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