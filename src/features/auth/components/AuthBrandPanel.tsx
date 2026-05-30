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
    <div className="hidden lg:flex w-1/2 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_86%_12%,rgba(217,119,6,0.26),transparent_28%),linear-gradient(135deg,#0f172a_0%,#111827_48%,#064e3b_100%)] p-12 pb-5 flex-col justify-between text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px] opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.14),transparent_35%,rgba(255,255,255,0.06)_70%,transparent)]" />
      <div className="absolute top-0 right-0 h-96 w-96 bg-primary/20 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 h-96 w-96 bg-accent/14 blur-[120px] rounded-full -ml-48 -mb-48" />
      <div className="absolute bottom-24 right-16 h-28 w-28 rounded-full border border-white/10" />

      <div className="relative z-10 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <span className="text-lg font-bold tracking-tight">AgendaPro</span>
      </div>

      <div className="relative z-10 space-y-8 -mt-24">
        <h1 className="text-4xl font-bold leading-tight">
          Plan less, <br />achieve more.
        </h1>
        <div className="space-y-6">
          {highlights.map(({ icon: Icon, iconClassName, title, description }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Icon className={`h-3.5 w-3.5 ${iconClassName}`} />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-white/60">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-5 border-t border-white/10">
        <p className="text-white/40 font-medium">© 2026 AgendaPro. All rights reserved.</p>
      </div>
    </div>
  );
}
