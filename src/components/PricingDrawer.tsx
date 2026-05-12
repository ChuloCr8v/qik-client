import React, { useState } from 'react';
import Drawer from './Drawer';
import { Check, Zap, Shield, Star, Crown, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUpdateCurrentUserMutation } from '../features/users/usersApi';

interface PricingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals and small teams starting out',
    features: [
      '25 meetings/month',
      'Up to 2 team members',
      'Standard agenda templates',
      'Basic agenda sharing',
      'Community support'
    ],
    icon: Star,
    color: 'text-slate-400',
    bgColor: 'bg-slate-50',
    buttonText: 'Current Plan',
    disabled: true
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    description: 'For teams that want to move faster',
    features: [
      'Unlimited meetings & team members (up to 10)',
      'Unlimited AI agenda generations',
      'Custom templates + library',
      'PDF & Email exports',
      'Priority email support (24h)',
      'WebSocket live editing & presence'
    ],
    icon: Zap,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    buttonText: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Contact Sales',
    description: 'Advanced security and collaboration for large organizations',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'SSO & SAML Login',
      'Advanced team analytics & audit logs',
      'Dedicated account manager',
      '99.9% SLU uptime guarantee'
    ],
    icon: Crown,
    color: 'text-primary',
    bgColor: 'bg-primary/5',
    buttonText: 'Contact Sales'
  }
];

export default function PricingDrawer({ isOpen, onClose }: PricingDrawerProps) {
  const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);
  const [updateUser] = useUpdateCurrentUserMutation();

  const handleUpgrade = async (planName: string) => {
    if (planName === 'Enterprise') {
      window.location.href = 'mailto:sales@qikagenda.com';
      return;
    }

    setUpgradingPlan(planName);
    try {
      // Simulate Payment Processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await updateUser({ plan: planName as any, subscriptionStatus: 'active', subscriptionDate: new Date().toISOString() as any }).unwrap();
      toast.success(`Successfully upgraded to ${planName}!`);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to process upgrade.');
    } finally {
      setUpgradingPlan(null);
    }
  };

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Choose Your Plan"
      icon={<Shield className="h-5 w-5 text-emerald-500" />}
      footer={
        <div className="flex flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold text-muted hover:bg-slate-100 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-secondary hover:bg-slate-800 rounded-xl transition-all shadow-sm shadow-slate-200"
          >
            View Billing
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-sm font-bold text-secondary">Simple, Transparent Pricing</h2>
          <p className="text-[11px] text-muted leading-relaxed">
            Unlock advanced features and take your productivity to the next level.
          </p>
        </div>

        <div className="space-y-4">
          {PLANS.map((plan) => (
            <div 
              key={plan.name}
              className={`relative rounded-3xl border p-5 transition-all hover:shadow-md ${
                plan.popular ? 'border-amber-200 bg-amber-50/20 ring-1 ring-amber-100' : 'border-border bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-500 px-3 py-1 text-[9px] font-bold text-white uppercase tracking-widest shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${plan.bgColor}`}>
                  <plan.icon className={`h-5 w-5 ${plan.color}`} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-secondary">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-secondary">{plan.price}</span>
                    <span className="text-[10px] text-muted">{plan.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-muted mb-6 leading-relaxed">
                {plan.description}
              </p>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full bg-emerald-50 p-0.5">
                      <Check className="h-2.5 w-2.5 text-emerald-600" />
                    </div>
                    <span className="text-[11px] text-secondary font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                disabled={plan.disabled || (upgradingPlan !== null)}
                onClick={() => handleUpgrade(plan.name)}
                className={`w-full rounded-2xl py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 ${
                  plan.disabled 
                    ? 'bg-slate-100 text-muted cursor-not-allowed' 
                    : plan.popular
                      ? 'bg-amber-500 text-white shadow-amber-200 hover:bg-amber-600'
                      : 'bg-secondary text-white hover:bg-slate-800 shadow-slate-200'
                }`}
              >
                {upgradingPlan === plan.name ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : null}
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
