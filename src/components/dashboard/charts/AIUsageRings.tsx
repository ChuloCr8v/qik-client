import React from "react";
import ContentCard from "../../ContentCard";
import MetricEmptyState from "../MetricEmptyState";

interface Member {
    name: string;
    used: number;
    limit: number | null; // null = unlimited (admin)
}

interface Props {
    members?: Member[];
}

const DEFAULT_MEMBERS: Member[] = [];

const AVATAR_COLORS = ["#ff6600", "#22c55e", "#6366f1", "#f59e0b", "#93abcb"];

// ─── SVG Ring ─────────────────────────────────────────────────────────────────

function Ring({ used, limit }: { used: number; limit: number | null }) {
    const size = 20;
    const stroke = 3.5;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const pct = limit === null ? 1 : Math.min(used / limit, 1);
    const dash = pct * circ;

    const color =
        limit === null
            ? "#ff6600"
            : pct >= 1
                ? "#ef4444"
                : pct >= 0.8
                    ? "#f59e0b"
                    : "#22c55e";

    return (
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
            {/* Track */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke="#f1f5f9"
                strokeWidth={stroke}
            />
            {/* Fill */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round"
            />
        </svg>
    );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIUsageRings({ members = DEFAULT_MEMBERS }: Props) {
    const totalUsed = members.reduce((sum, m) => sum + m.used, 0);
    const hasData = members.length > 0 && totalUsed > 0;

    return (
        <ContentCard
            title="AI Usage"
            headerRight={totalUsed}
            footer={hasData ? (
                <>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs text-muted">OK</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-xs text-muted">Near limit</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-xs text-muted">At limit</span>
                        </div>
                    </div>
                    <span className="text-xs text-muted">
                        <span className="font-semibold text-secondary">
                            {members.filter(m => m.limit !== null && m.used >= m.limit).length}
                        </span>{" "}
                        at limit
                    </span>
                </>
            ) : undefined}
        >
            {!hasData ? (
                <MetricEmptyState message="No AI usage yet" />
            ) : (
            <div className="h-36 overflow-y-scroll px-3 space-y-2.5 py-1">
                {members.map((m, i) => {
                    const pct =
                        m.limit === null
                            ? null
                            : Math.min(
                                Math.round((m.used / m.limit) * 100),
                                100
                            );
                    const isAtLimit = m.limit !== null && m.used >= m.limit;
                    const isWarning =
                        m.limit !== null &&
                        pct !== null &&
                        pct >= 80 &&
                        !isAtLimit;

                    return (
                        <div key={m.name} className="flex items-center gap-3">
                            {/* Avatar */}
                            <div
                                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                                style={{
                                    background:
                                        AVATAR_COLORS[i % AVATAR_COLORS.length]
                                }}
                            >
                                {m.name[0]}
                            </div>

                            {/* Name + bar */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-semibold text-secondary truncate">
                                        {m.name}
                                    </span>
                                    <span
                                        className={`text-xs font-semibold ml-2 flex-shrink-0 ${isAtLimit
                                            ? "text-red-500"
                                            : isWarning
                                                ? "text-amber-500"
                                                : "text-muted"
                                            }`}
                                    >
                                        {m.limit === null
                                            ? "∞"
                                            : `${m.used}/${m.limit}`}
                                    </span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width:
                                                m.limit === null
                                                    ? "100%"
                                                    : `${pct}%`,
                                            background: isAtLimit
                                                ? "#ef4444"
                                                : isWarning
                                                    ? "#f59e0b"
                                                    : m.limit === null
                                                        ? "#ff6600"
                                                        : "#22c55e"
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Ring */}
                            <div className="flex-shrink-0">
                                <Ring used={m.used} limit={m.limit} />
                            </div>
                        </div>
                    );
                })}
            </div>
            )}
        </ContentCard>
    );
}
