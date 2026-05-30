import { Button, Tag } from "antd";
import { useState } from "react";
import type { ElementType } from "react";
import {
    Building,
    Building2,
    Check,
    CreditCard,
    Loader2,
    Mail,
    MailIcon,
    RefreshCw,
    Shield,
    Star,
    Zap
} from "lucide-react";
import toast from "react-hot-toast";
import CustomModal from "./CustomModal";
import { usePopup } from "../context/PopupContext";
import {
    useCancelSubscriptionMutation,
    useChangePlanMutation,
    useCreatePortalSessionMutation,
    useGetBillingUsageQuery,
    useResumeSubscriptionMutation
} from "../features/billing/billingApi";
import { PLAN_LIMITS, type PlanName } from "../config/plans";
import { cn } from "../lib/utils";

type PaidPlanName = Exclude<PlanName, "Free">;

const PLANS: Array<{
    name: PlanName;
    label: string;
    price: string;
    period: string;
    description: string;
    icon: ElementType;
    color: string;
    bgColor: string;
    popular?: boolean;
    accent: "primary" | "amber" | "violet" | "slate";
}> = [
        {
            name: "Free",
            label: "Free",
            price: "$0",
            period: "",
            description: "For one-off meetings and light AI usage.",
            icon: Star,
            color: "text-slate-500",
            bgColor: "bg-slate-100",
            accent: "slate"
        },
        {
            name: "Individual",
            label: "Individual",
            price: "$20",
            period: "/mo",
            description: "For solo users who need more AI without a team plan.",
            icon: Zap,
            color: "text-primary",
            bgColor: "bg-primary/10",
            accent: "primary"
        },
        {
            name: "Organisation",
            label: "Organisation",
            price: "$69",
            period: "/mo",
            description: "For small teams with shared agendas, tasks, and decisions.",
            icon: Building2,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
            popular: true,
            accent: "amber"
        },
        {
            name: "OrganisationPlus",
            label: "Organisation Plus",
            price: "$99",
            period: "/mo",
            description: "For growing teams that need more seats and admin AI power.",
            icon: Building,
            color: "text-violet-600",
            bgColor: "bg-violet-50",
            accent: "violet"
        }
    ];

const rank: Record<PlanName, number> = {
    Free: 0,
    Individual: 1,
    Organisation: 2,
    OrganisationPlus: 3
};

const accentStyles = {
    primary: {
        card: "border-primary/30 bg-primary/5",
        button: "bg-primary hover:bg-primary/90",
        ring: "ring-primary/20",
        surface: "bg-primary/10 text-primary"
    },
    amber: {
        card: "border-amber-200 bg-amber-50/40",
        button: "bg-amber-500 hover:bg-amber-600",
        ring: "ring-amber-200",
        surface: "bg-amber-50 text-amber-600"
    },
    violet: {
        card: "border-violet-200 bg-violet-50/40",
        button: "bg-violet-500 hover:bg-violet-600",
        ring: "ring-violet-200",
        surface: "bg-violet-50 text-violet-600"
    },
    slate: {
        card: "border-border bg-white",
        button: "bg-secondary hover:bg-slate-800",
        ring: "ring-slate-100",
        surface: "bg-slate-100 text-slate-500"
    }
};

const formatDate = (value?: string | null) => {
    if (!value) return null;
    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date(value));
};

