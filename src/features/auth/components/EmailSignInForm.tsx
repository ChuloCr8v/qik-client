import type { FormEvent } from 'react';
import { Loader2, LogIn, Mail } from 'lucide-react';

interface EmailSignInFormProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export function EmailSignInForm({
  email,
  isLoading,
  onEmailChange,
  onSubmit,
}: EmailSignInFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label>Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
            required
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className="w-full rounded-xl border border-border bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-semibold text-secondary focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        Send Sign-In Code
      </button>
    </form>
  );
}
