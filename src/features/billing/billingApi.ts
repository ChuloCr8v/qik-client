import { baseApi } from '../api/baseApi';
import type { PlanName } from '../../config/plans';

export interface BillingUsage {
  plan: PlanName;
  role: 'admin' | 'member';
  aiGenerationsUsed: number;
  aiGenerationsLimit: number | null;
  teamMembersUsed: number;
  teamMembersLimit: number;
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
    upgradePlan: builder.mutation<any, { planType: PlanName }>({
      query: body => ({ url: '/billing/upgrade', method: 'POST', body }),
      invalidatesTags: ['Billing', 'User'],
    }),
  }),
});

export const {
  useGetBillingPlanQuery,
  useGetBillingUsageQuery,
  useUpgradePlanMutation,
} = billingApi;
