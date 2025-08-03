// Configuration file for all website statistics and numbers
// Non-technical users can easily update these values

export const WEBSITE_STATS = {
  // Student and Training Statistics - Updated with verified numbers
  studentsTraught: "150,000+",
  countriesReached: "190",
  yearsExperience: "15+", // Updated from 16+ to match the verified "15+ years"
  
  // Udemy Statistics - Updated with current focus
  udemyStudents: "100,000+", // Updated from verified source
  udemyCourses: "15+", // Updated count
  udemyRating: "4.5+", // Updated rating
  udemyReviews: "12,000+", // Updated review count
  
  // UltimateQA Statistics
  ultimateQAUsers: "150,000+",
  ultimateQACountries: "190",
  
  // Speaking and Content - Updated with verified conference data
  conferenceTalks: "50+",
  workshopsDelivered: "100+",
  blogPosts: "200+",
  recentConferences: "9", // 2023-2024 conferences from verified list
  
  // Business Impact
  testingTimeReduction: "80%",
  clientSatisfactionRate: "98%",
  projectsCompleted: "200+",
  corporateClientsHelped: "100+", // New stat from verified info
  
  // Social Media and Reach
  linkedInFollowers: "25,000+",
  youTubeSubscribers: "15,000+",
  newsletterSubscribers: "10,000+",
  
  // Company Information
  companyFounded: "2013",
  teamSize: "15+",
  
  // Recognition - Added from verified bio
  recognitionAwards: "4", // Contributing author, Top instructor, etc.
  
  // Response Times (in hours)
  generalInquiryResponse: "24",
  speakingEngagementResponse: "12", 
  corporateTrainingResponse: "6",
  automationServicesResponse: "4"
} as const;

// Easy-to-update contact information - Updated with Miami location
export const CONTACT_INFO = {
  email: "nikolay@ultimateqa.com",
  location: "Miami, FL", // Verified location
  timezone: "Eastern Time (UTC-5)",
  phone: "+1 (555) 123-4567", // Add if needed
  calendlyUrl: "https://calendly.com/nikolay-advolodkin", // Add actual URL
  hubspotPortalId: "YOUR_PORTAL_ID" // Replace with actual HubSpot Portal ID
} as const;

// Social media links - Updated GitHub username
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nikolayadvolodkin/",
  github: "https://github.com/nadvolod", // Updated to match verified username
  twitter: "https://twitter.com/nikolayadvolod",
  instagram: "https://www.instagram.com/nikolay.advolodkin/",
  tiktok: "https://www.tiktok.com/@nikolay.advolodkin/",
  youtube: "https://www.youtube.com/@nikolayadvolodkin", // Fixed: added www.
  udemy: "https://www.udemy.com/user/nikolaya/",
  ultimateqa: "https://ultimateqa.com/nikolay-advolodkin-3/"
} as const;

// ===== ALL EXTERNAL LINKS - EASY TO UPDATE =====
// Non-technical users can easily update these URLs

// Conference and Speaking Links
export const CONFERENCE_LINKS = {
  allThingsOpen: "https://allthingsopen.org/",
  browserConference: "https://browserconference.com/", // Fixed: removed conf, added conference
  stareast: "https://starwest.techwell.com/", // Fixed: StarWest is the current active conference
  infoshare: "https://infoshare.pl/",
  apiWorld: "https://apiworld.co/",
  seleniumConf: "https://seleniumconf.com/", // Fixed: removed .us
  developerWeek: "https://developerweek.com/",
  testingStage: "https://qahitech.com/", // Fixed: redirect to actual organizer site
  // Note: Some conference URLs may change year to year
  // Update these annually or as conferences move
} as const;

// GitHub Repository Links
export const GITHUB_LINKS = {
  mainProfile: "https://github.com/nadvolod",
  // PRIORITY: Development Skills Projects
  achieveHub: "https://github.com/nadvolod/achieve-hub", // ✅ Goal tracking and reflection app
  jsCodeExamples: "https://github.com/nadvolod/js-code", // ✅ JavaScript development examples
  // HIDDEN: Testing-focused repositories (available but not featured)
  ultimateQAJavaSDET: "https://github.com/ultimate-qa/java-sdet", // Testing course
  simpleSauce: "https://github.com/nadvolod/simple-sauce", // Testing library
  playwrightExamples: "https://github.com/nadvolod/playwright-examples", // Testing examples
  cypressExamples: "https://github.com/nadvolod/cypress-examples", // Testing examples
  testingBestPractices: "https://github.com/nadvolod/testing-best-practices", // Testing guidelines
  aiTestingWorkshop: "https://github.com/nadvolod/ai-testing-workshop", // Testing workshop
} as const;

