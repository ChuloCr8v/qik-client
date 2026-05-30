import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ContentCard from "../ContentCard";
import MetricEmptyState from "./MetricEmptyState";

interface StatusData {
    label: string;
    value: number;
    color: string;
}

interface Props {
    completed?: number;
    scheduled?: number;
    draft?: number;
    cancelled?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-lg border border-border bg-white px-3 py-2 shadow-md">
            <p className="text-xs font-semibold text-secondary">{payload[0].name}</p>
            <p className="text-xs text-muted">
                {payload[0].value} {payload[0].value === 1 ? "meeting" : "meetings"}
            </p>
        </div>
    );
};

export default function MeetingStatusChart({
    completed = 0,
    scheduled = 0,
    draft = 0,
    cancelled = 0
}: Props) {
    const data: StatusData[] = useMemo(
        () => [
            { label: "Completed", value: completed, color: "#22c55e" },
            { label: "Scheduled", value: scheduled, color: "#ff6600" },
            { label: "Draft", value: draft, color: "#93abcb" },
            { label: "Cancelled", value: cancelled, color: "#cbd5e1" }
        ],
        [completed, scheduled, draft, cancelled]
    );

    const total = data.reduce((sum, d) => sum + d.value, 0);
    const hasData = total > 0;

    return (
        <ContentCard
            title="Meeting Status"
            footer={hasData ? (
                <div className="flex flex-wrap items-center gap-3">
                    {data.map(d => (
                        <div key={d.label} className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                            <span className="text-xs text-muted">{d.label}</span>
                        </div>
                    ))}
                </div>
            ) : undefined}
        >
            {!hasData ? (
                <MetricEmptyState message="No meeting status data" />
            ) : (
            <div className="h-36 px-3">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={42}
                            outerRadius={62}
                            paddingAngle={3}
                            dataKey="value"
                            nameKey="label"
                            startAngle={90}
                            endAngle={-270}
                            cornerRadius={10}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <text
                            x="50%"
                            y="46%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: 22, fontWeight: 700, fill: "#0f172a" }}
                        >
                            {total}
                        </text>
                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
                        >
                            total
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            )}
        </ContentCard>
    );
}
