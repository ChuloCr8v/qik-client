import { CheckCircle2, Star, Zap } from 'lucide-react';
import { PLAN_LIMITS, type PlanName } from '../../config/plans';
import { cn } from '../../lib/utils';
import { Button } from 'antd';
import { useAuth } from '../../features/auth/AuthProvider';
import { useGetCurrentUserQuery } from '../../features/users/usersApi';
import { usePopup } from '../../context/PopupContext';
import PricingModal from '../PricingModal';

export default function PlanCard() {
  const { user } = useAuth();
  const { openModal } = usePopup();
  const { data: profile } = useGetCurrentUserQuery(undefined, {
    skip: !user
  });
  const planName = (profile?.plan || 'Free') as PlanName;
  const limits = PLAN_LIMITS[planName];
console.log(profile)
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6  ">
      <div className="absolute right-0 top-0 rounded-bl-[100px] bg-primary p-4 opacity-5 transition-all group-hover:opacity-10">
        <Zap className="h-24 w-24 text-white" />
      </div>

      <div className="relative">
        <div className="mb-8 mt-4 flex items-center justify-between">
          <div className="space-y-1 border-b border-border w-[65%] pb-1">
            <p className="text-xs uppercase  text-muted">Subscription</p>
            <h4 className="flex items-center gap-2 text-2xl font-black text-secondary">
              {planName} Plan
              {planName !== 'Free' && <Star className="h-4 w-4 fill-amber-500 text-amber-500" />}
            </h4>
          </div>
          <div className={cn(
            'rounded-full border px-2.5 py-1 text-xs font-bold uppercase ',
            profile?.subscriptionStatus === 'active'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-600'
              : 'border-amber-100 bg-amber-50 text-amber-600'
          )}>
            {profile?.subscriptionStatus || 'Trial'}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            {/* <p className="text-xs font-bold uppercase  text-secondary">Plan Benefits</p> */}
            <div className="space-y-2">
              {limits?.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full mb-2!"
              onClick={() => openModal(<PricingModal />)}
              type='primary'>
              {planName === 'Free' ? 'Upgrade' : 'Manage Subscription'}
            </Button>
            <p className="text-center text-xs text-muted mt-2!">
              Next billing date: <span className="font-bold text-secondary">{profile?.subscriptionDate ? new Date(profile.subscriptionDate.seconds * 1000).toLocaleDateString() : 'N/A'}</span>
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}
