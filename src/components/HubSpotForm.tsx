'use client';

import React, { useEffect, useRef } from 'react';

interface HubSpotFormProps {
  className?: string;
  formTitle?: string;
}

const HubSpotForm: React.FC<HubSpotFormProps> = ({ 
  className = "", 
  formTitle = "Get In Touch" 
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load HubSpot script if not already loaded
    if (!window.hbspt) {
      const script = document.createElement('script');
      script.src = 'https://js-na2.hsforms.net/forms/embed/242896330.js';
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.hbspt && formRef.current) {
          window.hbspt.forms.create({
            region: 'na2',
            portalId: '242896330',
            formId: '6173903b-a567-47e0-87c9-874ea6b6b4d5',
            target: formRef.current
          } as Record<string, unknown>);
        }
      };
    } else {
      // HubSpot script already loaded
      if (formRef.current) {
        window.hbspt.forms.create({
          region: 'na2',
          portalId: '242896330',
          formId: '6173903b-a567-47e0-87c9-874ea6b6b4d5',
          target: formRef.current
        } as Record<string, unknown>);
      }
    }
  }, []);

  return (
    <div className={`hubspot-form-wrapper ${className}`}>
      {formTitle && (
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {formTitle}
        </h3>
      )}
      <div 
        ref={formRef}
        className="hs-form-frame"
        data-region="na2"
        data-form-id="6173903b-a567-47e0-87c9-874ea6b6b4d5"
        data-portal-id="242896330"
      />
    </div>
  );
};



export default HubSpotForm; 