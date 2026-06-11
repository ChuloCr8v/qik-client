import {
  Mail,
  Plus,
} from 'lucide-react';
import { Button, Empty } from 'antd';
import SectionHeading from "../SectionHeading"

interface InviteesPanelProps {
  invitees: string[];
  onInvite: () => void;
  mailAvailable?: boolean;
}

export default function InviteesPanel({
  invitees, onInvite, mailAvailable = true
}: InviteesPanelProps) {
  return (
    <div className=" rounded-xl border border-border bg-white overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-2 py-1 bg-gray-50">
        <h3 className="text-base font-semibold text-secondary">
          Invitees
        </h3>
        <Button
          type="text"
          size="small"
          icon={<Plus className="h-3 w-3" />}
          disabled={!mailAvailable}
          onClick={onInvite}
          title={mailAvailable ? "Add invitee" : "Email is not configured"}
          className="text-primary!"
        >
          Add
        </Button>
      </div>

      {invitees.length > 0 ? (
        <div className="custom-scrollbar space-y-1.5 overflow-y-auto p-2">
          {invitees.map(email => (
            <div key={email} className="flex items-center gap-2 border border-border rounded-xl bg-slate-50 p-1.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-xs">
                <Mail className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-secondary">
                  {email}
                </p>
                <p className="text-xs text-muted">
                  Invited
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No invitees yet"
          className="py-2"
        />
      )}
    </div>
  );
}
