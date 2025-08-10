// ✅ FILE: src/pages/client-dashboard/ClientDashboard.jsx
import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import ProjectOverview from './ProjectOverview';
import PaymentSummary from './PaymentSummary';
import ActionButtons from './ActionButtons';
import ActivityLog from './ActivityLog';

const ClientDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <WelcomeBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProjectOverview />
        <PaymentSummary />
      </div>
      {/* <ActionButtons /> */}
      <ActivityLog />
    </div>
  );
};

export default ClientDashboard;
