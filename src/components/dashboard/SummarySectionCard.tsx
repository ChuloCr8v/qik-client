import type { Key } from "react";
import { ChevronRight, FileText, ArrowRight, Clock } from "lucide-react";
import { Meeting } from "../../types";
import ContentCard from "../ContentCard";
import { formatDate } from "../../lib/utils";
import {
    getMeetingStatusClassName,
    getMeetingStatusDotClassName,
    getMeetingStatusLabel
} from "./dashboardUtils";

// ─── Meeting Item Card ───────────────────────────────────────────────────────

interface MeetingItemCardProps {
    key?: Key;
    meeting: Meeting;
    index: number;
    onClick: () => void;
    subtitleMode?: "status" | "schedule";
}

function MeetingItemCard({ meeting, index, onClick, subtitleMode = "status" }: MeetingItemCardProps) {
    const scheduledText = meeting.scheduledAt ? formatDate(meeting.scheduledAt) : "Not scheduled";

    return (
        <button
            onClick={onClick}
            className="w-full rounded-none! text-left flex items-center gap-3 p-3! border-0! border-b! h-auto! border-border hover:border-primary/20! hover:bg-primary/5! transition-all group"
        >
            {/* Index badge */}
            {/**<div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/5 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted">
                    {index + 1}
                </span>
            </div>**/}

            {/* Meeting info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-secondary truncate leading-tight">
                    {meeting.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    {subtitleMode === "schedule" ? (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{scheduledText}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <div
                                className={`h-1.5 w-1.5 rounded-full ${getMeetingStatusDotClassName(meeting.status)}`}
                            />
                            <span
                                className={`text-xs font-bold ${getMeetingStatusClassName(meeting.status)}`}
                            >
                                {getMeetingStatusLabel(meeting.status)}
                            </span>
                        </div>
                    )}
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
                <p className="text-sm font-semibold text-secondary">
                    No upcoming meetings
                </p>
                <p className="text-sm text-muted">
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
    onShowAll?: () => void;
    okText?: string;
    title?: string;
    onOpenMeeting: (meetingId: string) => void;
    limit?: number;
    subtitleMode?: "status" | "schedule";
};

export default function SummarySectionCard({
    meetings,
    okText,
    onOk,
    onShowAll,
    onOpenMeeting,
    limit = 4,
    title,
    subtitleMode = "status"
}: Props) {
    const visible = meetings?.slice(0, limit) ?? [];
    const handleHeaderAction = onOk || onShowAll;

    return (
        <ContentCard
            title={title}
            headerRight={
                <button
                    onClick={handleHeaderAction}
                    className="border-0! p-0! h-auto! flex items-center gap-2 text-sm text-primary"
                >
                    <span>{okText}</span>
                    <ChevronRight className="h-4 w-4 -mt-0.5" />
                </button>
            }
        >
            {visible.length > 0 ? (
                <div className="h-50 overflow-y-auto">
                    {visible.map((meeting, index) => (
                        <MeetingItemCard
                            key={meeting.id}
                            meeting={meeting}
                            index={index}
                            subtitleMode={subtitleMode}
                            onClick={() => onOpenMeeting(meeting.id)}
                        />
                    ))}
                </div>
            ) : (
                <MeetingsEmptyState />
            )}
        </ContentCard>
    );
}
