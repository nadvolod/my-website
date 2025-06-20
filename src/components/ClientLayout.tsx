'use client';

import React, { useState } from 'react';
import FloatingActionButton from './FloatingActionButton';
import HubSpotModal from './HubSpotModal';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {children}
      <FloatingActionButton onContactClick={handleContactClick} />
      <HubSpotModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Quick Contact"
        subtitle="Have a question or want to discuss a project? Let's connect!"
      />
    </>
  );
};

export default ClientLayout; 