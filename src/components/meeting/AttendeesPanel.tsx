import {
  Users
} from 'lucide-react';
import {
  Participant
} from '../../types';
import {
  generateAnimeName,
  getAnimeAvatar
} from '../../lib/userUtils';
import SectionHeading from '../SectionHeading'
interface AttendeesPanelProps {
  participants: Participant[];
}

export default function AttendeesPanel({
  participants
}: AttendeesPanelProps) {
  return (
    <div className="">
      <SectionHeading title="Attendees" />

      <div className="-mt-4 custom-scrollbar max-h-[300px] space-y-1.5 overflow-y-auto pr-1">
        {participants.length > 0 ? (
          participants.map(participant => {
            const avatar = participant.photoURL || getAnimeAvatar(participant.uid);
            const name = participant.displayName || generateAnimeName(participant.uid);

            return (
              <div key={participant.id} className="group flex items-center gap-2 rounded-xl border border-border bg-slate-50 p-1.5 transition-all hover:border-primary/20 hover:shadow-sm">
                <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                  <img src={avatar} alt={name} className="h-full w-full object-cover" />
                <div className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full border border-white bg-accent" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-semibold text-secondary">{name}</span>
                <span className="text-[8px] text-muted">Active now</span>
              </div>
            </div>
          );
          })
      ): (
        <p className="py-4 text-center text-[10px] italic text-muted">
          Waiting for others to join...
        </p>
      )}
    </div>
  </div>
);
}