export default function PricingModal() {
    const [activeAction, setActiveAction] = useState<PlanName | "portal" | null>(null);
    const { closeModal } = usePopup();
    const { data: usage } = useGetBillingUsageQuery();
    const [changePlan] = useChangePlanMutation();
    const [cancelSubscription] = useCancelSubscriptionMutation();
    const [resumeSubscription] = useResumeSubscriptionMutation();
    const [createPortalSession] = useCreatePortalSessionMutation();

    const currentPlan = usage?.plan || "Free";
    const hasPaidPlan = currentPlan !== "Free";

    const handlePlanAction = async (planName: PlanName) => {
        if (planName === "Free") return;
        setActiveAction(planName);
        try {
            const result = await changePlan({ planType: planName as PaidPlanName }).unwrap();
            if (result.url) {
                window.location.href = result.url;
                return;
            }
            if (result.status === "upgraded") {
                toast.success("Plan upgraded. Stripe will apply prorations automatically.");
            } else if (result.status === "downgrade_scheduled") {
                toast.success(`Downgrade scheduled${formatDate(result.effectiveAt) ? ` for ${formatDate(result.effectiveAt)}` : ""}.`);
            } else {
                toast.success("Plan is already up to date.");
            }
        } catch (error) {
            console.error(error);
            toast.error((error as any)?.data?.message || "Unable to update subscription.");
        } finally {
            setActiveAction(null);
        }
    };

    const handleCancel = async () => {
        setActiveAction("Free");
        try {
            const result = await cancelSubscription().unwrap();
            toast.success(`Cancellation scheduled${formatDate(result.effectiveAt) ? ` for ${formatDate(result.effectiveAt)}` : ""}.`);
        } catch (error) {
            console.error(error);
            toast.error((error as any)?.data?.message || "Unable to schedule cancellation.");
        } finally {
            setActiveAction(null);
        }
    };

    const handleResume = async () => {
        setActiveAction(currentPlan);
        try {
            const result = await resumeSubscription().unwrap();
            toast.success(`Renewal resumed${formatDate(result.renewsAt) ? ` through ${formatDate(result.renewsAt)}` : ""}.`);
        } catch (error) {
            console.error(error);
            toast.error((error as any)?.data?.message || "Unable to resume renewal.");
        } finally {
            setActiveAction(null);
        }
    };

    const handlePortal = async () => {
        setActiveAction("portal");
        try {
            const result = await createPortalSession().unwrap();
            window.location.href = result.url;
        } catch (error) {
            console.error(error);
            toast.error((error as any)?.data?.message || "Unable to open billing portal.");
            setActiveAction(null);
        }
    };

    const getButtonText = (planName: PlanName, isCurrent: boolean) => {
        if (planName === "Free") return hasPaidPlan ? "Cancel paid plan" : "Current Plan";
        if (isCurrent && usage?.cancelAtPeriodEnd) return "Resume renewal";
        if (isCurrent) return "Current Plan";
        if (rank[planName] > rank[currentPlan]) return currentPlan === "Free" ? `Start ${planName}` : `Upgrade to ${planName}`;
        return `Downgrade to ${planName}`;
    };

    return (
        <CustomModal
            title="Choose your plan"
            modalSubtitle="Start solo, move to a team plan when you need permanent members."
            icon={<Shield className="h-5 w-5" />}
            width={920}
            hideFooter={false}
            maxHeight
            footer={<div className="grid gap-4 rounded-2xl md:border md:border-secondary/10 md:bg-secondary md:p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
                <div className="hidden md:flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="md:text-base font-bold">Custom / Enterprise</h3>
                        <p className="mt-1 text-xs md:text-sm text-white/65">
                            Need custom seats, usage, onboarding, procurement, or support?
                        </p>
                    </div>
                </div>
                <Button
                    icon={<MailIcon size={16} />}
                    href="mailto:sales@qikagenda.com?subject=QikAgenda%20custom%20plan"
                    className="max-md:bg-secondary! max-md:text-white! h-10! rounded-xl! border-none! px-5! font-bold! uppercase!"
                >
                    Contact Sales
                </Button>
            </div>}
        >
            <div className="space-y-4">
                {/* <div className="flex flex-col gap-3 rounded-2xl border border-border bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold text-secondary">Current plan: {currentPlan === "OrganisationPlus" ? "Organisation Plus" : currentPlan}</p>
                        <p className="mt-1! text-xs text-muted">
                            Paid plans are billed monthly through Stripe. Upgrades apply immediately; downgrades and cancellations take effect at renewal.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {hasPaidPlan && (
                            <Button
                                onClick={handlePortal}
                                disabled={activeAction !== null}
                                icon={activeAction === "portal" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                            >
                                Manage billing
                            </Button>
                        )}
                        <Button danger type="text" variant='ghost' onClick={closeModal}>X</Button>
                    </div>
                </div> */}

                <div className="-mx-6 overflow-x-auto px-6 pb-2">
                    <div className="flex min-w-max gap-4">
                        {PLANS.map(plan => {
                            const limits = PLAN_LIMITS[plan.name];
                            const isProcessing = activeAction === plan.name;
                            const isCurrent = currentPlan === plan.name;
                            const isDisabled =
                                activeAction !== null ||
                                (!hasPaidPlan && plan.name === "Free") ||
                                (isCurrent && !usage?.cancelAtPeriodEnd);
                            const pendingDate = formatDate(usage?.pendingChangeEffectiveAt);
                            const renewsAt = formatDate(usage?.renewsAt);
                            const styles = accentStyles[plan.accent];

                            return (
                                <article
                                    key={plan.name}
                                    className={cn(
                                        "relative flex w-[280px] shrink-0 flex-col rounded-2xl border p-4 pt-6 transition-all hover:scale-95",
                                        styles.card,
                                        // isCurrent && `ring-2 ${styles.ring}`
                                    )}
                                >

                                    <div className="flex flex-wrap justify-end gap-1.5 absolute left-1/3 top-0">
                                        {plan.popular && <Tag className="border! border-orange-200! rounded-t-none! border-t-0! p-2" color="gold">Best for teams</Tag>}
                                        {/* {isCurrent && <Tag color="green">Current</Tag>} */}
                                    </div>

                                    {(isCurrent && usage?.cancelAtPeriodEnd) && (
                                        <div className="mb-3 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                                            Cancels {pendingDate || "at period end"}
                                        </div>
                                    )}

                                    {usage?.pendingPlanType === plan.name && !isCurrent && (
                                        <div className="mb-3 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
                                            Scheduled for {pendingDate || "renewal"}
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-base font-bold text-secondary">{plan.label}</h3>
                                        <div className="mt-2 flex items-end gap-1">
                                            <div className="flex flex-col items-start gap-2 w-full">
                                                <p className="text-4xl font-bold text-secondary">{plan.price} <span className="text-sm text-muted">{plan.period}</span></p>
                                                <Button
                                                    type={isDisabled ? "default" : "primary"}
                                                    disabled={isDisabled}
                                                    block
                                                    className={cn(
                                                        "w-full! h-8! rounded-md!",
                                                        !isDisabled && `${styles.button} border-none!`
                                                    )}
                                                    onClick={() => {
                                                        if (plan.name === "Free") {
                                                            handleCancel();
                                                            return;
                                                        }
                                                        if (isCurrent && usage?.cancelAtPeriodEnd) {
                                                            handleResume();
                                                            return;
                                                        }
                                                        handlePlanAction(plan.name);
                                                    }}
                                                >
                                                    <span className="inline-flex items-center justify-center gap-2">
                                                        {isProcessing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                                        {isCurrent && usage?.cancelAtPeriodEnd && !isProcessing && <RefreshCw className="h-3.5 w-3.5" />}
                                                        {getButtonText(plan.name, isCurrent)}
                                                    </span>
                                                </Button>
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" border-t border-border mt-5 pt-4">
                                        <p className="mt-3 text-xs leading-relaxed text-gray-600">{plan.description}</p>
                                        <div className="flex-1 space-y-2.5 mt-4">
                                            {limits.features.map(feature => (
                                                <div key={feature} className="flex items-start gap-2.5">
                                                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                        <Check className="h-2.5 w-2.5 text-primary" />
                                                    </div>
                                                    <span className="text-xs leading-snug text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    {isCurrent && renewsAt && !usage?.cancelAtPeriodEnd && (
                                        <p className="mt-3 text-center text-xs text-muted">Renews {renewsAt}</p>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>


            </div>
        </CustomModal>
    );
}
