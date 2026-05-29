import React, { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface Props {
    completed?: number;
    skipped?: number;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-border rounded-lg px-3 py-2 shadow-md">
            <p className="text-[11px] font-semibold text-secondary">{payload[0].name}</p>
            <p className="text-[11px] text-muted">
                {payload[0].value} {payload[0].value === 1 ? "item" : "items"}
            </p>
        </div>
    );
};

export default function AgendaQualityChart({
    completed = 74,
    skipped = 18
}: Props) {
    const total = completed + skipped;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const data = useMemo(() => [
        { name: "Completed", value: completed, color: "#22c55e" },
        { name: "Skipped",   value: skipped,   color: "#cbd5e1" }
    ], [completed, skipped]);

    return (
        <div className="space-y-3 bg-white rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border py-2 px-3">
                <h1 className="font-semibold tracking-tight text-secondary">
                    Agenda Quality
                </h1>
                <p className="font-bold text-secondary leading-tight">{rate}%</p>
            </div>

            <div className="h-36 px-3">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={42}
                            outerRadius={62}
                            paddingAngle={4}
                            cornerRadius={10}
                            dataKey="value"
                            nameKey="name"
                            startAngle={90}
                            endAngle={-270}
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
                            {rate}%
                        </text>
                        <text
                            x="50%"
                            y="60%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
                        >
                            done
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between py-2 px-3 border-t border-border">
                <div className="flex items-center gap-3">
                    {data.map(d => (
                        <div key={d.name} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                            <span className="text-[10px] text-muted">{d.name}</span>
                        </div>
                    ))}
                </div>
                <span className="text-[10px] text-muted">
                    Total: <span className="font-semibold text-secondary">{total} items</span>
                </span>
            </div>
        </div>
    );
}
