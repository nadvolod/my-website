// GitHub API integration utility
// To use with real GitHub API, set NEXT_PUBLIC_GITHUB_TOKEN in your environment variables

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  private: boolean;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'nikolayadvolodkin'; // Replace with actual GitHub username

// GitHub API headers with optional authentication
const getHeaders = () => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Personal-Website-App',
  };

  // Add authentication if token is available
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
  }

  return headers;
};

/**
 * Fetch user repositories from GitHub API
 * @param username - GitHub username
 * @param options - Additional options for the API call
 * @returns Promise<GitHubRepo[]>
 */
export async function fetchGitHubRepos(
  username: string = GITHUB_USERNAME,
  options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
    type?: 'all' | 'owner' | 'member';
  } = {}
): Promise<GitHubRepo[]> {
  const {
    sort = 'updated',
    direction = 'desc',
    per_page = 30,
    page = 1,
    type = 'owner'
  } = options;

  const params = new URLSearchParams({
    sort,
    direction,
    per_page: per_page.toString(),
    page: page.toString(),
    type,
  });

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?${params}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and private repos for public display
    return repos.filter(repo => !repo.fork && !repo.private);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
}

/**
 * Fetch user profile from GitHub API
 * @param username - GitHub username
 * @returns Promise<GitHubUser>
 */
export async function fetchGitHubUser(
  username: string = GITHUB_USERNAME
): Promise<GitHubUser> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
}

/**
 * Fetch repository languages from GitHub API
 * @param username - GitHub username
 * @param repoName - Repository name
 * @returns Promise<Record<string, number>>
 */
export async function fetchRepoLanguages(
  username: string,
  repoName: string
): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}/languages`,
      {
        headers: getHeaders(),
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching repository languages:', error);
    return {};
  }
}

/**
 * Get GitHub contribution activity (requires authentication)
 * Note: This endpoint requires authentication and may not be available for public use
 * @param username - GitHub username
 * @returns Promise<any>
 */
export async function fetchGitHubContributions(
  _username: string = GITHUB_USERNAME
): Promise<null> {
  // This would require a more complex setup with GitHub GraphQL API
  // For now, return a placeholder
  console.warn('GitHub contributions API requires GraphQL and authentication');
  return null;
}

/**
 * Mock data for development/fallback
 */
export const mockGitHubData = {
  repos: [
    {
      id: 1,
      name: 'selenium-automation-framework',
      full_name: 'nikolayadvolodkin/selenium-automation-framework',
      description: 'Comprehensive Selenium WebDriver framework with advanced patterns',
      html_url: 'https://github.com/nikolayadvolodkin/selenium-automation-framework',
      homepage: null,
      stargazers_count: 245,
      forks_count: 78,
      language: 'Java',
      topics: ['selenium', 'automation', 'testing', 'java'],
      created_at: '2023-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
      pushed_at: '2024-01-10T00:00:00Z',
      private: false,
      fork: false,
    },
    {
      id: 2,
      name: 'playwright-advanced-patterns',
      full_name: 'nikolayadvolodkin/playwright-advanced-patterns',
      description: 'Advanced Playwright testing patterns and best practices',
      html_url: 'https://github.com/nikolayadvolodkin/playwright-advanced-patterns',
      homepage: 'https://playwright-patterns.dev',
      stargazers_count: 189,
      forks_count: 45,
      language: 'TypeScript',
      topics: ['playwright', 'testing', 'typescript', 'automation'],
      created_at: '2023-06-20T00:00:00Z',
      updated_at: '2024-01-12T00:00:00Z',
      pushed_at: '2024-01-08T00:00:00Z',
      private: false,
      fork: false,
    },
    {
      id: 3,
      name: 'cypress-course-materials',
      full_name: 'nikolayadvolodkin/cypress-course-materials',
      description: 'Complete Cypress testing course with hands-on examples',
      html_url: 'https://github.com/nikolayadvolodkin/cypress-course-materials',
      homepage: null,
      stargazers_count: 156,
      forks_count: 89,
      language: 'JavaScript',
      topics: ['cypress', 'testing', 'javascript', 'course'],
      created_at: '2022-11-10T00:00:00Z',
      updated_at: '2023-12-20T00:00:00Z',
      pushed_at: '2023-12-15T00:00:00Z',
      private: false,
      fork: false,
    },
    {
      id: 4,
      name: 'ai-testing-tools',
      full_name: 'nikolayadvolodkin/ai-testing-tools',
      description: 'AI-powered testing utilities and prompt engineering for QA',
      html_url: 'https://github.com/nikolayadvolodkin/ai-testing-tools',
      homepage: null,
      stargazers_count: 298,
      forks_count: 67,
      language: 'Python',
      topics: ['ai', 'testing', 'python', 'automation', 'openai'],
      created_at: '2023-09-05T00:00:00Z',
      updated_at: '2024-01-14T00:00:00Z',
      pushed_at: '2024-01-12T00:00:00Z',
      private: false,
      fork: false,
    },
    {
      id: 5,
      name: 'simple-sauce',
      full_name: 'nikolayadvolodkin/simple-sauce',
      description: 'Simplified Sauce Labs integration library for test automation',
      html_url: 'https://github.com/nikolayadvolodkin/simple-sauce',
      homepage: 'https://www.npmjs.com/package/simple-sauce',
      stargazers_count: 87,
      forks_count: 23,
      language: 'JavaScript',
      topics: ['sauce-labs', 'testing', 'automation', 'javascript', 'npm'],
      created_at: '2021-03-10T00:00:00Z',
      updated_at: '2023-11-15T00:00:00Z',
      pushed_at: '2023-11-10T00:00:00Z',
      private: false,
      fork: false,
    },
    {
      id: 6,
      name: 'nunit-contributions',
      full_name: 'nikolayadvolodkin/nunit-contributions',
      description: 'Contributions and extensions to the NUnit testing framework',
      html_url: 'https://github.com/nikolayadvolodkin/nunit-contributions',
      homepage: 'https://nunit.org',
      stargazers_count: 134,
      forks_count: 41,
      language: 'C#',
      topics: ['nunit', 'testing', 'csharp', 'dotnet', 'unit-testing'],
      created_at: '2020-08-20T00:00:00Z',
      updated_at: '2023-10-25T00:00:00Z',
      pushed_at: '2023-10-20T00:00:00Z',
      private: false,
      fork: false,
    },
  ],
  user: {
    login: 'nikolayadvolodkin',
    id: 12345,
    avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
    html_url: 'https://github.com/nikolayadvolodkin',
    name: 'Nikolay Advolodkin',
    company: 'UltimateQA',
    blog: 'https://ultimateqa.com',
    location: 'Miami, FL',
    bio: 'Developer Advocate & Automation Expert | Trained 150K+ developers across 190 countries',
    public_repos: 25,
    followers: 1250,
    following: 180,
  },
};

/**
 * Utility function to get repositories with fallback to mock data
 * @param username - GitHub username
 * @param useMockData - Force use of mock data for development
 * @returns Promise<GitHubRepo[]>
 */
export async function getRepositories(
  username: string = GITHUB_USERNAME,
  useMockData: boolean = false
): Promise<GitHubRepo[]> {
  if (useMockData || process.env.NODE_ENV === 'development') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return mockGitHubData.repos;
  }

  try {
    return await fetchGitHubRepos(username);
  } catch (error) {
    console.warn('Falling back to mock data due to API error:', error);
    return mockGitHubData.repos;
  }
} 