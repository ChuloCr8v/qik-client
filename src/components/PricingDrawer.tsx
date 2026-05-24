import React, { useState } from "react";
import Drawer from "./Drawer";
import {
    Check,
    Zap,
    Shield,
    Star,
    Building2,
    Building,
    Loader2
} from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateCurrentUserMutation } from "../features/users/usersApi";
import { PLAN_LIMITS, PlanName } from "../lib/quota";

interface PricingDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const PLANS = [
    {
        name: "Free" as PlanName,
        price: "$0",
        period: "",
        description: "For individuals running one-off meetings",
        icon: Star,
        color: "text-slate-400",
        bgColor: "bg-slate-50",
        buttonText: "Current Plan",
        disabled: true,
        accent: null
    },
    {
        name: "Organisation" as PlanName,
        price: "$49",
        period: "/mo",
        description:
            "For teams who need AI, tasks, and decisions — admin pays, team benefits",
        icon: Building2,
        color: "text-amber-500",
        bgColor: "bg-amber-50",
        buttonText: "Upgrade to Organisation",
        popular: true,
        accent: "amber"
    },
    {
        name: "OrganisationPlus" as PlanName,
        price: "$99",
        period: "/mo",
        description: "For larger teams who need more members and more AI power",
        icon: Building,
        color: "text-violet-500",
        bgColor: "bg-violet-50",
        buttonText: "Upgrade to Organisation Plus",
        accent: "violet"
    }
];

const accentStyles: Record<
    string,
    { button: string; ring: string; badge: string }
> = {
    amber: {
        button: "bg-amber-500 text-white shadow-amber-200 hover:bg-amber-600",
        ring: "border-amber-200 bg-amber-50/20 ring-1 ring-amber-100",
        badge: "bg-amber-500"
    },
    violet: {
        button: "bg-violet-500 text-white shadow-violet-200 hover:bg-violet-600",
        ring: "border-violet-200 bg-violet-50/10 ring-1 ring-violet-100",
        badge: "bg-violet-500"
    }
};

export default function PricingDrawer({ isOpen, onClose }: PricingDrawerProps) {
    const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);
    const [updateUser] = useUpdateCurrentUserMutation();

    const handleUpgrade = async (planName: string) => {
        setUpgradingPlan(planName);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await updateUser({
                plan: planName as any,
                subscriptionStatus: "active",
                subscriptionDate: new Date().toISOString() as any
            }).unwrap();
            toast.success(`Successfully upgraded to ${planName}!`);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to process upgrade.");
        } finally {
            setUpgradingPlan(null);
        }
    };

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title="Choose Your Plan"
            icon={<Shield className="h-5 w-5 text-emerald-500" />}
            footer={
                <div className="flex flex-row justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-xs font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-xs font-semibold text-white bg-secondary hover:bg-slate-800 rounded-xl transition-all shadow-sm shadow-slate-200"
                    >
                        View Billing
                    </button>
                </div>
            }
        >
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-sm font-bold text-secondary">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-[11px] text-muted leading-relaxed">
                        Only the admin pays. Your whole team benefits.
                    </p>
                </div>

                <div className="space-y-4">
                    {PLANS.map(plan => {
                        const limits = PLAN_LIMITS[plan.name];
                        const accent = plan.accent
                            ? accentStyles[plan.accent]
                            : null;
                        const isUpgrading = upgradingPlan === plan.name;

                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-3xl border p-5 transition-all hover:shadow-md ${
                                    accent
                                        ? accent.ring
                                        : "border-border bg-white"
                                }`}
                            >
                                {plan.popular && (
                                    <div
                                        className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[9px] font-bold text-white uppercase tracking-widest shadow-sm ${accent?.badge}`}
                                    >
                                        Most Popular
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-3">
                                    <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-2xl ${plan.bgColor}`}
                                    >
                                        <plan.icon
                                            className={`h-4 w-4 ${plan.color}`}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-secondary">
                                            {plan.name === "OrganisationPlus"
                                                ? "Organisation Plus"
                                                : plan.name}
                                        </h3>
                                        <div className="flex items-baseline gap-0.5">
                                            <span className="text-base font-bold text-secondary">
                                                {plan.price}
                                            </span>
                                            {plan.period && (
                                                <span className="text-[10px] text-muted">
                                                    {plan.period}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[10px] text-muted mb-4 leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="space-y-2.5 mb-6">
                                    {limits.features.map(feature => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-2.5"
                                        >
                                            <div className="mt-0.5 rounded-full bg-emerald-50 p-0.5 shrink-0">
                                                <Check className="h-2.5 w-2.5 text-emerald-600" />
                                            </div>
                                            <span className="text-[11px] text-secondary font-medium leading-snug">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    disabled={
                                        plan.disabled || upgradingPlan !== null
                                    }
                                    onClick={() =>
                                        !plan.disabled &&
                                        handleUpgrade(plan.name)
                                    }
                                    className={`w-full rounded-2xl py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 ${
                                        plan.disabled
                                            ? "bg-slate-100 text-muted cursor-not-allowed"
                                            : accent
                                              ? accent.button
                                              : "bg-secondary text-white hover:bg-slate-800 shadow-slate-200"
                                    }`}
                                >
                                    {isUpgrading && (
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                    )}
                                    {plan.buttonText}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-[10px] text-muted leading-relaxed">
                    All paid plans include a 7-day money-back guarantee.
                </p>
            </div>
        </Drawer>
    );
}
