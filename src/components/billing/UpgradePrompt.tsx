import { CreditCard, Lock } from 'lucide-react';
import Modal from '../Modal';
import PricingModal from '../PricingModal';
import type { PlanName } from '../../config/plans';
import { usePopup } from '../../context/PopupContext';

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
  missingFeature,
}: UpgradePromptProps) {
  const { openModal } = usePopup();

  return (
    
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        icon={<Lock className="h-5 w-5 text-primary" />}
        title="Upgrade required"
        footer={
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-semibold text-muted hover:bg-slate-100">
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                openModal(<PricingModal />);
              }}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              <CreditCard className="h-3.5 w-3.5" />
              View plans
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <p className="text-sm font-semibold text-secondary">
            Current plan: {currentPlan}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            {missingFeature}
          </p>
        </div>
      </Modal>
    
  );
}
