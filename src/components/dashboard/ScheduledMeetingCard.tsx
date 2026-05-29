import { ArrowLeft, ChevronRight, FileText } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Table, { TableCell, TableRow } from "../Table";
import { Meeting } from "../../types";
import {
    getMeetingStatusClassName,
    getMeetingStatusDotClassName,
    getMeetingStatusLabel
} from "./dashboardUtils";
import SummarySectionCard from "./SummarySectionCard";
import { useMeetings } from "../../features/meetings/MeetingsProvider";
import { useNavigate } from "react-router-dom";

export default function ScheduledMeetingCard() {
    const { meetings, isCreatingMeeting, createNewMeeting } = useMeetings();

    const navigate = useNavigate();

    return (
        <div className="">
            <SummarySectionCard
                title="Scheduled Meetings"
                okText="Show All"
                meetings={meetings}
                onShowAll={() => navigate("/meetings")}
                onOpenMeeting={meetingId => navigate(`/meetings/${meetingId}`)}
            />
        </div>
    );
}
