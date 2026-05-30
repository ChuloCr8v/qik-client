import { Button } from "antd";
import { CreditCard, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { usePopup } from "../../context/PopupContext";
import PricingModal from "../PricingModal";
import UsageStatsDrawer from "./UsageStatsDrawer";

export default function QuickActionsPanel() {
  const { openDrawer, openModal } = usePopup();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <QuickAction
        icon={<TrendingUp className="h-5 w-5" />}
        title="View Usage Stats"
        subtitle="Plan usage and activity"
        actionText="Open stats"
        variant="amber"
        onClick={() => openDrawer(<UsageStatsDrawer />)}
      />
      <QuickAction
        icon={<CreditCard className="h-5 w-5" />}
        title="Manage Subscription"
        subtitle="Plans, billing, and renewal"
        actionText="Manage plan"
        onClick={() => openModal(<PricingModal />)}
      />
    </div>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
  actionText,
  variant,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  actionText: string;
  variant?: "amber";
  onClick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${variant === "amber" ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"
            }`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-secondary">{title}</h4>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      <Button
        type={variant === "amber" ? "primary" : "default"}
        block
        onClick={onClick}
        className="mt-3!"
      >
        {actionText}
      </Button>
    </div>
  );
}
