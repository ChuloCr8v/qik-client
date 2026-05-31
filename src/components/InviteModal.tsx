import React, {
  useState
} from 'react';
import { Alert, Button, Input, Tag } from 'antd';
import CustomModal from './CustomModal';
import {
  Mail,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingTitle: string;
  invitees: string[];
  onAddInvitee: (email: string) => Promise<void>;
  mailAvailable?: boolean;
}

export default function InviteModal({
  isOpen, onClose, meetingTitle, invitees, onAddInvitee, mailAvailable = true
}: InviteModalProps) {
  const [email,
    setEmail] = useState('');
  const [isSending,
    setIsSending] = useState(false);
  const [success,
    setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailAvailable) {
      toast.error('Email delivery is not configured yet.');
      return;
    }
    if (!email) return;

    setIsSending(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await onAddInvitee(normalizedEmail);
      setSuccess(true);
      toast.success('Invitation sent.');
      setEmail('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Unable to send invitation.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Mail className="h-5 w-5 text-primary" />}
      title="Invite Guest"
      modalSubtitle={`Send an invite for ${meetingTitle}`}
      hideFooter
    >
      <div className="space-y-6">
        {invitees.length > 0 && (
          <div className="rounded-2xl border border-border bg-slate-50 p-3">
            <p className="mb-2 text-sm font-semibold uppercase  text-muted">
              Current invitees
            </p>
            <div className="flex flex-wrap gap-1.5">
              {invitees.map(invitee => (
                <Tag key={invitee}>{invitee}</Tag>
              ))}
            </div>
          </div>
        )}

        <form id="invite-form" onSubmit={handleSubmit} className="space-y-4">
          {!mailAvailable && (
            <Alert
              type="warning"
              showIcon
              message="Email is unavailable"
              description="Invites cannot be sent until email delivery is configured."
            />
          )}
          <div className="space-y-1.5">
            <label>Email Address</label>
            <Input
              required
              type="email"
              placeholder="teammate@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10! rounded-xl!"
            />
          </div>
          <div className="flex flex-row justify-end gap-3 border-t border-slate-100 pt-4">
            <Button type="button" onClick={onClose}>Cancel</Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!mailAvailable || isSending || success}
              loading={isSending}
              icon={!isSending && !success ? <Send className="h-3.5 w-3.5" /> : undefined}
            >
              {success ? 'Sent Successfully!' : 'Send Invitation'}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 italic">
          <p className="text-sm text-center text-muted">
            They'll receive a secure link to join as a participant.
          </p>
        </div>
      </div>
    </CustomModal>
  );
}
