# Contact Section Setup Guide

## HubSpot CRM Integration

The Contact section includes comprehensive HubSpot CRM integration for lead capture and management.

### Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# HubSpot Configuration
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your-hubspot-portal-id

# HubSpot Form IDs for different contact types
NEXT_PUBLIC_HUBSPOT_FORM_GENERAL=general-contact-form-id
NEXT_PUBLIC_HUBSPOT_FORM_SPEAKING=speaking-engagement-form-id
NEXT_PUBLIC_HUBSPOT_FORM_CORPORATE=corporate-training-form-id
NEXT_PUBLIC_HUBSPOT_FORM_AUTOMATION=automation-services-form-id
NEXT_PUBLIC_HUBSPOT_FORM_AI_BUSINESS=ai-business-training-form-id
NEXT_PUBLIC_HUBSPOT_FORM_AI_DEV=ai-developer-training-form-id
NEXT_PUBLIC_HUBSPOT_FORM_WEB=web-development-form-id
NEXT_PUBLIC_HUBSPOT_FORM_EDU=education-partnership-form-id
NEXT_PUBLIC_HUBSPOT_FORM_NEWSLETTER=newsletter-subscription-form-id

# Google Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Calendly Integration (optional)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username
```

### HubSpot Setup Instructions

1. **Create HubSpot Account**
   - Sign up for a free HubSpot account at hubspot.com
   - Navigate to your HubSpot dashboard

2. **Get Portal ID**
   - Go to Settings → Account Setup → Account Defaults
   - Copy your HubSpot ID (Portal ID)

3. **Create Forms**
   Create separate forms for each contact type:
   - General Contact/Consultation Inquiry
   - Speaking Engagement Request
   - Corporate Training Inquiry
   - Automated Testing Services Quote
   - AI Training for Business Consultation
   - AI Training for Developers Workshop
   - Web Development Project Inquiry
   - Course/Education Partnership
   - Newsletter Subscription

4. **Configure Form Fields**
   For each form, add these custom properties:
   - `lead_score` (Number)
   - `inquiry_type` (Single-line text)
   - `lead_source` (Single-line text)
   - `budget_range` (Dropdown)
   - `project_timeline` (Dropdown)
   - `event_date` (Date picker)
   - `attendee_count` (Dropdown)
   - `speaking_topics` (Multi-line text)
   - `gdpr_consent` (Single checkbox)
   - `marketing_consent` (Single checkbox)

5. **Set Up Workflows**
   Create automated workflows for:
   - Lead scoring based on inquiry type
   - Email autoresponders for each form type
   - Lead assignment and notifications
   - Follow-up sequences

6. **Configure Lead Scoring**
   Set up lead scoring rules:
   - Newsletter subscription: 3 points
   - General contact: 5 points
   - Education partnership: 12 points
   - AI developer training: 15 points
   - Speaking engagement: 15 points
   - Web development: 18 points
   - AI business training: 20 points
   - Corporate training: 20 points
   - Automation services: 25 points

### Features Included

#### Multiple Contact Forms
- **General Contact**: Basic inquiry form
- **Speaking Engagement**: Event details, topics, file upload
- **Corporate Training**: Budget selection, timeline
- **Automation Services**: Technical requirements, budget
- **AI Training**: Business vs developer focus
- **Web Development**: Project scope, timeline
- **Education Partnership**: Collaboration details
- **Newsletter**: Simple subscription

#### Advanced Features
- **Multi-step Forms**: Complex inquiries broken into steps
- **Real-time Validation**: TypeScript-powered form validation
- **File Upload**: For speaker requirements documents
- **Budget Selectors**: Range-based budget selection
- **GDPR Compliance**: Privacy policy consent checkboxes
- **Lead Scoring**: Automatic scoring based on inquiry type
- **Response Time SLA**: Committed response times by inquiry type
- **Availability Status**: Real-time availability indicator
- **Social Media Integration**: Direct links to all platforms

#### HubSpot Integration
- **Automatic Lead Capture**: All form submissions go to HubSpot
- **Lead Source Tracking**: Tracks website contact form source
- **Custom Properties**: Rich data capture for qualification
- **Workflow Triggers**: Automatic email sequences
- **Visitor Tracking**: HubSpot tracking script integration
- **Progressive Profiling**: Enhanced data for returning visitors

#### User Experience
- **Responsive Design**: Mobile-optimized forms
- **Success/Error States**: Clear feedback on submission
- **Loading States**: Visual feedback during submission
- **Form Persistence**: Data preserved during multi-step forms
- **Accessibility**: WCAG compliant form elements

### Contact Information
- **Email**: nadvolod@gmail.com
- **Phone**: (240) 750-0689
- **Location**: Miami, FL
- **Timezone**: Eastern Time (UTC-5)

### Social Media Links
- **LinkedIn**: https://www.linkedin.com/in/nikolayadvolodkin/
- **GitHub**: https://github.com/nadvolod
- **UltimateQA**: https://ultimateqa.com/nikolay-advolodkin
- **Udemy**: https://www.udemy.com/user/nikolaya/
- **YouTube**: https://youtube.com/@nikolayadvolodkin
- **Twitter/X**: https://twitter.com/nikolayadvolod

### Response Time Commitments
- **General Inquiries**: 24 hours
- **Speaking Engagements**: 12 hours
- **Corporate Training**: 6 hours
- **Automation Services**: 4 hours

### Meeting Scheduler
The contact section includes integration points for:
- Calendly booking widget
- HubSpot meetings scheduler
- Custom availability calendar

### Analytics & Tracking
- Google Analytics event tracking for form submissions
- HubSpot visitor behavior tracking
- Conversion tracking by form type
- Lead source attribution

### Security & Privacy
- GDPR compliant data collection
- Privacy policy consent required
- Secure form submission via HTTPS
- Data retention policies
- Marketing consent opt-in

This comprehensive contact system provides multiple touchpoints for different types of inquiries while maintaining professional lead management and follow-up processes. 