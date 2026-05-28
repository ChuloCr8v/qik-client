import React, { ReactNode } from "react";

interface Props {
    bg?: string;
    color?: string;
    label: string;
    value: ReactNode;
}

const SummaryCards = ({ stat }: Props) => {
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-white p-3 shadow-xs transition-all hover:shadow-md sm:p-5">
            <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${stat.bg} ${stat.color}`}
            >
                <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted sm:text-[10px]">
                    {stat.label}
                </p>
                <p className="text-sm font-semibold text-secondary sm:text-2xl">
                    {stat.value}
                </p>
            </div>
        </div>
    );
};

export default SummaryCards;
