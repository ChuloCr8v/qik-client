import { Briefcase, Camera, LogOut } from 'lucide-react';
import { User } from '../../types';
import { Button } from 'antd';

interface ProfileSummaryCardProps {
  user: User | null;
  profile: User | null;
  onEdit: () => void;
  onLogout: () => void;
}

export default function ProfileSummaryCard({ user, profile, onEdit, onLogout }: ProfileSummaryCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white   transition-all">
      <div className="h-24 md:h-16 bg-gradient-to-r from-primary/20 to-primary/5" />
      <div className="mt-[-40px] px-6 pb-6">
        <div className="relative mb-4">
          <div className="group h-20 w-20 overflow-hidden rounded-2xl bg-white p-1 shadow-lg relative overflow-hidden!">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-2xl font-bold text-primary">
              {profile?.photoURL || user?.photoURL ? (
                <img src={profile?.photoURL || user?.photoURL || ''} alt="Account" className="h-full w-full object-cover" />
              ) : (
                <span>{profile?.displayName?.[0] || user?.displayName?.[0] || 'U'}</span>
              )}
            </div>
            <button onClick={onEdit} className="absolute h-20! w-20! top-0 right-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-5 w-5" color='white' />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-secondary">{profile?.displayName || user?.displayName || 'User'}</h3>
          <p className="text-sm font-medium text-muted">{user?.email}</p>
        </div>

        {profile?.jobTitle && (
          <div className="mt-3 flex items-center gap-1.5 text-sm font-bold uppercase text-primary">
            <Briefcase className="h-3 w-3" />
            {profile.jobTitle}
          </div>
        )}

        {profile?.bio && (
          <p className="mt-4 border-l-2 border-primary/20 pl-3 text-sm italic leading-relaxed text-muted">
            "{profile.bio}"
          </p>
        )}

        <div className="flex gap-2 mt-4">
          <Button type="primary" onClick={onEdit} className="w-full capitalize">
            Edit Profile
          </Button>
          <Button onClick={onLogout} className="w-[35%]">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
