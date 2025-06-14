# Projects Component Documentation

## Overview

The Projects component is a comprehensive showcase of GitHub repositories and featured projects with advanced filtering, search, and interactive features.

## Features

### ✅ Implemented Features

1. **GitHub API Integration**
   - Automatic repository fetching
   - Fallback to mock data for development
   - Error handling and loading states

2. **Featured Projects Showcase**
   - UltimateQA platform
   - VollQAI (AI-powered testing platform)
   - Open Source Contributions
   - Testing Frameworks for Fortune 500

3. **Interactive Filtering**
   - Technology-based filtering (TypeScript, JavaScript, Testing, etc.)
   - Search functionality across project names and descriptions
   - Toggle between featured and all projects

4. **Rich Project Cards**
   - Project descriptions and highlights
   - Technology stack badges
   - GitHub stars and forks count
   - Live demo and repository links
   - Status indicators (Live, Paused, Development)

5. **Responsive Design**
   - Masonry/grid layout
   - Mobile-optimized cards
   - Hover effects and animations
   - Loading states with spinners

6. **GitHub Activity Integration**
   - Placeholder for contribution graph
   - Ready for GitHub GraphQL API integration

## GitHub API Setup

### Development Mode (Default)
The component uses mock data by default in development mode. No setup required.

### Production Mode with Real GitHub API

1. **Get a GitHub Personal Access Token**
   ```bash
   # Go to GitHub Settings > Developer settings > Personal access tokens
   # Create a new token with 'public_repo' scope
   ```

2. **Set Environment Variable**
   ```bash
   # Add to your .env.local file
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

3. **Update Username**
   ```typescript
   // In src/lib/github.ts
   const GITHUB_USERNAME = 'your-github-username';
   ```

### API Usage Examples

```typescript
import { fetchGitHubRepos, getRepositories } from '@/lib/github';

// Fetch repositories with real API
const repos = await fetchGitHubRepos('nikolayadvolodkin', {
  sort: 'updated',
  per_page: 20
});

// Use with fallback to mock data
const repositories = await getRepositories('nikolayadvolodkin', false);
```

## Component Structure

```
src/components/Projects.tsx
├── Featured Projects Data
├── GitHub Repository Interface
├── Technology Filter Logic
├── Search Functionality
├── Project Cards
│   ├── Featured Project Cards
│   └── GitHub Repository Cards
├── Loading States
└── Error Handling

src/lib/github.ts
├── GitHub API Integration
├── Authentication Headers
├── Repository Fetching
├── User Profile Fetching
├── Mock Data for Development
└── Error Handling with Fallbacks
```

## Customization

### Adding New Featured Projects

```typescript
// In src/components/Projects.tsx
const featuredProjects: FeaturedProject[] = [
  {
    id: 'your-project',
    name: 'Your Project Name',
    description: 'Project description',
    techStack: ['React', 'TypeScript'],
    demoUrl: 'https://your-demo.com',
    repoUrl: 'https://github.com/you/project',
    status: 'live',
    highlights: [
      'Key achievement 1',
      'Key achievement 2',
    ],
    featured: true,
  },
  // ... existing projects
];
```

### Customizing Technology Colors

```typescript
// In src/components/Projects.tsx
const techColors: Record<string, string> = {
  YourTech: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  // ... existing colors
};
```

### Adding New Status Types

```typescript
// Update the status type
type ProjectStatus = 'live' | 'paused' | 'development' | 'archived';

// Add new status indicator
const getStatusIndicator = (status: ProjectStatus) => {
  switch (status) {
    case 'archived':
      return (
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <ArchiveIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Archived</span>
        </div>
      );
    // ... existing cases
  }
};
```

## Performance Considerations

1. **API Caching**: GitHub API responses are cached for 1 hour
2. **Mock Data**: Used in development to avoid API rate limits
3. **Lazy Loading**: Projects load after component mount
4. **Error Boundaries**: Graceful fallback to mock data on API errors

## GitHub API Rate Limits

- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour
- **Recommendation**: Use authentication token for production

## Future Enhancements

### Planned Features
- [ ] GitHub contribution graph integration
- [ ] Repository language statistics
- [ ] Commit activity visualization
- [ ] Project deployment status indicators
- [ ] Advanced filtering (by date, language percentage)
- [ ] Project analytics and metrics

### GitHub GraphQL Integration
```typescript
// Future implementation for contribution graph
const GITHUB_GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;
```

## Troubleshooting

### Common Issues

1. **API Rate Limit Exceeded**
   ```
   Solution: Add NEXT_PUBLIC_GITHUB_TOKEN to environment variables
   ```

2. **Projects Not Loading**
   ```
   Check: Network connectivity and GitHub API status
   Fallback: Component automatically uses mock data
   ```

3. **Missing Repository Data**
   ```
   Verify: Repository is public and not forked
   Check: GitHub username is correct in github.ts
   ```

### Debug Mode

```typescript
// Enable debug logging
const DEBUG_MODE = process.env.NODE_ENV === 'development';

if (DEBUG_MODE) {
  console.log('GitHub API Response:', repos);
}
```

## Contributing

When adding new features to the Projects component:

1. Update mock data in `src/lib/github.ts`
2. Add TypeScript interfaces for new data structures
3. Update the component's filtering logic if needed
4. Add appropriate loading and error states
5. Test with both mock and real GitHub API data
6. Update this documentation

## Dependencies

- **Framer Motion**: Animations and transitions
- **Heroicons**: UI icons
- **Tailwind CSS**: Styling and responsive design
- **TypeScript**: Type safety and interfaces

## Browser Support

- Modern browsers with ES2020+ support
- Mobile responsive design
- Dark mode support
- Accessibility features (ARIA labels, keyboard navigation) 