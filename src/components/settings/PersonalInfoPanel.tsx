import { Edit2, Globe, Lock, User as UserIcon } from 'lucide-react';
import { User } from '../../types';

interface PersonalInfoPanelProps {
  user: User | null;
  profile: User | null;
  onEdit: () => void;
}

export default function PersonalInfoPanel({ user, profile, onEdit }: PersonalInfoPanelProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white  ">
      <div className="flex items-center gap-3 border-b border-border bg-slate-50/50 px-6 py-4">
        <UserIcon className="h-4 w-4 text-primary" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary">Personal Information</h3>
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <InfoButton label="Full Name" value={profile?.displayName || user?.displayName || 'User'} onClick={onEdit} />
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-widest text-muted">Email Address</label>
          <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50/30 px-4 py-2.5 opacity-60">
            <span className="text-[11px] font-semibold text-secondary">{user?.email}</span>
            <Lock className="h-3 w-3 text-muted" />
          </div>
        </div>
        <InfoButton label="Job Title" value={profile?.jobTitle || 'Not specified'} onClick={onEdit} alignLeft />
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold uppercase tracking-widest text-muted">Timezone</label>
          <div className="group flex items-center justify-between rounded-xl border border-border bg-slate-50/30 px-4 py-2.5 transition-all hover:bg-white">
            <span className="text-[11px] font-semibold text-secondary">Global (UTC)</span>
            <Globe className="h-3 w-3 text-muted group-hover:text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoButton({ label, value, onClick, alignLeft }: { label: string; value: string; onClick: () => void; alignLeft?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-bold uppercase tracking-widest text-muted">{label}</label>
      <button onClick={onClick} className={`group flex w-full items-center justify-between rounded-xl border border-border bg-slate-50/30 px-4 py-2.5 transition-all hover:border-primary/30 hover:bg-white ${alignLeft ? 'text-left' : ''}`}>
        <span className="text-[11px] font-semibold text-secondary">{value}</span>
        <Edit2 className="h-3 w-3 text-muted group-hover:text-primary" />
      </button>
    </div>
  );
}
