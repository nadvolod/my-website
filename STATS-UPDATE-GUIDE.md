# Website Statistics Update Guide

This guide explains how to easily update all the numbers and statistics on your website without any technical knowledge.

## 📍 Where to Make Changes

All website numbers are stored in one file: `src/config/stats.ts`

## 🔢 Numbers You Can Update

### Student and Training Statistics
- `studentsTraught`: Total students you've trained (currently "150,000+")
- `countriesReached`: Number of countries reached (currently "190")
- `yearsExperience`: Years of experience (currently "16+")

### Udemy Statistics
- `udemyStudents`: Number of Udemy students (currently "75,000+")
- `udemyCourses`: Number of courses created (currently "12")
- `udemyRating`: Average rating (currently "4.6")
- `udemyReviews`: Number of reviews (currently "8,500+")

### Business Impact
- `testingTimeReduction`: Percentage improvement (currently "80%")
- `clientSatisfactionRate`: Client satisfaction (currently "98%")
- `projectsCompleted`: Projects completed (currently "200+")

### Speaking and Content
- `conferenceTalks`: Number of talks given (currently "50+")
- `workshopsDelivered`: Workshops delivered (currently "100+")
- `blogPosts`: Blog posts written (currently "200+")

### Social Media
- `linkedInFollowers`: LinkedIn followers (currently "25,000+")
- `youTubeSubscribers`: YouTube subscribers (currently "15,000+")
- `newsletterSubscribers`: Newsletter subscribers (currently "10,000+")

## 📝 How to Update

1. Open the file `src/config/stats.ts`
2. Find the number you want to change
3. Update the value between the quotes
4. Save the file

### Example:
To change students taught from "150,000+" to "200,000+":

**Before:**
```
studentsTraught: "150,000+",
```

**After:**
```
studentsTraught: "200,000+",
```

## 🔗 Contact Information

You can also update contact information in the same file:
- Email address
- Location
- Phone number
- Social media links

## ⚠️ Important Notes

- Always keep the quotes around the numbers
- Don't remove the comma at the end of each line
- The changes will automatically appear throughout the website
- If you make a mistake, you can always undo your changes

## 🆘 Need Help?

If you need assistance updating these numbers, contact your web developer or create a backup of the file before making changes. 