import { CreditCard, Lock } from "lucide-react";
import CustomModal from "../CustomModal";
import PricingModal from "../PricingModal";
import type { PlanName } from "../../config/plans";
import { usePopup } from "../../context/PopupContext";

interface UpgradePromptProps {
    isOpen: boolean;
    onClose: () => void;
    currentPlan: PlanName;
    missingFeature: string;
}

export default function UpgradePrompt({
    isOpen,
    onClose,
    currentPlan,
    missingFeature
}: UpgradePromptProps) {
    const { openModal } = usePopup();

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            icon={<Lock className="h-5 w-5 text-primary" />}
            title="Upgrade required"
            onOk={() => {
                onClose();
                openModal(<PricingModal />);
            }}
            okText={"Explore Plans"}
            width={420}
        >
            <div className="flex flex-col gap-4 items-start">
                <div className="flex items-center justify-between w-full bg-primary/10 border-2 border-primary p-2 py-3 rounded-lg">
                    <p className="text-xs text-muted">Current plan</p>
                    <p className="font-semibold text-lg text-secondary leading-none!">
                        {currentPlan} Plan
                    </p>
                </div>

                <p className="text-xs leading-relaxed text-muted">
                    {missingFeature}
                </p>
            </div>
        </CustomModal>
    );
}
