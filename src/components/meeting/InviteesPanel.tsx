import { Mail, Plus, UserRoundCheck } from 'lucide-react';

interface InviteesPanelProps {
  invitees: string[];
  onInvite: () => void;
}

export default function InviteesPanel({ invitees, onInvite }: InviteesPanelProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRoundCheck className="h-3.5 w-3.5 text-secondary" />
          <h3 className="text-left text-[10px] font-semibold uppercase tracking-widest text-secondary">Invitees</h3>
        </div>
        <button
          onClick={onInvite}
          className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-[9px] font-bold text-primary hover:bg-primary/15"
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      </div>

      {invitees.length > 0 ? (
        <div className="custom-scrollbar max-h-[180px] space-y-1.5 overflow-y-auto pr-1">
          {invitees.map(email => (
            <div key={email} className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-xs">
                <Mail className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold text-secondary">{email}</p>
                <p className="text-[8px] text-muted">Invited</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-2 text-center text-[10px] italic text-muted">No invitees yet.</p>
      )}
    </div>
  );
}
