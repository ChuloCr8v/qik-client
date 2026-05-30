import { Zap } from 'lucide-react';
import { useGetBillingUsageQuery } from '../../features/billing/billingApi';
import { cn } from '../../lib/utils';

export default function UsageBadge() {
  const { data } = useGetBillingUsageQuery();

  if (!data || data.aiGenerationsLimit === null) {
    return null;
  }

  const ratio = data.aiGenerationsLimit > 0
    ? data.aiGenerationsUsed / data.aiGenerationsLimit
    : 1;

  return (
    <div className={cn(
      'inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold uppercase ',
      ratio >= 1
        ? 'border-rose-200 bg-rose-50 text-rose-600'
        : ratio > 0.8
          ? 'border-amber-200 bg-amber-50 text-amber-600'
          : 'border-slate-200 bg-white text-muted',
    )}>
      <Zap className="h-3.5 w-3.5" />
      {data.aiGenerationsUsed} / {data.aiGenerationsLimit} AI generations used this month
    </div>
  );
}
