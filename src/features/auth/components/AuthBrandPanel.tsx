import { ShieldCheck, Sparkles, Zap } from 'lucide-react';

const highlights = [
  {
    icon: Zap,
    iconClassName: 'text-amber-400',
    title: 'AI-Powered Agendas',
    description: 'Generate professional meeting layouts in seconds.',
  },
  {
    icon: ShieldCheck,
    iconClassName: 'text-emerald-400',
    title: 'Secure Collaboration',
    description: 'End-to-end encrypted sharing and real-time updates.',
  },
];

export function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex w-1/2 bg-linear-to-br from-secondary to-slate-800 p-12 pb-5 flex-col justify-between text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 h-96 w-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-primary/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="relative z-10 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <span className="text-lg font-bold tracking-tight">AgendaPro</span>
      </div>

      <div className="relative z-10 space-y-8">
        <h1 className="text-4xl font-bold leading-tight">
          Plan less, <br />achieve more.
        </h1>
        <div className="space-y-6">
          {highlights.map(({ icon: Icon, iconClassName, title, description }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="h-6 w-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Icon className={`h-3.5 w-3.5 ${iconClassName}`} />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-white/60">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-5 border-t border-white/10">
        <p className="text-xs text-white/40 font-medium">© 2026 AgendaPro AI. All rights reserved.</p>
      </div>
    </div>
  );
}
