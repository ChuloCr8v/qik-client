import SummarySectionCard from "./SummarySectionCard";
import { useMeetings } from "../../features/meetings/MeetingsProvider";
import { useNavigate } from "react-router-dom";

export default function RecentMeetingsCard() {
    const { meetings } = useMeetings();
    const navigate = useNavigate();

    return (
        <div className="">
            <SummarySectionCard
                title="Recent meetings"
                okText="Show All"
                meetings={meetings}
                onShowAll={() => navigate("/meetings")}
                onOpenMeeting={meetingId => navigate(`/meetings/${meetingId}`)}
                message="No Recent Meetings Yet"
            />
        </div>
    );
}