// Education and Course Links
export const EDUCATION_LINKS = {
  // Udemy Profile and Courses
  udemyProfile: "https://www.udemy.com/user/nikolaya/", // ✅ VERIFIED
  seleniumJavaCourse: "https://www.udemy.com/course/selenium-webdriver-java-testng-framework/", // ✅ VERIFIED
  
  // UltimateQA Links
  ultimateQAMain: "https://ultimateqa.com/", // ✅ VERIFIED
  nikolayProfilePage: "https://ultimateqa.com/nikolay-advolodkin-3/", // ✅ VERIFIED
  javaSdetBootcamp: "https://ultimateqa.com/complete-java-automation-engineer-bootcamp/", // May need verification
  
  // Course landing pages - update these if URLs change
  aiTestingCourse: "https://www.udemy.com/user/nikolaya/", // Link to profile for now
  modernWebTestingCourse: "https://www.udemy.com/user/nikolaya/", // Link to profile for now
} as const;

// Business and Services Links
export const BUSINESS_LINKS = {
  ultimateQAMain: "https://ultimateqa.com/",
  caseStudies: "https://ultimateqa.com/case-studies/", // If exists
  automationServices: "https://ultimateqa.com/automation-services/", // If exists
  corporateTraining: "https://ultimateqa.com/corporate-training/", // If exists
} as const;

// Video and Content Links
export const CONTENT_LINKS = {
  youtubeChannel: "https://www.youtube.com/@nikolayadvolodkin", // Fixed: added www.
  automationExperience: "https://saucelabs.com/resources/topic-hub/test-automation-experience", // ✅ VERIFIED
  // Add podcast or video series links here
} as const;

// Demo and Live Application Links
export const DEMO_LINKS = {
  achieveHub: "https://achieve-hub.lovable.app/landing", // ✅ VERIFIED - Goal tracking app
  ultimateQA: "https://ultimateqa.com", // ✅ VERIFIED - Education platform
} as const;

// ===== LINK COLLECTIONS FOR TESTING =====
// These collect all links for easy testing

// All external links that should return 200 status
export const ALL_EXTERNAL_LINKS = {
  ...SOCIAL_LINKS,
  ...CONFERENCE_LINKS,
  ...GITHUB_LINKS,
  ...EDUCATION_LINKS,
  ...BUSINESS_LINKS,
  ...CONTENT_LINKS,
  ...DEMO_LINKS,
} as const;

// Critical links that MUST work for business operations
export const CRITICAL_LINKS = {
  ultimateQAMain: EDUCATION_LINKS.ultimateQAMain,
  linkedinProfile: SOCIAL_LINKS.linkedin,
  githubProfile: GITHUB_LINKS.mainProfile,
  nikolayProfilePage: EDUCATION_LINKS.nikolayProfilePage,
  achieveHub: DEMO_LINKS.achieveHub,
  // Note: Removed udemyProfile due to 403 responses (likely rate limiting)
} as const;

// Links that may need updates (repositories that might not exist yet)
export const LINKS_NEED_VERIFICATION = {
  // HIDDEN: Testing repositories
  simpleSauce: GITHUB_LINKS.simpleSauce,
  playwrightExamples: GITHUB_LINKS.playwrightExamples,
  cypressExamples: GITHUB_LINKS.cypressExamples,
  testingBestPractices: GITHUB_LINKS.testingBestPractices,
  aiTestingWorkshop: GITHUB_LINKS.aiTestingWorkshop,
  javaSdetBootcamp: EDUCATION_LINKS.javaSdetBootcamp,
  // Add conference links that may change
  browserConference: CONFERENCE_LINKS.browserConference,
  testingStage: CONFERENCE_LINKS.testingStage,
} as const;

// Company and achievement data - Updated with verified achievements
export const ACHIEVEMENTS = [
  {
    title: "Students Trained Globally",
    value: WEBSITE_STATS.studentsTraught,
    description: "Developers across 190 countries",
    icon: "👨‍🎓"
  },
  {
    title: "Years of Experience", 
    value: WEBSITE_STATS.yearsExperience,
    description: "Leading and creating test automation experts",
    icon: "⚡"
  },
  {
    title: "Conference Talks",
    value: WEBSITE_STATS.conferenceTalks,
    description: "International speaking engagements",
    icon: "🎤"
  },
  {
    title: "Corporate Clients Helped",
    value: WEBSITE_STATS.corporateClientsHelped,
    description: "Companies transformed their automation",
    icon: "🏢"
  }
] as const;

// Professional recognition - New section with verified achievements
export const PROFESSIONAL_RECOGNITION = [
  {
    title: "Contributing Author",
    description: "Continuous Testing for DevOps Professionals",
    year: "2023",
    icon: "📚"
  },
  {
    title: "Top 33 Test Automation Leaders",
    description: "Named by TechBeacon.com",
    year: "2023",
    icon: "🏆"
  },
  {
    title: "Top Selenium WebDriver Instructor",
    description: "Globally according to Udemy.com",
    year: "2023",
    icon: "🥇"
  },
  {
    title: "Top 30 Automation Engineer",
    description: "Voted worldwide multiple years running",
    year: "2023",
    icon: "⭐"
  }
] as const; 