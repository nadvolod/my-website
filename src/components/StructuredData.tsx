
const StructuredData = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nikolay Advolodkin",
    "jobTitle": "Developer Advocate & Automation Expert",
    "description": "Leading automation expert with 16+ years experience. Training 150,000+ developers across 190 countries in test automation, AI, and modern development practices.",
    "url": "https://nikolayadvolodkin.com",
    "image": "https://nikolayadvolodkin.com/profile-image.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/nikolayadvolodkin/",
      "https://github.com/nadvolod",
      "https://twitter.com/nikolayadvolod",
      "https://www.udemy.com/user/nikolaya/",
      "https://youtube.com/@nikolayadvolodkin",
      "https://ultimateqa.com/nikolay-advolodkin"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Independent Consultant"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Sauce Labs"
    },
    "knowsAbout": [
      "Test Automation",
      "Selenium WebDriver",
      "Playwright",
      "JavaScript Testing",
      "TypeScript",
      "AI in Testing",
      "CI/CD",
      "Quality Assurance",
      "Software Testing",
      "Developer Advocacy"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Developer Advocate",
      "occupationLocation": {
        "@type": "Place",
        "name": "Miami, FL"
      }
    }
  };

  const educatorSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "UltimateQA",
    "url": "https://ultimateqa.com",
    "founder": {
      "@type": "Person",
      "name": "Nikolay Advolodkin"
    },
    "description": "Leading test automation education platform",
    "courseMode": "online",
    "educationalCredentialAwarded": "Certificate"
  };

  const speakerSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nikolay Advolodkin",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Professional Speaker"
    },
    "performerIn": [
      {
        "@type": "Event",
        "name": "International Software Testing Conferences",
        "description": "Speaking at 100+ events worldwide on test automation and AI"
      }
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Test Automation Courses",
    "description": "Comprehensive test automation training covering Selenium, Playwright, JavaScript, and TypeScript",
    "provider": {
      "@type": "Person",
      "name": "Nikolay Advolodkin"
    },
    "courseMode": "online",
    "educationalLevel": "Beginner to Advanced",
    "teaches": [
      "Selenium WebDriver",
      "Playwright",
      "JavaScript Testing",
      "TypeScript for QA",
      "CI/CD for Testing"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Nikolay Advolodkin Consulting",
    "description": "Professional test automation consulting and training services",
    "founder": {
      "@type": "Person",
      "name": "Nikolay Advolodkin"
    },
    "serviceType": [
      "Test Automation Consulting",
      "AI Training for Business",
      "Corporate Training",
      "Speaking Engagements",
      "Web Development"
    ],
    "areaServed": "Worldwide",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Miami",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-240-750-0689",
      "email": "nadvolod@gmail.com",
      "contactType": "customer service"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educatorSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakerSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
    </>
  );
};

export default StructuredData; 