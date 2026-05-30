import { baseApi } from '../api/baseApi';
import type { PlanName } from '../../config/plans';

export interface BillingUsage {
  plan: PlanName;
  role: 'admin' | 'member';
  aiGenerationsUsed: number;
  aiGenerationsLimit: number | null;
  teamMembersUsed: number;
  teamMembersLimit: number;
  subscriptionStatus?: string;
  renewsAt?: string | null;
  cancelAtPeriodEnd?: boolean;
  pendingPlanType?: PlanName | null;
  pendingChangeEffectiveAt?: string | null;
}

export interface BillingUsageStats {
  period: {
    month: string;
    from: string;
    to: string;
  };
  plan: {
    type: PlanName;
    role: 'admin' | 'member';
    status: string;
    subscriptionStatus?: string;
    renewsAt?: string | null;
    cancelAtPeriodEnd?: boolean;
    pendingPlanType?: PlanName | null;
    pendingChangeEffectiveAt?: string | null;
  };
  aiGenerations: {
    used: number;
    limit: number | null;
  };
  teamMembers: {
    used: number;
    limit: number;
  };
  meetings: {
    total: number;
    thisMonth: number;
    scheduled: number;
    completed: number;
    active: number;
    archived: number;
  };
  usageByFeature: Array<{
    feature: string;
    count: number;
  }>;
  recentUsage: Array<{
    id: string;
    feature: string;
    metadata?: unknown;
    createdAt: string;
  }>;
}

type PaidPlanName = Exclude<PlanName, 'Free'>;

interface BillingActionResponse {
  status: 'checkout' | 'unchanged' | 'upgraded' | 'downgrade_scheduled' | 'cancellation_scheduled' | 'renewal_resumed';
  url?: string | null;
  planType?: PlanName;
  effectiveAt?: string | null;
  renewsAt?: string | null;
}

export const billingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBillingPlan: builder.query<any, void>({
      query: () => '/billing/plan',
      providesTags: ['Billing'],
    }),
    getBillingUsage: builder.query<BillingUsage, void>({
      query: () => '/billing/usage',
      providesTags: ['Billing'],
    }),
    getBillingUsageStats: builder.query<BillingUsageStats, void>({
      query: () => '/billing/usage-stats',
      providesTags: ['Billing'],
    }),
    createCheckoutSession: builder.mutation<BillingActionResponse, { planType: PaidPlanName }>({
      query: body => ({ url: '/billing/checkout', method: 'POST', body }),
      invalidatesTags: ['Billing', 'User'],
    }),
    changePlan: builder.mutation<BillingActionResponse, { planType: PaidPlanName }>({
      query: body => ({ url: '/billing/change-plan', method: 'POST', body }),
      invalidatesTags: ['Billing', 'User'],
    }),
    cancelSubscription: builder.mutation<BillingActionResponse, void>({
      query: () => ({ url: '/billing/cancel', method: 'POST' }),
      invalidatesTags: ['Billing', 'User'],
    }),
    resumeSubscription: builder.mutation<BillingActionResponse, void>({
      query: () => ({ url: '/billing/resume', method: 'POST' }),
      invalidatesTags: ['Billing', 'User'],
    }),
    createPortalSession: builder.mutation<{ url: string }, void>({
      query: () => ({ url: '/billing/portal', method: 'POST' }),
    }),
  }),
});

export const {
  useGetBillingPlanQuery,
  useGetBillingUsageQuery,
  useGetBillingUsageStatsQuery,
  useCreateCheckoutSessionMutation,
  useChangePlanMutation,
  useCancelSubscriptionMutation,
  useResumeSubscriptionMutation,
  useCreatePortalSessionMutation,
} = billingApi;
