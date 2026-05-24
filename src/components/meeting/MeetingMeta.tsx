import { Clock, Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";
import { Meeting, Participant } from "../../types";
import { formatDate } from "../../lib/utils";
import ParticipantStack from "./ParticipantStack";
import MeetingStatusBadge from "./MeetingStatusBadge";

interface MeetingMetaProps {
    meeting: Meeting;
    participants: Participant[];
    totalTime: number;
}

export default function MeetingMeta({
    meeting,
    allParticipants,
    totalTime
}: MeetingMetaProps) {
    const participants = allParticipants

    return (
        <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex min-w-0 flex-col text-left">
                <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-bold tracking-tight text-secondary">
                        {meeting.title}
                    </h2>
                    <span
                        className={cn(
                            "text-[10px]! flex items-center gap-1 font-bold",
                            meeting.isPublic ? "text-primary" : "text-slate-500"
                        )}
                    >
                        {meeting.isPublic ? (
                            <Eye className="h-4 w-4" />
                        ) : (
                            <EyeOff className="h-4 w-4 -m-0.5" />
                        )}
                    </span>
                </div>

                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium text-muted">
                    <ParticipantStack
                        meeting={meeting}
                        participants={participants}
                        max={3}
                    />
                    <span className="text-slate-300">-</span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {totalTime}m
                    </span>
                    {meeting.scheduledAt && (
                        <>
                            <span className="text-slate-300">-</span>
                            <span className="flex items-center gap-1">
                                {formatDate(meeting.scheduledAt)}
                            </span>
                        </>
                    )}
                    <span className="text-slate-300">-</span>
                    <MeetingStatusBadge status={meeting.status} />
                </div>
            </div>
        </div>
    );
}
