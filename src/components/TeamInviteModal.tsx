import React, { useState } from 'react';
import { Alert, Button, Input, Select } from 'antd';
import CustomModal from './CustomModal';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import UpgradePrompt from './billing/UpgradePrompt';
import { useGetBillingUsageQuery } from '../features/billing/billingApi';
import { useInviteTeamMemberMutation } from '../features/team/teamApi';
import { isIntegrationConfigured, useGetHealthQuery } from '../features/system/systemApi';
import { canManageTeam } from '../lib/entitlements';

interface TeamInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamInviteModal({ isOpen, onClose }: TeamInviteModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Member');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const { data: usage } = useGetBillingUsageQuery();
  const { data: health } = useGetHealthQuery();
  const [inviteTeamMember] = useInviteTeamMemberMutation();
  const mailAvailable = isIntegrationConfigured(health, 'mail');
  const teamManageAvailable = canManageTeam(usage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamManageAvailable) {
      toast.error('Permanent team members require an Organisation plan managed by the billing admin.');
      return;
    }
    if (!mailAvailable) {
      toast.error('Email delivery is not configured yet.');
      return;
    }
    if (!email) return;

    setIsSending(true);
    try {
      await inviteTeamMember({ email, role }).unwrap();
      const subject = encodeURIComponent('Join QikAgenda');
      const body = encodeURIComponent(`You've been invited as ${role} on QikAgenda.`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      setSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      const message = (error as any)?.data?.message || 'Unable to send invitation.';
      if ((error as any)?.status === 403) {
        setShowUpgradePrompt(true);
      } else {
        toast.error(message);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        icon={<Mail className="h-5 w-5 text-primary" />}
        title="Invite Team Member"
        modalSubtitle="Add someone to your workspace"
        hideFooter
      >
        <div className="space-y-6">
          <form id="team-invite-form" onSubmit={handleSubmit} className="space-y-4">
            {!mailAvailable && (
              <Alert
                type="warning"
                showIcon
                message="Email is unavailable"
                description="Team invitations cannot be sent until email delivery is configured."
              />
            )}
            {!teamManageAvailable && (
              <Alert
                type="warning"
                showIcon
                message="Team invites are unavailable"
                description="Permanent team members require an Organisation plan and can only be invited by the billing admin."
              />
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold uppercase  text-muted">Email Address</label>
              <Input
                required
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10! rounded-xl!"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold uppercase  text-muted">Role</label>
              <Select
                value={role}
                onChange={setRole}
                className="h-10! w-full"
                options={[
                  { value: 'Member', label: 'Member' },
                  { value: 'Admin', label: 'Admin' },
                ]}
              />
            </div>

          <div className="pt-4 border-t border-slate-100 italic">
            <p className="text-sm text-center text-muted">
              The recipient will receive an email with instructions to join.
            </p>
          </div>
          <div className="flex flex-row justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!mailAvailable || !teamManageAvailable || isSending || success}
              loading={isSending}
              icon={!isSending && !success ? <Send className="h-3.5 w-3.5" /> : undefined}
            >
              {success ? 'Sent Successfully!' : 'Send Invitation'}
            </Button>
          </div>
          </form>
        </div>
      </CustomModal>
      <UpgradePrompt
        isOpen={showUpgradePrompt}
        onClose={() => setShowUpgradePrompt(false)}
        currentPlan={usage?.plan || 'Free'}
        missingFeature="Free users can invite guests to individual meetings, but permanent team members require an Organisation plan."
      />
    </>
  );
}
