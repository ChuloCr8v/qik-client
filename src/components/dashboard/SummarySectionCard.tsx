import type { Key } from "react";
import { ChevronRight, ArrowRight, Clock } from "lucide-react";
import { Button, Empty } from "antd";
import { Meeting } from "../../types";
import ContentCard from "../ContentCard";
import { formatDate } from "../../lib/utils";
import {
    getMeetingStatusClassName,
    getMeetingStatusDotClassName,
    getMeetingStatusLabel
} from "./dashboardUtils";
import MetricEmptyState from "./MetricEmptyState";
import MeetingItemCard from "./MeetingItemCard";

type Props = {
    meetings: Meeting[];
    onOk?: () => void;
    onShowAll?: () => void;
    okText?: string;
    title?: string;
    onOpenMeeting: (meetingId: string) => void;
    limit?: number;
    subtitleMode?: "status" | "schedule";
    message?: string;
};

export default function SummarySectionCard({
    meetings,
    message,
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
                <Button
                    size="small"
                    type="text"
                    onClick={handleHeaderAction}
                    className="text-primary! text-xs!"
                >
                    <span>{okText}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                </Button>
            }
        >
            {visible.length > 0 ? (
                <div className="h-fit md:h-50 overflow-y-auto">
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
                <MetricEmptyState message={message} />
            )}
        </ContentCard>
    );
}
