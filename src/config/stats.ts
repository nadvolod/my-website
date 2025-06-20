// Configuration file for all website statistics and numbers
// Non-technical users can easily update these values

export const WEBSITE_STATS = {
  // Student and Training Statistics
  studentsTraught: "150,000+",
  countriesReached: "190",
  yearsExperience: "16+",
  
  // Udemy Statistics
  udemyStudents: "75,000+",
  udemyCourses: "12",
  udemyRating: "4.6",
  udemyReviews: "8,500+",
  
  // UltimateQA Statistics
  ultimateQAUsers: "150,000+",
  ultimateQACountries: "190",
  
  // Speaking and Content
  conferenceTalks: "50+",
  workshopsDelivered: "100+",
  blogPosts: "200+",
  
  // Business Impact
  testingTimeReduction: "80%",
  clientSatisfactionRate: "98%",
  projectsCompleted: "200+",
  
  // Social Media and Reach
  linkedInFollowers: "25,000+",
  youTubeSubscribers: "15,000+",
  newsletterSubscribers: "10,000+",
  
  // Company Information
  companyFounded: "2013",
  teamSize: "15+",
  
  // Response Times (in hours)
  generalInquiryResponse: "24",
  speakingEngagementResponse: "12", 
  corporateTrainingResponse: "6",
  automationServicesResponse: "4"
} as const;

// Easy-to-update contact information
export const CONTACT_INFO = {
  email: "nikolay@ultimateqa.com",
  location: "Miami, FL",
  timezone: "Eastern Time (UTC-5)",
  phone: "+1 (555) 123-4567", // Add if needed
  calendlyUrl: "https://calendly.com/nikolay-advolodkin", // Add actual URL
  hubspotPortalId: "YOUR_PORTAL_ID" // Replace with actual HubSpot Portal ID
} as const;

// Social media links - easy to update
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nikolayadvolodkin/",
  github: "https://github.com/nadvolod",
  twitter: "https://twitter.com/nikolayadvolod",
  instagram: "https://www.instagram.com/nikolay.advolodkin/",
  tiktok: "https://www.tiktok.com/@nikolay.advolodkin/",
  youtube: "https://youtube.com/@nikolayadvolodkin",
  udemy: "https://www.udemy.com/user/nikolaya/",
  ultimateqa: "https://ultimateqa.com/nikolay-advolodkin-3/"
} as const;

// Company and achievement data
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
    description: "In test automation and development",
    icon: "⚡"
  },
  {
    title: "Conference Talks",
    value: WEBSITE_STATS.conferenceTalks,
    description: "International speaking engagements",
    icon: "🎤"
  },
  {
    title: "Testing Time Reduced",
    value: WEBSITE_STATS.testingTimeReduction,
    description: "Average improvement for clients",
    icon: "��"
  }
] as const; 