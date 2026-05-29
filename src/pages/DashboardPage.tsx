import { useNavigate } from "react-router-dom";
import GuideLineCard from "../components/dashboard/GuideLineCard";
import { useState } from "react";
import NewMeetingCard from "../components/dashboard/NewMeetingCard";
import ScheduledMeetingCard from "../components/dashboard/ScheduledMeetingCard";
import RecentMeetingsCard from "../components/dashboard/RecentMeetingsCard";
import UsageBadge from "../components/billing/UsageBadge";
import { MeetingTemplate } from "../constants/templates";
import GreetingCard from "../components/dashboard/GreetingCard";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";
import DashboardStatsCards from "../components/dashboard/DashboardStatsCards";
import MeetingStatusChart from "../components/dashboard/MeetingStatusChart";
import ScheduleChart from "../components/dashboard/ScheduleChart";
import MeetingTrendsChart from "../components/dashboard/MeetingTrendsChart";
import AIUsageRings from "../components/dashboard/charts/AIUsageRings";
import AgendaQualityChart from "../components/dashboard/charts/AgendaQualityChart";
import TopMeetingsChart from "../components/dashboard/charts/TopMeetingsChart";

export default function DashboardPage() {
    return (
        <main className="mx-auto space-y-2 max-w-6xl w-full pt-2 sm:px-6 pt-3">
            <UsageBadge />
            <GreetingCard />
            <DashboardStatsCards />
            <div className="max-md:space-y-2 md:grid grid-cols-1 md:grid-cols-3 gap-2">
                <ScheduleChart />
                <ScheduledMeetingCard />
            </div>
            <div className="max-md:space-y-2 md:grid grid-cols-1 md:grid-cols-3 gap-2">
                <RecentMeetingsCard />
                <MeetingTrendsChart />
                <MeetingStatusChart />
            </div>
            <div className="max-md:space-y-2 md:grid grid-cols-1 md:grid-cols-3 gap-2">
                <TopMeetingsChart />
                <AgendaQualityChart />
                <AIUsageRings />
            </div>
        </main>
    );
}
