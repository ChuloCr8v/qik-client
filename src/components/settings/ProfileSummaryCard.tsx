import { Briefcase, Camera, LogOut } from 'lucide-react';
import { User } from '../../types';

interface ProfileSummaryCardProps {
  user: User | null;
  profile: User | null;
  onEdit: () => void;
  onLogout: () => void;
}

export default function ProfileSummaryCard({ user, profile, onEdit, onLogout }: ProfileSummaryCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-white   transition-all hover:shadow-md">
      <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/5" />
      <div className="mt-[-40px] px-6 pb-6">
        <div className="relative mb-4">
          <div className="group h-20 w-20 overflow-hidden rounded-2xl bg-white p-1 shadow-lg">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-2xl font-bold text-primary">
              {profile?.photoURL || user?.photoURL ? (
                <img src={profile?.photoURL || user?.photoURL || ''} alt="Account" className="h-full w-full object-cover" />
              ) : (
                <span>{profile?.displayName?.[0] || user?.displayName?.[0] || 'U'}</span>
              )}
            </div>
            <button onClick={onEdit} className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold text-secondary">{profile?.displayName || user?.displayName || 'User'}</h3>
          <p className="text-[11px] font-medium text-muted">{user?.email}</p>
        </div>

        {profile?.jobTitle && (
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Briefcase className="h-3 w-3" />
            {profile.jobTitle}
          </div>
        )}

        {profile?.bio && (
          <p className="mt-4 border-l-2 border-primary/20 pl-3 text-[11px] italic leading-relaxed text-muted">
            "{profile.bio}"
          </p>
        )}

        <div className="mt-6 flex gap-2 border-t border-slate-50 pt-6">
          <button onClick={onEdit} className="flex-1 rounded-xl bg-secondary py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98]">
            Edit Profile
          </button>
          <button onClick={onLogout} className="flex w-12 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition-colors hover:bg-red-100">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
