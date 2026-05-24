import React, { useState } from 'react';
import Modal from './Modal';
import { Mail, Loader2, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import UpgradePrompt from './billing/UpgradePrompt';
import { useGetBillingUsageQuery } from '../features/billing/billingApi';
import { useInviteTeamMemberMutation } from '../features/team/teamApi';

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
  const [inviteTeamMember] = useInviteTeamMemberMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      icon={<Mail className="h-5 w-5 text-primary" />}
      title={
        <div className="space-y-0.5 text-left">
          <h3 className="text-[14px] font-bold text-secondary">Invite Team Member</h3>
          <p className="text-[10px] font-medium text-muted leading-tight">
            Add someone to your workspace
          </p>
        </div>
      }
      footer={
        <div className="flex flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            form="team-invite-form"
            type="submit"
            disabled={isSending || success}
            className={`flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all active:scale-[0.98] ${success ? 'bg-emerald-500 shadow-emerald-200' : 'bg-primary shadow-primary/20 hover:bg-primary/90'}`}
          >
            {isSending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : success ? (
              'Sent Successfully!'
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Send Invitation</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <form id="team-invite-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-muted">Email Address</label>
            <input 
              required
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-xs font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-muted">Role</label>
            <select 
              className="w-full h-[38px] rounded-xl border border-border bg-slate-50/50 px-4 text-xs font-semibold focus:border-primary focus:bg-white focus:outline-none transition-all shadow-sm appearance-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 italic">
          <p className="text-[10px] text-center text-muted">
            The recipient will receive an email with instructions to join.
          </p>
        </div>
      </div>
    </Modal>
    <UpgradePrompt
      isOpen={showUpgradePrompt}
      onClose={() => setShowUpgradePrompt(false)}
      currentPlan={usage?.plan || 'Free'}
      missingFeature="Free users can invite guests to individual meetings, but permanent team members require an Organisation plan."
    />
    </>
  );
}
