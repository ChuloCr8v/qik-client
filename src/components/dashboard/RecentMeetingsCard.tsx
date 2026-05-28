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

type Props = {
    meetings: Meeting[];
    onShowAll: () => void;
    onOpenMeeting: (meetingId: string) => void;
};

export default function RecentMeetingsCard({
    meetings,
    onShowAll,
    onOpenMeeting
}: Props) {
    return (
        <div className="">
            <SummarySectionCard
                okText="Show All"
                meetings={meetings}
                onShowAll={onShowAll}
                onOpenMeeting={onOpenMeeting}
            />
        </div>
    );
}
