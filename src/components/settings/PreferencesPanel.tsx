import { Bell } from 'lucide-react';
import { User } from '../../types';
import { cn } from '../../lib/utils';

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
    <div className="overflow-hidden rounded-3xl border border-border bg-white  ">
      <div className="flex items-center gap-3 border-b border-border bg-slate-50/50 px-6 py-4">
        <Bell className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">Preferences</h3>
      </div>
      <div className="space-y-4 p-6">
        {notificationItems.map(item => {
          const isActive = profile?.notifications?.[item.id] ?? (item.id === 'aiCoach' ? false : true);
          return (
            <div key={item.id} className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-slate-50/50 p-4 text-center transition-all hover:bg-white sm:flex-row sm:text-left">
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-secondary">{item.label}</h4>
                <p className="text-[10px] text-muted">{item.desc}</p>
              </div>
              <button
                onClick={() => onToggle(item.id)}
                className={cn(
                  'relative h-6 w-11 shrink-0 rounded-full transition-all',
                  isActive ? 'bg-primary shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'bg-slate-300'
                )}
              >
                <div className={cn('absolute top-1 h-4 w-4 rounded-full bg-white   transition-all', isActive ? 'right-1' : 'left-1')} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
