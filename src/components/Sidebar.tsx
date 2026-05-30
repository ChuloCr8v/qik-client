import {
    LayoutDashboard,
    Settings,
    Calendar,
    Users,
    Layout,
    HelpCircle,
    Menu,
    X,
    CreditCard,
    Zap
} from "lucide-react";
import { cn } from "../lib/utils";
import PricingModal from "./PricingModal";
import { PLAN_LIMITS, getUsageStatus, type PlanName } from "../lib/quota";
import { useAuth } from "../features/auth/AuthProvider";
import { useGetCurrentUserQuery } from "../features/users/usersApi";
import { useGetBillingUsageQuery } from "../features/billing/billingApi";
import { usePopup } from "../context/PopupContext";
import { Button } from "antd";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    activePath?: string;
    onNavigate: (path: string) => void;
}

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Meetings", icon: Calendar, path: "/meetings" },
    { name: "Templates", icon: Layout, path: "/templates" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Settings", icon: Settings, path: "/settings" }
];

export default function Sidebar({
    isOpen,
    onClose,
    activePath = "/",
    onNavigate
}: SidebarProps) {
    const { openModal } = usePopup();
    const { user } = useAuth();
    const { data: profile = null } = useGetCurrentUserQuery(undefined, {
        skip: !user
    });
    const { data: usage } = useGetBillingUsageQuery(undefined, {
        skip: !user
    });

    const planName = (profile?.plan || "Free") as PlanName;
    const aiLimit = usage?.aiGenerationsLimit ?? PLAN_LIMITS[planName]?.aiGenerations ?? 0;
    const { percentage, label } = getUsageStatus(usage?.aiGenerationsUsed || 0, aiLimit);

    const handleNavigate = (path: string) => {
        onNavigate(path);
        onClose();
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transition-transform duration-300 lg:static lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="flex py-3.5 items-center px-6 border-b border-border">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-base font-semibold tracking-tight text-secondary">
                                QikAgenda
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 px-4 py-4 space-y-6">
                        <nav className="space-y-1">
                            {navItems.map(item => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigate(item.path)}
                                    className={cn(
                                        "flex w-full  border-none! h-full! items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                                        activePath === item.path
                                            ? "bg-primary/5 text-primary"
                                            : "text-muted hover:bg-slate-50 hover:text-secondary"
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            "h-4 w-4 transition-colors",
                                            activePath === item.path
                                                ? "text-primary"
                                                : "text-muted group-hover:text-secondary"
                                        )}
                                    />
                                    {item.name}
                                </button>
                            ))}
                        </nav>

                        <div className="pt-4 border-t border-border">
                            <h4 className="px-3 mb-4 text-sm font-semibold uppercase  text-muted">
                                Support
                            </h4>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-muted hover:bg-slate-50 hover:text-secondary transition-all"
                            >
                                <HelpCircle className="h-4 w-4" />
                                Documentation
                            </a>
                        </div>
                    </div>

                    <div className="p-4 border-t border-border">
                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-muted uppercase">
                                    Plan
                                </p>
                                <p className="text-sm text-primary">
                                    {planName}
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-sm font-semibold">
                                        <span className="text-secondary">
                                            AI generations
                                        </span>
                                        <span className="text-muted">
                                            {label}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-500",
                                                percentage > 80
                                                    ? "bg-amber-500"
                                                    : "bg-primary"
                                            )}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>

                                {planName === "Free" && (
                                    <Button
                                        type="primary"
                                        block
                                        onClick={() => openModal(<PricingModal />)}
                                        className="mt-2! bg-black! hover:bg-black/70!"
                                    >
                                        <CreditCard className="h-5 w-5" />
                                        Upgrade
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

        </>
    );
}
