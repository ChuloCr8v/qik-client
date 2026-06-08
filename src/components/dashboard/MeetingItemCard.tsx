import { Button } from "antd";
import {
    getMeetingStatusDotClassName,
    getMeetingStatusClassName,
    getMeetingStatusLabel
} from "./dashboardUtils";
interface MeetingItemCardProps {
    key?: Key;
    meeting: Meeting;
    index: number;
    onClick: () => void;
    subtitleMode?: "status" | "schedule";
}
import { ArrowRight, Clock } from 'lucide-react'
import { formatDate } from "@/src/lib/utils";
import { Key } from "readline";
import { Meeting } from "@/src/types";

function MeetingItemCard({
    meeting,
    index,
    onClick,
    subtitleMode = "status"
}: MeetingItemCardProps) {
    const scheduledText = meeting.scheduledAt
        ? formatDate(meeting.scheduledAt)
        : "Not scheduled";

    return (
        <Button
            type="text"
            onClick={onClick}
            className="group flex h-auto! w-full items-center justify-start gap-3 rounded-none! border-0! border-b! border-border! p-3! py-2! text-left hover:border-primary/20! hover:bg-primary/5!"
        >
            {/* Index badge */}
            {/**<div className="flex-shrink-0 w-6 h-6 rounded-lg bg-primary/5 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-muted">
                    {index + 1}
                </span>
            </div>**/}

            {/* Meeting info */}
            <div className="flex-1 min-w-0 flex flex-col items-start">
                <p className="text-xs  font-semibold text-secondary truncate leading-tight">
                    {meeting.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    {subtitleMode === "schedule" ? (
                        <div className="flex items-center gap-1.5 text-[10px]! md:text-xs text-muted">
                            <Clock className="h-2.5 w-2.5 md:h-3 md:w-3 text-slate-400" />
                            <span>{scheduledText}</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <div
                                className={`h-1.5 w-1.5 rounded-full ${getMeetingStatusDotClassName(meeting.status)}`}
                            />
                            <span
                                className={`text-[10px] md:text-xs ${getMeetingStatusClassName(meeting.status)}`}
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
        </Button>
    );
}

export default MeetingItemCard;
