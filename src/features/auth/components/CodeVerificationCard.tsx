import type { FormEvent } from 'react';
import { Loader2, Mail, ShieldCheck } from 'lucide-react';

interface CodeVerificationCardProps {
  email: string;
  code: string;
  devCode: string;
  isLoading: boolean;
  onCodeChange: (code: string) => void;
  onSubmit: (event: FormEvent) => void;
  onUseDifferentEmail: () => void;
}

export function CodeVerificationCard({
  email,
  code,
  devCode,
  isLoading,
  onCodeChange,
  onSubmit,
  onUseDifferentEmail,
}: CodeVerificationCardProps) {
  return (
    <div className="w-full max-w-sm text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-500">
        <Mail className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-secondary">Check your email</h2>
        <p className="text-muted leading-relaxed">
          Enter the 6-digit code sent to <span className="font-bold text-secondary">{email}</span>.
        </p>
      </div>
      {devCode && (
        <div className="rounded-2xl bg-slate-50 p-4 text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Local dev code</p>
          <p className="mt-1 font-mono text-2xl font-bold text-secondary">{devCode}</p>
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          required
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder="123456"
          value={code}
          onChange={(event) => onCodeChange(event.target.value)}
          className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-center font-mono text-lg font-bold tracking-[0.35em] text-secondary focus:border-primary focus:bg-white focus:outline-none transition-all"
        />
        <button
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          Verify Code
        </button>
      </form>
      <button
        onClick={onUseDifferentEmail}
        className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
      >
        Use a different email
      </button>
    </div>
  );
}
