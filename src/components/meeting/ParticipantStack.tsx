import { Participant } from '../../types';
import { generateAnimeName, getAnimeAvatar } from '../../lib/userUtils';

interface ParticipantStackProps {
  participants: Participant[];
  max?: number;
}

export default function ParticipantStack({ participants, max = 4 }: ParticipantStackProps) {
  const visibleParticipants = participants.slice(0, max);
  const remaining = participants.length - max;

  return (
    <div className="flex items-center">
      <div className="mr-2 flex -space-x-2">
        {visibleParticipants.map((participant) => {
          const avatar = participant.photoURL || getAnimeAvatar(participant.uid);
          const name = participant.displayName || generateAnimeName(participant.uid);

          return (
            <div
              key={participant.id}
              title={name}
              className="relative inline-block flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-[10px] font-semibold shadow-sm ring-2 ring-white transition-transform hover:z-10 hover:scale-110"
            >
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            </div>
          );
        })}
      </div>
      {remaining > 0 && (
        <span className="rounded-full border border-border bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-muted">
          +{remaining}
        </span>
      )}
      {participants.length === 0 && (
        <span className="text-[10px] font-medium italic text-muted">No one yet</span>
      )}
    </div>
  );
}
