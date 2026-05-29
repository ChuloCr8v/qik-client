import { ChevronRight, FileText, ArrowRight, Clock, Users } from "lucide-react";
import { Meeting } from "../../types";
import {
    getMeetingStatusClassName,
    getMeetingStatusDotClassName,
    getMeetingStatusLabel
} from "./dashboardUtils";

// ─── Meeting Item Card ───────────────────────────────────────────────────────

interface MeetingItemCardProps {
    meeting: Meeting;
    index: number;
    onClick: () => void;
}

function MeetingItemCard({ meeting, index, onClick }: MeetingItemCardProps) {
    return (
        <button
            onClick={onClick}
            className="w-full rounded-none! text-left flex items-center gap-3 p-3! border-0! border-b! h-auto! border-border hover:border-primary/20! hover:bg-primary/5! transition-all group"
        >
            {/* Index badge */}
            {/**<div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/5 rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-muted">
                    {index + 1}
                </span>
            </div>**/}

            {/* Meeting info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-secondary truncate leading-tight">
                    {meeting.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-1">
                        <div
                            className={`h-1.5 w-1.5 rounded-full ${getMeetingStatusDotClassName(meeting.status)}`}
                        />
                        <span
                            className={`text-[10px] font-bold ${getMeetingStatusClassName(meeting.status)}`}
                        >
                            {getMeetingStatusLabel(meeting.status)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            <div className="bg-primary/5 group-hover:bg-primary/20! h-8 w-8 mr-2 flex justify-center items-center rounded-xl">
                <ArrowRight className="h-3.5 w-3.5 text-primary flex-shrink-0" />
            </div>
        </button>
    );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function MeetingsEmptyState() {
    return (
        <div className="rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30 py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-slate-200" />
            <div className="mt-4 space-y-1">
                <p className="text-[12px] font-semibold text-secondary">
                    No upcoming meetings
                </p>
                <p className="text-[11px] text-muted">
                    Create your first meeting to start collaborating.
                </p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Props = {
    meetings: Meeting[];
    onOk?: () => void;
    okText?: string;
    title?: string;
    onOpenMeeting: (meetingId: string) => void;
    limit?: number;
};

export default function SummarySectionCard({
    meetings,
    okText,
    onOk,
    onOpenMeeting,
    limit = 4,
    title
}: Props) {
    const visible = meetings?.slice(0, limit) ?? [];

    return (
        <div className="bg-white overflow-hidden rounded-xl border border-border">
            {/* Header */}
            <div className="bg-gy-50 min-w-0 flex items-center justify-between border-b border-border p-3 py-2">
                <h1 className="font-semibold tracking-tight text-secondary">
                    {title}
                </h1>
                <button
                    onClick={onOk}
                    className="border-0! p-0! h-0! flex items-center gap-2 text-xs text-primary"
                >
                    <span>{okText}</span>
                    <ChevronRight className="h-4 w-4 -mt-0.5" />
                </button>
            </div>

            {/* Meeting list or empty state */}
            {visible.length > 0 ? (
                <div className="h-50 overflow-y-scroll">
                    {visible.map((meeting, index) => (
                        <MeetingItemCard
                            key={meeting.id}
                            meeting={meeting}
                            index={index}
                            onClick={() => onOpenMeeting(meeting.id)}
                        />
                    ))}
                </div>
            ) : (
                <MeetingsEmptyState />
            )}
        </div>
    );
}
