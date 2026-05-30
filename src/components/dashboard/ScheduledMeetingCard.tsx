import { useNavigate } from "react-router-dom";
import { useMeetings } from "../../features/meetings/MeetingsProvider";
import SummarySectionCard from "./SummarySectionCard";

export default function ScheduledMeetingCard() {
    const { meetings } = useMeetings();
    const navigate = useNavigate();

    const scheduledMeetings = meetings.filter(meeting => meeting.status === "scheduled");

    return (
        <SummarySectionCard
            title="Scheduled Meetings"
            okText="Show All"
            meetings={scheduledMeetings}
            subtitleMode="schedule"
            onShowAll={() => navigate("/meetings")}
            onOpenMeeting={meetingId => navigate(`/meetings/${meetingId}`)}
        />
    );
}
