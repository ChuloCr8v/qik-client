import React from "react";
import { CalendarClock, Flame, TrendingUp } from "lucide-react";
import { useAuth } from "../../features/auth/AuthProvider";
import { useGetCurrentUserQuery } from "../../features/users/usersApi";
import { Button } from "antd";
import { usePopup } from "../../context/PopupContext";
import NewMeetingCard from "./NewMeetingCard";

interface Meeting {
    id: string;
    title: string;
    time: string;
}

interface Props {
    streak?: number;
    meetingsToday?: number;
    nextMeeting?: Meeting | null;
    monthlyMeetings?: number;
    lastMonthMeetings?: number;
}

const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: "Good morning", emoji: " ☀️" };
    if (h < 17) return { text: "Good afternoon", emoji: " 🌤️" };
    return { text: "Good evening", emoji: " 🌙" };
};

const GreetingCard = ({
    streak = 0,
    meetingsToday = 0,
    nextMeeting = null,
    monthlyMeetings = 0,
    lastMonthMeetings = 0
}: Props) => {
    const { openModal } = usePopup();
    const { user } = useAuth();
    const { data: profileData } = useGetCurrentUserQuery(undefined, {
        skip: !user
    });

    const username = profileData?.displayName;
    const greeting = getGreeting();
    const diff = monthlyMeetings - lastMonthMeetings;
    const isUp = diff >= 0;

    return (
        <div className="rounded-xl border border-border bg-white overflow-hidden">
            {/* Top — greeting + streak */}
            <div className="flex items-center justify-between px-4 pt-4">
                <div>
                    <p className="text-muted mb-0.5">
                        {greeting.text}
                        {greeting.emoji}
                    </p>
                    <h1 className="text-xl font-semibold text-secondary tracking-tight leading-tight">
                        {username}
                    </h1>
                </div>

                <Button
                    type="primary"
                    onClick={() => openModal(<NewMeetingCard />)}
                >
                    Create <span className="text-lg -mt-1">+</span>
                </Button>

                {/* Streak badge */}
                {streak > 0 && (
                    <div className="flex hidden flex-col items-center justify-center bg-green-50 border border-green-100 rounded-xl px-3 py-2 min-w-[60px]">
                        <div className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-primary" />
                            <span className="text-base font-black text-primary leading-none">
                                {streak}
                            </span>
                        </div>
                        <span className="text-sm text-primary/70 capitalize mt-0.5">
                            week streak
                        </span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 items-center gap-2 p-3">
                {/* Today's meetings */}
                <div className="border border-border overflow-hidden bg-gray-50 rounded-lg flex items-center gap-2 flex-1 p-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CalendarClock className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold leading-tight text-secondary">
                            {meetingsToday} meeting
                            {meetingsToday !== 1 ? "s" : ""} today
                        </p>
                        {nextMeeting ? (
                            <p className="text-xs text-muted leading-tight truncate max-w-[120px]">
                                Next: {nextMeeting.title} · {nextMeeting.time}
                            </p>
                        ) : (
                            <p className="text-xs text-muted">
                                Clear schedule!
                            </p>
                        )}
                    </div>
                </div>

                {/* Monthly trend */}
                <div className="flex items-center gap-2 border border-border overflow-hidden bg-gray-50 p-3 rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4.5 h-4.5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-secondary font-semibold leading-tight">
                            {monthlyMeetings} this month
                        </p>
                        <p
                            className={`text-xs leading-tight ${isUp ? "text-green-500" : "text-red-400"}`}
                        >
                            {isUp ? "▲" : "▼"} {Math.abs(diff)} vs last month
                        </p>
                    </div>
                </div>
            </div>

            {/**
                <div className="flex items-center gap-2 px-4 py-3">
                    <button
                        onClick={onNewAgenda}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors active:scale-[0.98]"
                    >
                        <Sparkles className="w-3 h-3" />
                        Generate Agenda
                    </button>
                    <button
                        onClick={onViewSchedule}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-secondary text-sm font-semibold py-2 rounded-lg hover:bg-slate-200 transition-colors active:scale-[0.98]"
                    >
                        <CalendarClock className="w-3 h-3" />
                        View Schedule
                    </button>
                </div> **/}
        </div>
    );
};

export default GreetingCard;
