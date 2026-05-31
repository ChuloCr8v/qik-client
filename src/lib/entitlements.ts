import { PLAN_LIMITS, type PlanName } from "../config/plans";
import type { BillingUsage } from "../features/billing/billingApi";

export function hasTeamEntitlement(
  usage?: Pick<BillingUsage, "teamMembersLimit"> | null,
  plan?: PlanName | null,
) {
  const limit =
    usage?.teamMembersLimit ??
    (plan ? PLAN_LIMITS[plan]?.teamMembers : 0) ??
    0;

  return limit > 0;
}

export function canManageTeam(usage?: BillingUsage | null) {
  return hasTeamEntitlement(usage, usage?.plan) && usage?.role === "admin";
}
