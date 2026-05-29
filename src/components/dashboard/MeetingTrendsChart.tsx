import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

interface Props {
    data?: { week: string; meetings: number }[];
}

const DEFAULT_DATA = [
    { week: "Wk 1", meetings: 8 },
    { week: "Wk 2", meetings: 14 },
    { week: "Wk 3", meetings: 10 },
    { week: "Wk 4", meetings: 21 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-md">
            <p className="text-[11px] font-semibold text-secondary">{label}</p>
            <p className="text-[11px] text-muted">
                {payload[0].value} {payload[0].value === 1 ? "meeting" : "meetings"}
            </p>
        </div>
    );
};

export default function MeetingTrendChart({ data = DEFAULT_DATA }: Props) {
    const total = data.reduce((sum, d) => sum + d.meetings, 0);
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    const trend = latest && previous
        ? latest.meetings >= previous.meetings ? "▲ Up" : "▼ Down"
        : null;
    const trendColor = trend?.startsWith("▲") ? "text-green-500" : "text-red-400";

    return (
        <div className="space-y-3 bg-white rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border py-2 px-3">
                <h1 className="font-semibold tracking-tight text-secondary">
                    Last 4 Weeks
                </h1>
                <p className="font-bold text-secondary leading-tight">{total}</p>
            </div>

            <div className="h-36 px-3">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 4, right: 0, left: -28, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="meetingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff6600" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#ff6600" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
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
                            cursor={{ stroke: "#ff6600", strokeWidth: 1, strokeDasharray: "4 4" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="meetings"
                            stroke="#ff6600"
                            strokeWidth={2}
                            fill="url(#meetingGradient)"
                            dot={{ fill: "#ff6600", r: 3, strokeWidth: 0 }}
                            activeDot={{ r: 5, fill: "#ff6600", strokeWidth: 0 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between py-2 px-3 border-t border-border">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] text-muted">Meetings / week</span>
                </div>
                {trend && (
                    <span className={`text-[10px] font-semibold ${trendColor}`}>
                        {trend} this week
                    </span>
                )}
            </div>
        </div>
    );
}
