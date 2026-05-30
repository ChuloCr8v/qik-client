import React, { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Props {
    key?: React.Key;
    stat: {
        bg?: string;
        color?: string;
        iconBg?: string;
        icon: LucideIcon;
        label: string;
        value: ReactNode;
    };
}

const SummaryCards = ({ stat }: Props) => {
    return (
        <div className={cn("flex items-center justify-between pr-6! gap-2 rounded-2xl border border-border bg-white p-3 py-2 transition-all hover:shadow-md", stat.bg)}>
            <div className="flex items-center gap-2">
                <div
                    className={`flex h-9! w-9! items-center justify-center rounded-xl sm:h-10 sm:w-10 ${stat.iconBg || stat.bg || "bg-slate-100"} ${stat.color || "text-secondary"}`}
                >
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <p className="text-sm capitalize text-muted">
                    {stat.label}
                </p>
            </div>

            <p className="text-sm font-semibold text-secondary sm:text-xl">
                {stat.value}
            </p>
        </div>
    );
};

export default SummaryCards;
