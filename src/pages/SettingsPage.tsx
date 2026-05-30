import {
  useEffect,
  useState
} from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import PricingModal from '../components/PricingModal';
import ProfileEditModal from '../components/ProfileEditModal';
import PersonalInfoPanel from '../components/settings/PersonalInfoPanel';
import PlanCard from '../components/settings/PlanCard';
import PreferencesPanel from '../components/settings/PreferencesPanel';
import ProfileSummaryCard from '../components/settings/ProfileSummaryCard';
import QuickActionsPanel from '../components/settings/QuickActionsPanel';
import {
  User
} from '../types';
import {
  useAuth
} from '../features/auth/AuthProvider';
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation
} from '../features/users/usersApi';
import { usePopup } from '../context/PopupContext';

export default function SettingsPage() {
  const [isProfileModalOpen,
    setIsProfileModalOpen] = useState(false);
  const [profile,
    setProfile] = useState<User | null>(null);
  const { openModal } = usePopup();
  const {
    user,
    signOut
  } = useAuth();
  const {
    data: profileData,
    refetch
  } = useGetCurrentUserQuery(undefined, {
    skip: !user
  });
  const [updateUserProfile] = useUpdateCurrentUserMutation();

  useEffect(() => {
    setProfile(profileData || user);
  }, [profileData, user]);

  const fetchProfile = async () => {
    if (user) await refetch();
  };

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out?')) return;
    signOut();
  };

  const handleToggleNotification = async (key: keyof NonNullable<User['notifications']>) => {
    if (!profile) return;

    const currentNotifications = profile.notifications || {
      email: true,
      reminders: true,
      aiCoach: false
    };
    const newNotifications = {
      ...currentNotifications,
      [key]: !currentNotifications[key]
    };

    try {
      await updateUserProfile({
        notifications: newNotifications
      }).unwrap();
      setProfile(prev => prev ? {
        ...prev, notifications: newNotifications
      } : null);
      toast.success('Preferences updated');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  const handleProfileSuccess = () => {
    fetchProfile();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-4 mx-auto max-w-6xl py-4">
      <PageHeader
        title="Account Settings"
        description='Manage your account and billing information'
      />

      <div className="grid gap-3 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-4">
          <ProfileSummaryCard
            user={user}
            profile={profile}
            onEdit={() => setIsProfileModalOpen(true)}
            onLogout={handleLogout}
          />
          <PlanCard profile={profile} onOpenPricing={() => openModal(<PricingModal />)} />
        </div>

        <div className="space-y-6 lg:col-span-8">
          <div className="grid gap-3">
            <PersonalInfoPanel user={user} profile={profile} onEdit={() => setIsProfileModalOpen(true)} />
            <PreferencesPanel profile={profile} onToggle={handleToggleNotification} />
            <QuickActionsPanel />
          </div>
        </div>
      </div>

      {user && (
        <ProfileEditModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          user={user}
          onSuccess={handleProfileSuccess}
        />
      )}
    </div>
  );
}
