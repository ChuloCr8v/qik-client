import { Loader2 } from 'lucide-react';

interface GoogleSignInButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function GoogleSignInButton({ isLoading, onClick }: GoogleSignInButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="group h-10! flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white px-6 py-3 text-sm font-bold text-secondary transition-all hover:bg-slate-50 active:scale-[0.98] shadow-xs"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
      ) : (
        <img src="/google.webp" alt="Google" className="h-4 w-4" />
      )}
      Continue with Google
    </button>
  );
}
