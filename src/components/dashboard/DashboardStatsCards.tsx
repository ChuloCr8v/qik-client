import React from "react";
import { CalendarDays, CalendarCheck2, Users, Sparkles } from "lucide-react";

interface StatItem {
    label: string;
    value: number | string;
    icon: React.ElementType;
    textColor: string;
    bgColor: string;
    iconBg: string;
}

interface Props {
    totalMeetings?: number;
    thisMonth?: number;
    teamMembers?: number;
    aiGenerations?: number | string;
}

const DashboardStatsCards = ({
    totalMeetings = 50,
    thisMonth = 40,
    teamMembers = 8,
    aiGenerations = 40
}: Props) => {
    const statsData: StatItem[] = [
        {
            label: "Total Meetings",
            value: totalMeetings,
            icon: CalendarDays,
            textColor: "text-primary",
            bgColor: "bg-primary/5 border-primary/10",
            iconBg: "bg-primary/10 text-primary"
        },
        {
            label: "This Month",
            value: thisMonth,
            icon: CalendarCheck2,
            textColor: "text-green-600",
            bgColor: "bg-green-600/5 border-green-600/10",
            iconBg: "bg-green-600/10 text-green-600"
        },
        {
            label: "Team Members",
            value: teamMembers,
            icon: Users,
            textColor: "text-blue-600",
            bgColor: "bg-blue-600/5 border-blue-600/10",
            iconBg: "bg-blue-600/10 text-blue-600"
        },
        {
            label: "AI Generations",
            value: aiGenerations,
            icon: Sparkles,
            textColor: "text-yellow-600",
            bgColor: "bg-yellow-600/5 border-yellow-600/10",
            iconBg: "bg-yellow-600/10 text-yellow-600"
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {statsData.map(s => {
                const Icon = s.icon;
                return (
                    <div
                        key={s.label}
                        className={`flex items-center gap-2 rounded-2xl border border-border bg-white p-3 shadow-xs transition-all hover:shadow-md sm:p-5`}
                    >
                        <div
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${s.iconBg}`}
                        >
                            <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="text-xs text-gray-500">{s.label}</p>
                            <p className={`font-semibold text- `}>
                                {s.value}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardStatsCards;
