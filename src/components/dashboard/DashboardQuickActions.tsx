import React, { Dispatch, SetStateAction } from "react";
import { FilePlus2, UserPlus, FileBarChart2 } from "lucide-react";

interface Props {
    setOpenNewMeetingCard: Dispatch<SetStateAction<boolean>>;
    openNewMeetingCard: boolean;
}

interface ActionItem {
    title: string;
    icon: React.ElementType;
    onOk: () => void;
    textColor: string;
    bgColor: string;
    iconBg: string;
}

const DashboardQuickActions = (props: Props) => {
    const actions: ActionItem[] = [
        {
            title: "New Agenda",
            icon: FilePlus2,
            onOk: () => props.setOpenNewMeetingCard(true),
            textColor: "text-primary",
            bgColor: "bg-primary/5 border-primary/10 hover:bg-primary/10",
            iconBg: "bg-primary/10 text-primary"
        },
        {
            title: "Add Team",
            icon: UserPlus,
            onOk: () => {},
            textColor: "text-blue-600",
            bgColor: "bg-blue-600/5 border-blue-600/10 hover:bg-blue-600/10",
            iconBg: "bg-blue-600/10 text-blue-600"
        },
        {
            title: "Report",
            icon: FileBarChart2,
            onOk: () => {},
            textColor: "text-violet-600",
            bgColor:
                "bg-violet-600/5 border-violet-600/10 hover:bg-violet-600/10",
            iconBg: "bg-violet-600/10 text-violet-600"
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {actions.map(s => {
                const Icon = s.icon;
                return (
                    <button
                        key={s.title}
                        onClick={s.onOk}
                        className={`border px-5! rounded-xl! overflow-hidden flex items-center gap-2 transition-colors ${s.bgColor} bg-white!`}
                    >
                        <div
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-md flex-shrink-0 ${s.iconBg}`}
                        >
                            <Icon className="w-2.5 h-2.5" />
                        </div>
                        <span className={`text-xs ${s.textColor}`}>
                            {s.title}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default DashboardQuickActions;
