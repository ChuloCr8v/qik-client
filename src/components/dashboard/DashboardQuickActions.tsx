import React, { Dispatch, SetStateAction, useState } from "react";
import { FilePlus2, UserPlus, FileBarChart2 } from "lucide-react";
import NewMeetingCard from "./NewMeetingCard";

interface ActionItem {
    title: string;
    icon: React.ElementType;
    textColor: string;
    bgColor: string;
    iconBg: string;
}

const DashboardQuickActions = () => {
    const [openNewMeetingCard, setOpenNewMeetingCard] = useState(false);

    const actions: ActionItem[] = [
        {
            title: "New Agenda",
            icon: FilePlus2,
            onOk: () => setOpenNewMeetingCard(true),
            textColor: "text-primary",
            bgColor: "hover:bg-primary/10",
            iconBg: "bg-primary/10 text-primary"
        },
        {
            title: "Add Team",
            icon: UserPlus,
            onOk: () => {},
            textColor: "text-blue-600",
            bgColor: "hover:bg-blue-600/10",
            iconBg: "bg-blue-600/10 text-blue-600"
        },
        {
            title: "Report",
            icon: FileBarChart2,
            onOk: () => {},
            textColor: "text-violet-600",
            bgColor: "hover:bg-violet-600/10",
            iconBg: "bg-violet-600/10 text-violet-600"
        }
    ];

    return (
        <div className="grid grid-cols-3">
            {actions.map((s, i) => {
                const Icon = s.icon;
                return (
                    <button
                        key={s.title}
                        onClick={s.onOk}
                        className={`h-10! md:px-5! border-0! border-l! overflow-hidden flex items-center gap-2 transition-colors rounded-none! ${i === 0 && "border-l-0!"} ${s.bgColor}!`}
                    >
                        <div
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-md flex-shrink-0 ${s.iconBg}`}
                        >
                            <Icon className="w-3 h-3" />
                        </div>
                        <span className={`text-xs`}>{s.title}</span>
                    </button>
                );
            })}

            {openNewMeetingCard && (
                <NewMeetingCard
                    isOpen={openNewMeetingCard}
                    onClose={() => {
                        setOpenNewMeetingCard(false);
                    }}
                   
                />
            )}
        </div>
    );
};

export default DashboardQuickActions;
