import React, { useState, useEffect } from 'react';
import Drawer from './Drawer';
import { Loader2, Camera, User as UserIcon, Building, FileText } from 'lucide-react';
import { getAnimeAvatar } from '../lib/userUtils';
import { User } from '../types';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from '../features/users/usersApi';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSuccess: () => void;
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  user,
  onSuccess
}: ProfileEditModalProps) {
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [bio, setBio] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data } = useGetCurrentUserQuery(undefined, { skip: !user || !isOpen });
  const [updateUserProfile] = useUpdateCurrentUserMutation();

  useEffect(() => {
    if (isOpen && user && data) {
      setDisplayName(data.displayName || user.displayName || '');
      setPhotoURL(data.photoURL || user.photoURL || '');
      setBio(data.bio || '');
      setJobTitle(data.jobTitle || '');
    }
  }, [isOpen, user, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await updateUserProfile({
        displayName,
        photoURL,
        bio,
        jobTitle
      }).unwrap();
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Edit Your Profile"
      icon={<UserIcon className="h-5 w-5 text-primary" />}
      footer={
        <div className="flex flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            form="profile-form"
            type="submit"
            disabled={loading || initialLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-white   shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Save Changes
          </button>
        </div>
      }
    >
      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        {initialLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4">
              <div className="group relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md transform transition-transform hover:scale-105">
                <img 
                  src={photoURL || (user ? getAnimeAvatar(user.email || user.uid) : '')} 
                  alt="Avatar" 
                  className="h-full w-full object-cover" 
                />
                <div className="invisible group-hover:visible absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity">
                   <Camera className="h-4 w-4 text-white" />
                   <span className="text-[8px] font-bold text-white uppercase tracking-wider">Change</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted flex items-center gap-2">
                  <UserIcon className="h-3 w-3" />
                  Display Name
                </label>
                <input 
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-xs font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all  "
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted flex items-center gap-2">
                  <Building className="h-3 w-3" />
                  Job Title
                </label>
                <input 
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Product Designer"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-xs font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all  "
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted flex items-center gap-2">
                  <FileText className="h-3 w-3" />
                  Short Bio
                </label>
                <textarea 
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us a little about yourself..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-xs font-medium focus:border-primary focus:bg-white focus:outline-none transition-all resize-none  "
                />
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted flex items-center gap-2">
                  <Camera className="h-3 w-3" />
                  Avatar URL
                </label>
                <input 
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://images.unsplash.com/photo..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-xs font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all  "
                />
                <p className="text-[9px] text-muted leading-tight">Use a direct link to an image (Unsplash, Google Photos, etc.)</p>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 p-3">
                <p className="text-[10px] font-semibold text-red-500">{error}</p>
              </div>
            )}
          </>
        )}
      </form>
    </Drawer>
  );
}
