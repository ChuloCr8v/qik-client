import React, {
  useState
} from 'react';
import Modal from './Modal';
import {
  Mail,
  Loader2,
  Send
} from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingTitle: string;
  invitees: string[];
  onAddInvitee: (email: string) => Promise < void >;
}

export default function InviteModal({
  isOpen, onClose, meetingTitle, invitees, onAddInvitee
}: InviteModalProps) {
  const [email,
    setEmail] = useState('');
  const [isSending,
    setIsSending] = useState(false);
  const [success,
    setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await onAddInvitee(normalizedEmail);
      setSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Mail className="h-5 w-5 text-primary" />}
      title={
      <div className="space-y-0.5 text-left">
        <h3 className="text-[14px] font-bold text-secondary">Invite Guest</h3>
        <p className="text-[10px] font-medium text-muted leading-tight">
          Send an invite for <span className="font-semibold text-secondary">{meetingTitle}</span>
        </p>
      </div>
      }
      footer={
      <div className="flex flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
          >
          Cancel
        </button>
        <button
          form="invite-form"
          type="submit"
          disabled={isSending || success}
          className={`flex items-center justify-center gap-2 text-xs font-semibold text-white   transition-all active:scale-[0.98] ${success ? 'bg-emerald-500 shadow-emerald-200': 'bg-primary shadow-primary/20 hover:bg-primary/90'}`}
          >
          {isSending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ): success ? (
            'Sent Successfully!'
          ): (
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
        {invitees.length > 0 && (
          <div className="rounded-2xl border border-border bg-slate-50 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted">
              Current invitees
            </p>
            <div className="flex flex-wrap gap-1.5">
              {invitees.map(invitee => (
                <span key={invitee} className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-secondary shadow-xs">
                  {invitee}
                </span>
              ))}
            </div>
          </div>
        )}

        <form id="invite-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label>Email Address</label>
            <input
            required
            type="email"
            placeholder="teammate@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
        </div>
      </form>

      <div className="pt-4 border-t border-slate-100 italic">
        <p className="text-[10px] text-center text-muted">
          They'll receive a secure link to join as a participant.
        </p>
      </div>
    </div>
  </Modal>
);
}