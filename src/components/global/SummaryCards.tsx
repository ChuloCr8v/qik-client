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
        <div
            className={cn(
                "flex items-center justify-between pr-6! gap-2 rounded-lg border border-border bg-white p-3 py-2 transition-all",
                stat.bg
            )}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`flex h-6! w-6! items-center justify-center rounded md;rounded-xl md:h-10 md:w-10 ${stat.iconBg || stat.bg || "bg-slate-100"} ${stat.color || "text-secondary"}`}
                >
                    <stat.icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <p className="text-xs md:text-sm capitalize text-muted">
                    {stat.label}
                </p>
            </div>

            <p className="text-sm font-semibold text-secondary sm:text-lg!">
                {stat.value}
            </p>
        </div>
    );
};

export default SummaryCards;
