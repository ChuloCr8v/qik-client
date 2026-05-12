import { X } from 'lucide-react';
import { Participant } from '../../../types';
import { getAnimeAvatar } from '../../../lib/userUtils';

interface LiveMeetingHeaderProps {
  meetingTitle: string;
  participants: Participant[];
  onClose: () => void;
}

export default function LiveMeetingHeader({ meetingTitle, participants, onClose }: LiveMeetingHeaderProps) {
  return (
    <div className="flex h-20 items-center justify-between border-b border-white/5 bg-slate-950/50 px-6 backdrop-blur-xl md:px-12">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {participants.slice(0, 3).map(participant => (
            <img
              key={participant.id}
              src={participant.photoURL || getAnimeAvatar(participant.uid)}
              alt={participant.displayName}
              className="h-8 w-8 rounded-full border-2 border-slate-950 ring-1 ring-white/10"
            />
          ))}
          {participants.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-slate-800 text-[10px] font-bold ring-1 ring-white/10">
              +{participants.length - 3}
            </div>
          )}
        </div>
        <div className="flex h-5 w-px bg-white/10" />
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Live Meeting</h2>
          <p className="max-w-[200px] truncate text-xs font-medium text-white/60 sm:max-w-md">{meetingTitle}</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-all hover:bg-red-500/10 hover:text-red-500"
      >
        <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
      </button>
    </div>
  );
}
