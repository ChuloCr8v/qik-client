import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatusData {
    label: string;
    value: number;
    color: string;
    dotClass: string;
}

interface Props {
    completed?: number;
    scheduled?: number;
    draft?: number;
    cancelled?: number;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-md">
            <p className="text-[11px] font-semibold text-secondary">
                {payload[0].name}
            </p>
            <p className="text-[11px] text-muted">
                {payload[0].value}{" "}
                {payload[0].value === 1 ? "meeting" : "meetings"}
            </p>
        </div>
    );
};

// ─── Center Label ─────────────────────────────────────────────────────────────

const CenterLabel = ({
    cx,
    cy,
    total
}: {
    cx: number;
    cy: number;
    total: number;
}) => (
    <>
        <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 22, fontWeight: 700, fill: "#0f172a" }}
        >
            {total}
        </text>
        <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
        >
            total
        </text>
    </>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function MeetingStatusChart({
    completed = 18,
    scheduled = 12,
    draft = 6,
    cancelled = 3
}: Props) {
    const data: StatusData[] = useMemo(
        () => [
            {
                label: "Completed",
                value: completed,
                color: "#22c55e",
                dotClass: "bg-green-500"
            },
            {
                label: "Scheduled",
                value: scheduled,
                color: "#ff6600",
                dotClass: "bg-primary"
            },
            {
                label: "Draft",
                value: draft,
                color: "#93abcb",
                dotClass: "bg-slate-400"
            },
            {
                label: "Cancelled",
                value: cancelled,
                color: "#cbd5e1",
                dotClass: "bg-slate-300"
            }
        ],
        [completed, scheduled, draft, cancelled]
    );

    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="space-y-3 bg-white rounded-xl border border-border">
            {/* Header — matches ScheduleChart exactly */}
            <div className="flex items-center justify-between border-b border-border py-2 px-3">
                <h1 className="font-semibold tracking-tight text-secondary">
                    Meeting Status
                </h1>
            </div>

            {/* Donut chart */}
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
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                    stroke="none"
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        {/* Center text via custom label */}
                        <text
                            x="50%"
                            y="46%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 22,
                                fontWeight: 700,
                                fill: "#0f172a"
                            }}
                        >
                            {total}
                        </text>
                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 10,
                                fill: "#94a3b8",
                                fontWeight: 500
                            }}
                        >
                            total
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Footer legend — matches ScheduleChart footer exactly */}
            <div className="flex items-center justify-between py-2 px-3 border-t border-border">
                <div className="flex items-center gap-3 flex-wrap">
                    {data.map(d => (
                        <div
                            key={d.label}
                            className="flex items-center gap-1.5"
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ background: d.color }}
                            />
                            <span className="text-[10px] text-muted">
                                {d.label}
                            </span>
                        </div>
                    ))}
                </div>
                {/** <span className="text-[10px] text-muted">
                    Top:{" "}
                    <span className="font-semibold text-secondary">
                        {[...data].sort((a, b) => b.value - a.value)[0].label}
                    </span>
                </span> **/}
            </div>
        </div>
    );
}
