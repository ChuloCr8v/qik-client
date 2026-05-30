import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import ContentCard from "../../ContentCard";
import MetricEmptyState from "../MetricEmptyState";

interface Props {
    data?: { type: string; count: number }[];
}

const DEFAULT_DATA: { type: string; count: number }[] = [];

const COLORS = ["#ff6600", "#93abcb", "#cbd5e1"];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-md">
            <p className="text-xs font-semibold text-secondary">{label}</p>
            <p className="text-xs text-muted">
                {payload[0].value} {payload[0].value === 1 ? "meeting" : "meetings"}
            </p>
        </div>
    );
};

export default function MeetingTypesChart({ data = DEFAULT_DATA }: Props) {
    const total = data.reduce((sum, d) => sum + d.count, 0);
    const top = [...data].sort((a, b) => b.count - a.count)[0];
    const hasData = data.length > 0 && total > 0;

    return (
        <ContentCard
            title="Top Meeting Types"
            headerRight={total}
            footer={hasData ? (
                <>
                    <div className="flex items-center gap-3">
                        {data.map((d, i) => (
                            <div key={d.type} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                                <span className="text-xs text-muted">{d.type}</span>
                            </div>
                        ))}
                    </div>
                    {top && (
                        <span className="text-xs text-muted">
                            Top: <span className="font-semibold text-secondary">{top.type}</span>
                        </span>
                    )}
                </>
            ) : undefined}
        >
            {!hasData ? (
                <MetricEmptyState message="No meeting type data" />
            ) : (
            <div className="h-36 px-3">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
                        barCategoryGap="25%"
                    >
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                            allowDecimals={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="type"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
                            width={52}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: "transparent" }}
                        />
                        <Bar dataKey="count" radius={[0, 40, 40, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            )}
        </ContentCard>
    );
}
