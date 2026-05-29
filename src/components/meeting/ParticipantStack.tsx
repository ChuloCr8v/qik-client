import { Participant, Meeting } from "../../types";
import { generateAnimeName, getAnimeAvatar } from "../../lib/userUtils";

interface ParticipantStackProps {
    participants: Participant[];
    max?: number;
    meeting?: Meeting;
}

export default function ParticipantStack({
    participants,
    max = 4,
    meeting
}: ParticipantStackProps) {
    const visibleParticipants = participants.slice(0, max);
    const remaining = participants.length - max;

    return (
        <div className="flex items-center gap-2">
            <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                    <div
                        title={name}
                        className="relative inline-block flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-[10px] font-semibold   ring-2 ring-white transition-transform hover:z-10 hover:scale-110"
                    >
                        <img
                            src={
                                meeting.owner.photoUrl ||
                                generateAnimeName(meeting.owner.id)
                            }
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-semibold">
                            {meeting.owner?.displayName}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mr-2 flex -space-x-2">
                {visibleParticipants.map(participant => {
                    const avatar =
                        participant.photoURL || getAnimeAvatar(participant.uid);
                    const name =
                        participant.displayName ||
                        generateAnimeName(participant.uid);

                    return (
                        <div
                            key={participant.id}
                            title={name}
                            className="relative inline-block flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-[10px] font-semibold   ring-2 ring-white transition-transform hover:z-10 hover:scale-110"
                        >
                            <img
                                src={avatar}
                                alt={name}
                                className="h-full w-full object-cover"
                            />
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
                <span className="text-[10px] font-medium italic text-muted">
                    No one yet
                </span>
            )}
        </div>
    );
}
