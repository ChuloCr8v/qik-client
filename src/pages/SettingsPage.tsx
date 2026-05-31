import { useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import ProfileEditModal from '../components/ProfileEditModal';
import PersonalInfoPanel from '../components/settings/PersonalInfoPanel';
import PlanCard from '../components/settings/PlanCard';
import PreferencesPanel from '../components/settings/PreferencesPanel';
import ProfileSummaryCard from '../components/settings/ProfileSummaryCard';
import QuickActionsPanel from '../components/settings/QuickActionsPanel';

export default function SettingsPage() {
  const [isProfileModalOpen,
    setIsProfileModalOpen] = useState(false);

  const handleProfileSuccess = () => {
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-4 mx-auto max-w-6xl p-4">
      <PageHeader
        title="Account Settings"
        description='Manage your account and billing information'
      />

      <div className="grid gap-3 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-4">
          <ProfileSummaryCard
            onEdit={() => setIsProfileModalOpen(true)}
          />
          <PlanCard />
        </div>

        <div className="space-y-6 lg:col-span-8">
          <div className="grid gap-3">
            <PersonalInfoPanel onEdit={() => setIsProfileModalOpen(true)} />
            <PreferencesPanel />
            <QuickActionsPanel />
          </div>
        </div>
      </div>

      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSuccess={handleProfileSuccess}
      />
    </div>
  );
}
