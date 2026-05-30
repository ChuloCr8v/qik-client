import { Loader2 } from "lucide-react";
import DashboardStatsCards from "../components/dashboard/DashboardStatsCards";
import GreetingCard from "../components/dashboard/GreetingCard";
import MeetingStatusChart from "../components/dashboard/MeetingStatusChart";
import MeetingTrendsChart from "../components/dashboard/MeetingTrendsChart";
import RecentMeetingsCard from "../components/dashboard/RecentMeetingsCard";
import ScheduleChart from "../components/dashboard/ScheduleChart";
import ScheduledMeetingCard from "../components/dashboard/ScheduledMeetingCard";
import AIUsageRings from "../components/dashboard/charts/AIUsageRings";
import AgendaQualityChart from "../components/dashboard/charts/AgendaQualityChart";
import TopMeetingsChart from "../components/dashboard/charts/TopMeetingsChart";
import { useGetDashboardStatsQuery } from "../features/meetings/meetingsApi";

export default function DashboardPage() {
    const { data: stats, isLoading } = useGetDashboardStatsQuery();

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <main className="mx-auto space-y-2 max-w-6xl w-full pt-2 sm:px-6 pt-3">
            {/* <UsageBadge /> */}
            <GreetingCard
                streak={stats?.greeting?.streak}
                meetingsToday={stats?.greeting?.meetingsToday}
                nextMeeting={stats?.greeting?.nextMeeting}
                monthlyMeetings={stats?.greeting?.monthlyMeetings}
                lastMonthMeetings={stats?.greeting?.lastMonthMeetings}
            />
            <DashboardStatsCards
                totalMeetings={stats?.statsCards?.totalMeetings}
                thisMonth={stats?.statsCards?.thisMonth}
                teamMembers={stats?.statsCards?.teamMembers}
                aiGenerations={stats?.statsCards?.aiGenerations}
            />
            <div className="max-md:space-y-2 md:grid grid-cols-1 md:grid-cols-3 gap-2">
                <ScheduleChart data={stats?.weeklyActivities} />
                <ScheduledMeetingCard />
            </div>
            <div className="max-md:space-y-2 md:grid grid-cols-1 md:grid-cols-3 gap-2">
                <RecentMeetingsCard />
                <MeetingTrendsChart data={stats?.weeklyTrends} />
                <MeetingStatusChart
                    completed={stats?.statusDistribution?.completed}
                    scheduled={stats?.statusDistribution?.scheduled}
                    draft={stats?.statusDistribution?.draft}
                    cancelled={stats?.statusDistribution?.cancelled}
                />
            </div>
            <div className="max-md:space-y-2 md:grid grid-cols-1 md:grid-cols-3 gap-2">
                <TopMeetingsChart data={stats?.topMeetingTypes} />
                <AgendaQualityChart
                    completed={stats?.agendaQuality?.completed}
                    skipped={stats?.agendaQuality?.skipped}
                />
                <AIUsageRings members={stats?.teamAiUsage} />
            </div>
        </main>
    );
}
