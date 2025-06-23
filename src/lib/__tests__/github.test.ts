import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  fetchGitHubRepos, 
  fetchGitHubUser, 
  fetchRepoLanguages, 
  getRepositories, 
  mockGitHubData 
} from '../github';

// Mock fetch
global.fetch = vi.fn();

describe('GitHub API Utilities', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock process.env
    vi.stubGlobal('process', {
      ...process,
      env: {
        ...process.env,
        NEXT_PUBLIC_GITHUB_TOKEN: 'mock-token',
        NODE_ENV: 'production'
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('fetchGitHubRepos', () => {
    it('should fetch repositories with default parameters', async () => {
      // Mock successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: 'test-repo',
            full_name: 'username/test-repo',
            fork: false,
            private: false
          }
        ]
      });

      const repos = await fetchGitHubRepos('username');

      expect(repos).toHaveLength(1);
      expect(repos[0].name).toBe('test-repo');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/users/username/repos?sort=updated&direction=desc&per_page=30&page=1&type=owner',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Personal-Website-App',
          })
        })
      );
    });

    it('should filter out forks and private repos', async () => {
      // Mock response with mixed repos
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 1, name: 'public-repo', fork: false, private: false },
          { id: 2, name: 'forked-repo', fork: true, private: false },
          { id: 3, name: 'private-repo', fork: false, private: true }
        ]
      });

      const repos = await fetchGitHubRepos('username');

      expect(repos).toHaveLength(1);
      expect(repos[0].name).toBe('public-repo');
    });

    it('should handle API errors', async () => {
      // Mock error response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(fetchGitHubRepos('username')).rejects.toThrow('GitHub API error: 404 Not Found');
    });
  });

  describe('fetchGitHubUser', () => {
    it('should fetch user profile', async () => {
      // Mock successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          login: 'username',
          id: 123,
          name: 'User Name',
          public_repos: 10
        })
      });

      const user = await fetchGitHubUser('username');

      expect(user.login).toBe('username');
      expect(user.name).toBe('User Name');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/users/username',
        expect.objectContaining({
          headers: expect.any(Object)
        })
      );
    });

    it('should handle API errors', async () => {
      // Mock error response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(fetchGitHubUser('username')).rejects.toThrow('GitHub API error: 404 Not Found');
    });
  });

  describe('fetchRepoLanguages', () => {
    it('should fetch repository languages', async () => {
      // Mock successful response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          JavaScript: 10000,
          TypeScript: 5000,
          CSS: 2000
        })
      });

      const languages = await fetchRepoLanguages('username', 'repo-name');

      expect(languages).toEqual({
        JavaScript: 10000,
        TypeScript: 5000,
        CSS: 2000
      });
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/username/repo-name/languages',
        expect.objectContaining({
          headers: expect.any(Object)
        })
      );
    });

    it('should return empty object on error', async () => {
      // Mock error response
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const languages = await fetchRepoLanguages('username', 'repo-name');

      expect(languages).toEqual({});
    });
  });

  describe('getRepositories', () => {
    it('should return real repositories in production', async () => {
      // Mock successful API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [
          { id: 1, name: 'real-repo', fork: false, private: false }
        ]
      });

      const repos = await getRepositories('username', false);

      expect(repos).toHaveLength(1);
      expect(repos[0].name).toBe('real-repo');
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should return mock data when useMockData is true', async () => {
      const repos = await getRepositories('username', true);

      expect(repos).toBe(mockGitHubData.repos);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should return mock data on API error', async () => {
      // Mock API error
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      const repos = await getRepositories('username', false);

      expect(repos).toBe(mockGitHubData.repos);
    });

    it('should return mock data in development environment', async () => {
      // Set NODE_ENV to development
      vi.stubGlobal('process', {
        ...process,
        env: {
          ...process.env,
          NODE_ENV: 'development'
        }
      });

      const repos = await getRepositories('username', false);

      expect(repos).toBe(mockGitHubData.repos);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});