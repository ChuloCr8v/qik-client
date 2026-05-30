import {
  Mail,
  Plus,
  UserRoundCheck
} from 'lucide-react';
import SectionHeading from "../SectionHeading"

interface InviteesPanelProps {
  invitees: string[];
  onInvite: () => void;
}

export default function InviteesPanel({
  invitees, onInvite
}: InviteesPanelProps) {
  return (
    <div className=" rounded-xl border border-border bg-white px-3 py-2">
      <SectionHeading title="Invitees" action={ <button
        onClick={onInvite}
        className="flex items-center gap-1 rounded-lg p-0! border-none text-sm font-bold text-primary hover:text-primary/20"
        >
        <Plus className="h-3 w-3" />
        Add
      </button>} />

      {invitees.length > 0 ? (
        <div className="custom-scrollbar max-h-[180px] space-y-1.5 overflow-y-auto pr-1 -mt-4">
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
      ): (
        <p className="py-2 text-center text-sm italic text-muted">
          No invitees yet.
        </p>
      )}
    </div>
  );
}
