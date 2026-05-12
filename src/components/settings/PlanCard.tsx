import { CheckCircle2, Star, Zap } from 'lucide-react';
import { User } from '../../types';
import { PLAN_LIMITS, PlanName } from '../../lib/quota';
import { cn } from '../../lib/utils';

interface PlanCardProps {
  profile: User | null;
  onOpenPricing: () => void;
}

export default function PlanCard({ profile, onOpenPricing }: PlanCardProps) {
  const planName = (profile?.plan || 'Free') as PlanName;
  const limits = PLAN_LIMITS[planName];

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm">
      <div className="absolute right-0 top-0 rounded-bl-[100px] bg-primary p-4 opacity-5 transition-all group-hover:opacity-10">
        <Zap className="h-24 w-24 text-white" />
      </div>

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Subscription</p>
            <h4 className="flex items-center gap-2 text-xl font-bold text-secondary">
              {planName} Plan
              {planName === 'Pro' && <Star className="h-4 w-4 fill-amber-500 text-amber-500" />}
            </h4>
          </div>
          <div className={cn(
            'rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider',
            profile?.subscriptionStatus === 'active'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
              : 'border-amber-100 bg-amber-50 text-amber-600'
          )}>
            {profile?.subscriptionStatus || 'Trial'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">Plan Benefits</p>
            <div className="space-y-2">
              {limits.features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] font-medium text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button onClick={onOpenPricing} className="w-full rounded-xl bg-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
              {planName === 'Free' ? 'Upgrade to Pro' : 'Manage Subscription'}
            </button>
            <p className="text-center text-[9px] text-muted">
              Next billing date: <span className="font-bold text-secondary">{profile?.subscriptionDate ? new Date(profile.subscriptionDate.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
