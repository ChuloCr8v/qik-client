import { useNavigate } from "react-router-dom";
import GuideLineCard from "../components/dashboard/GuideLineCard";
import { useState } from "react";
import NewMeetingCard from "../components/dashboard/NewMeetingCard";
import RecentMeetingsCard from "../components/dashboard/RecentMeetingsCard";
import UsageBadge from "../components/billing/UsageBadge";
import { MeetingTemplate } from "../constants/templates";
import { useMeetings } from "../features/meetings/MeetingsProvider";
import GreetingCard from "../components/dashboard/GreetingCard";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";
import DashboardStatsCards from "../components/dashboard/DashboardStatsCards";
import ScheduleChart from "../components/dashboard/ScheduleChart";

export default function DashboardPage() {
    const [openNewMeetingCard, setOpenNewMeetingCard] = useState(false);
    const navigate = useNavigate();
    const { meetings, isCreatingMeeting, createNewMeeting } = useMeetings();

    const handleCreateMeeting = async (input: {
        title: string;
        template?: MeetingTemplate;
        scheduledAt?: string;
        invitees: string[];
    }) => {
        const id = await createNewMeeting(input);
        navigate(`/meetings/${id}`);
    };

    return (
        <main className="mx-auto space-y-2 max-w-6xl px-4 py-8 sm:px-6">
            <div className="mb-4 flex justify-end">
                <UsageBadge />
            </div>
            <GreetingCard />
            <DashboardStatsCards />
            <DashboardQuickActions
                openNewMeetingCard={openNewMeetingCard}
                setOpenNewMeetingCard={setOpenNewMeetingCard}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ScheduleChart />
                <RecentMeetingsCard
                    meetings={meetings}
                    onShowAll={() => navigate("/meetings")}
                    onOpenMeeting={meetingId =>
                        navigate(`/meetings/${meetingId}`)
                    }
                />
            </div>

            {openNewMeetingCard && (
                <NewMeetingCard
                    isOpen={openNewMeetingCard}
                    onClose={() => {
                        setOpenNewMeetingCard(false);
                    }}
                    isCreatingMeeting={isCreatingMeeting}
                    onCreateMeeting={handleCreateMeeting}
                    onBrowseTemplates={() => navigate("/templates")}
                />
            )}
        </main>
    );
}
