import { Button } from 'antd';
import { EditIcon, User as UserIcon } from 'lucide-react';
import { User } from '../../types';
import ContentCard from '../ContentCard';

interface PersonalInfoPanelProps {
  user: User | null;
  profile: User | null;
  onEdit: () => void;
}

export default function PersonalInfoPanel({ user, profile, onEdit }: PersonalInfoPanelProps) {

  const profileData = [
    {
      label: 'Full Name',
      value: profile?.displayName || user?.displayName || 'User'
    },
    {
      label: 'Email Address',
      value: user?.email
    },
    {
      label: 'Job Title',
      value: profile?.jobTitle || 'Not specified'
    },
    {
      label: 'Timezone',
      value: 'Global (UTC)'
    }
  ]

  return (
    <ContentCard
      title={
        <span className="flex items-center gap-3">
          <UserIcon className="h-4 w-4 text-primary" />
          Personal Information
        </span>
      }
      headerRight={<Button icon={<EditIcon className='h-4 w-4' />} iconPosition={"end"} size="small" type={"text"} onClick={onEdit} />}
      bodyClassName="grid gap-4 px-4 pt-2 pb-4 sm:grid-cols-2"
    >
      {profileData.map((item, index) => (
        <div key={index}>
          <InfoButton label={item.label} value={item.value} onClick={onEdit} />
        </div>
      ))}
    </ContentCard>
  );
}

function InfoButton({ label, value, onClick, alignLeft }: { label: string; value: string; onClick: () => void; alignLeft?: boolean }) {
  return (
    <div className="space-y-3">
      <label >{label}</label>
      <button onClick={onClick} className={`border-none! p-0! h-0! group flex w-full items-center justify-between transition-all hover:border-primary/30 hover:bg-white ${alignLeft ? 'text-left' : ''}`}>
        <span className="text-sm font-semibold text-secondary">{value}</span>
      </button>
    </div>
  );
}
