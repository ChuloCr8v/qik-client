export const PLAN_LIMITS = {
  Free: {
    aiGenerations: 3,
    memberAiGenerations: 3,
    teamMembers: 0,
    tasksEnabled: false,
    decisionsEnabled: false,
    dashboardEnabled: false,
    guestInvites: true,
    features: [
      '3 AI agenda generations/month',
      'Unlimited one-off meetings',
      'Guest invites only',
      'No team members',
    ],
  },
  Individual: {
    aiGenerations: 10,
    memberAiGenerations: 0,
    teamMembers: 0,
    tasksEnabled: false,
    decisionsEnabled: false,
    dashboardEnabled: false,
    guestInvites: true,
    price: 20,
    features: [
      '10 AI agenda generations/month',
      'Unlimited one-off meetings',
      'Guest invites only',
      'No team members',
    ],
  },
  Organisation: {
    aiGenerations: 10,
    memberAiGenerations: 5,
    teamMembers: 5,
    tasksEnabled: true,
    decisionsEnabled: true,
    dashboardEnabled: true,
    guestInvites: true,
    price: 69,
    features: [
      '10 AI generations/month for admin',
      '5 AI generations/month per team member',
      'Up to 5 permanent team members',
      'Tasks and decisions per agenda item',
      'Full team dashboard',
      'Meeting history',
    ],
  },
  OrganisationPlus: {
    aiGenerations: Infinity,
    memberAiGenerations: 10,
    teamMembers: 10,
    tasksEnabled: true,
    decisionsEnabled: true,
    dashboardEnabled: true,
    guestInvites: true,
    price: 99,
    features: [
      'Unlimited AI generations for admin',
      '10 AI generations/month per team member',
      'Up to 10 permanent team members',
      'Tasks and decisions per agenda item',
      'Full team dashboard',
      'Meeting history',
      'Priority support',
    ],
  },
} as const;

export type PlanName = keyof typeof PLAN_LIMITS;

export const getUsageStatus = (current: number, total: number) => {
  if (total === Infinity) return { percentage: 0, label: 'Unlimited' };
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  return { percentage, label: `${current} / ${total}` };
};
