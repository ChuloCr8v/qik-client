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

  const handleSubmit = async () => {
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
      onOk={handleSubmit}
      okText={success ? 'Invites Sent!' : 'Send Invitation'}
    >
      <div className="space-y-6">
        {invitees.length > 0 && (
          <div className="rounded-xl border border-border bg-slate-50 py-2 px-3">
            <p className="pb-2! text-xs font-semibold  text-muted">
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
            />
          </div>
        </form>

        <div className="border border-slate-200 bg-slate-50 px-3 py-4 rounded-xl italic">
          <p className="text-sm text-center text-muted">
            They'll receive a secure link to join as a participant.
          </p>
        </div>
      </div>
    </CustomModal>
  );
}
