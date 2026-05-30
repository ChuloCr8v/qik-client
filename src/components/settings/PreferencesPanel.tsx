import { Bell } from 'lucide-react';
import { Switch } from 'antd';
import { User } from '../../types';
import ContentCard from '../ContentCard';

const notificationItems = [
  { id: 'email' as const, label: 'Email Notifications', desc: 'Receive agenda updates via email.' },
  { id: 'reminders' as const, label: 'Meeting Reminders', desc: 'Alert before meeting starts.' },
  { id: 'aiCoach' as const, label: 'AI Coach Feedback', desc: 'Get automated feedback on your agendas.' }
];

interface PreferencesPanelProps {
  profile: User | null;
  onToggle: (key: keyof NonNullable<User['notifications']>) => void;
}

export default function PreferencesPanel({ profile, onToggle }: PreferencesPanelProps) {
  return (
    <ContentCard
      title={
        <span className="flex items-center gap-3">
          <Bell className="h-4 w-4 text-primary" />
          Preferences
        </span>
      }
      bodyClassName="space-y-3 p-4"
    >
      {notificationItems.map(item => {
        const isActive = profile?.notifications?.[item.id] ?? (item.id === 'aiCoach' ? false : true);
        return (
          <div key={item.id} className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-slate-50/50 p-4 py-3 text-center transition-all hover:bg-white sm:flex-row sm:text-left">
            <div className="space-y-0.5">
              <h4 className="font-semibold text-secondary">{item.label}</h4>
              <p className="text-xs text-muted">{item.desc}</p>
            </div>
            <Switch
              checked={isActive}
              onChange={() => onToggle(item.id)}
              className="shrink-0"
            />
          </div>
        );
      })}
    </ContentCard>
  );
}
