import { CalendarCheck2, CalendarDays, Sparkles, Users } from "lucide-react";
import SummaryCard from "../global/SummaryCards";

interface Props {
    totalMeetings?: number;
    thisMonth?: number;
    teamMembers?: number;
    aiGenerations?: number | string;
}

export default function DashboardStatsCards({
    totalMeetings = 0,
    thisMonth = 0,
    teamMembers = 0,
    aiGenerations = 0
}: Props) {
    const statsData = [
        {
            label: "Total Meetings",
            value: totalMeetings,
            icon: CalendarDays,
            color: "text-primary",
            bg: "bg-primary/5"
        },
        {
            label: "This Month",
            value: thisMonth,
            icon: CalendarCheck2,
            color: "text-green-600",
            bg: "bg-green-600/5"
        },
        {
            label: "Team Members",
            value: teamMembers,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-600/5"
        },
        {
            label: "AI Generations",
            value: aiGenerations,
            icon: Sparkles,
            color: "text-amber-500",
            bg: "bg-amber-500/5"
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {statsData.map(stat => (
                <SummaryCard key={stat.label} stat={stat} />
            ))}
        </div>
    );
}
