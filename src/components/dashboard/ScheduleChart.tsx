import React, { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WeeklyData {
    day: string;
    meetings: number;
    isToday: boolean;
    isFuture: boolean;
}

interface Props {
    /**
     * Pass in raw data per day. If omitted, mock data is used.
     * days should be ordered Mon → Sun or Mon → Fri
     */
    data?: { day: string; meetings: number }[];
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-md">
            <p className="text-[11px] font-semibold text-secondary">{label}</p>
            <p className="text-[11px] text-muted">
                {payload[0].value}{" "}
                {payload[0].value === 1 ? "meeting" : "meetings"}
            </p>
        </div>
    );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getTodayIndex = () => {
    // 0 = Sun, so we shift to Mon = 0
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
};

const DEFAULT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_DATA = [
    { day: "Mon", meetings: 3 },
    { day: "Tue", meetings: 5 },
    { day: "Wed", meetings: 2 },
    { day: "Thu", meetings: 4 },
    { day: "Fri", meetings: 6 },
    { day: "Sat", meetings: 1 },
    { day: "Sun", meetings: 0 }
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScheduleChart({ data = DEFAULT_DATA }: Props) {
    const todayIndex = getTodayIndex();

    const chartData: WeeklyData[] = useMemo(
        () =>
            data.map((d, i) => ({
                ...d,
                isToday: i === todayIndex,
                isFuture: i > todayIndex
            })),
        [data, todayIndex]
    );

    const totalThisWeek = chartData.reduce((sum, d) => sum + d.meetings, 0);
    const peakDay = [...chartData].sort((a, b) => b.meetings - a.meetings)[0];

    const getBarColor = (entry: WeeklyData) => {
        if (entry.isToday) return "#ff6600";
        if (entry.isFuture) return "#93abcb";
        return "#cbd5e1";
    };

    return (
        <div className="space-y-3 bg-white rounded-xl border border-border col-span-2">
            {/* Header */}
            <div className="flex bg--50 overflow-hidden items-center justify-between border-b border-border py-2 px-3">
                <h1 className="font-semibold tracking-tight text-secondary">
                    This Week's Activities
                </h1>
                <p className="font-bold text-secondary leading-tight">
                    {totalThisWeek}
                </p>
            </div>

            {/* Bar Chart */}
            <div className="h-36 p-3">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        barCategoryGap="30%"
                        margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 10,
                                fill: "#94a3b8",
                                fontWeight: 500
                            }}
                        />
                        <YAxis
                            allowDecimals={false}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            width={28}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "transparent" }}
                        />
                        <Bar dataKey="meetings" radius={[40, 40, 40, 40]}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getBarColor(entry)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer legend */}
            <div className="flex items-center justify-between py-2 px-3 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-[10px] text-muted">Today</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-[10px] text-muted">Past</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                        <span className="text-[10px] text-muted">Upcoming</span>
                    </div>
                </div>
                {peakDay && (
                    <span className="text-[10px] text-muted">
                        Peak:{" "}
                        <span className="font-semibold text-secondary">
                            {peakDay.day}
                        </span>
                    </span>
                )}
            </div>
        </div>
    );
}
