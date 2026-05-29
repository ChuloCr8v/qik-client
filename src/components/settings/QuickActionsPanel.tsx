import { ChevronRight, Shield, TrendingUp } from 'lucide-react';
import { ReactNode } from 'react';

export default function QuickActionsPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <QuickAction icon={<TrendingUp className="h-5 w-5" />} title="View Usage Stats" subtitle="Analytics" variant="amber" />
      <QuickAction icon={<Shield className="h-5 w-5" />} title="Security Log" subtitle="Privacy" />
    </div>
  );
}

function QuickAction({ icon, title, subtitle, variant }: { icon: ReactNode; title: string; subtitle: string; variant?: 'amber' }) {
  return (
    <button className="group flex items-center gap-4 rounded-3xl border border-border bg-white p-5   transition-all hover:border-primary hover:shadow-md">
      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all group-hover:bg-primary group-hover:text-white ${variant === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-secondary'}`}>
        {icon}
      </div>
      <div className="text-left">
        <h4 className="text-[11px] font-bold text-secondary">{title}</h4>
        <p className="text-[9px] font-bold uppercase tracking-widest text-muted">{subtitle}</p>
      </div>
      <ChevronRight className="ml-auto h-4 w-4 text-muted transition-all group-hover:text-primary" />
    </button>
  );
}
