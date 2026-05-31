import React from "react";
import { FilePlus2, UserPlus, FileBarChart2 } from "lucide-react";
import NewMeetingCard from "./NewMeetingCard";
import { usePopup } from "../../context/PopupContext";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetBillingUsageQuery } from "../../features/billing/billingApi";
import { hasTeamEntitlement } from "../../lib/entitlements";

interface ActionItem {
    title: string;
    icon: React.ElementType;
    textColor: string;
    bgColor: string;
    iconBg: string;
    onOk: () => void;
}

const DashboardQuickActions = () => {
    const { openModal } = usePopup();
    const navigate = useNavigate();
    const { data: usage } = useGetBillingUsageQuery();
    const teamEnabled = hasTeamEntitlement(usage, usage?.plan);

    const scrollToReports = () => {
        document
            .getElementById("dashboard-reports")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const actions: ActionItem[] = [
        {
            title: "New Agenda",
            icon: FilePlus2,
            onOk: () => openModal(<NewMeetingCard />),
            textColor: "text-primary",
            bgColor: "hover:bg-primary/10",
            iconBg: "bg-primary/10 text-primary"
        },
        ...(teamEnabled ? [{
            title: "Add Team",
            icon: UserPlus,
            onOk: () => navigate("/team"),
            textColor: "text-blue-600",
            bgColor: "hover:bg-blue-600/10",
            iconBg: "bg-blue-600/10 text-blue-600"
        }] : []),
        {
            title: "Report",
            icon: FileBarChart2,
            onOk: scrollToReports,
            textColor: "text-violet-600",
            bgColor: "hover:bg-violet-600/10",
            iconBg: "bg-violet-600/10 text-violet-600"
        }
    ];

    return (
        <div className={`grid ${teamEnabled ? "grid-cols-3" : "grid-cols-2"}`}>
            {actions.map((s, i) => {
                const Icon = s.icon;
                return (
                    <Button
                        key={s.title}
                        onClick={s.onOk}
                        className={`hover:bg-gray-50 h-10! md:px-5! border-0! border-l! overflow-hidden flex items-center justify-start! gap-2 transition-colors rounded-none! ${i === 0 && "border-l-0!"} ${s.bgColor}!`}
                    >
                        <div
                            className={`inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-md flex-shrink-0 ${s.iconBg}`}
                        >
                            <Icon className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className={`text-xs! md:text-sm!`}>{s.title}</span>
                    </Button>
                );
            })}
        </div>
    );
};

export default DashboardQuickActions;
