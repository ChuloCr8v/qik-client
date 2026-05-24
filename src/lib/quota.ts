export const PLAN_LIMITS = {
  Free: {
    meetings: Infinity,
    agendaItemsPerMeeting: 10,
    aiGenerations: 3,
    teamMembers: 0,
    tasksAndDecisions: false,
    dashboard: false,
    guestInvites: true,
    features: [
      '3 AI agenda generations/month',
      'Unlimited one-off meetings',
      'Guest invites (not permanent team)',
      'Basic agenda view'
    ]
  },
  Organisation: {
    meetings: Infinity,
    agendaItemsPerMeeting: Infinity,
    aiGenerations: Infinity,        // admin only
    memberAiGenerations: 10,        // per team member
    teamMembers: 15,
    tasksAndDecisions: true,
    dashboard: true,
    guestInvites: true,
    features: [
      'Unlimited AI generations for admin',
      '10 AI generations/month per member',
      'Up to 15 team members',
      'Tasks & decisions per agenda',
      'Full team dashboard',
      'Meeting history & analytics',
      'Export everything'
    ]
  },
  OrganisationPlus: {
    meetings: Infinity,
    agendaItemsPerMeeting: Infinity,
    aiGenerations: Infinity,
    memberAiGenerations: 15,
    teamMembers: 50,
    tasksAndDecisions: true,
    dashboard: true,
    guestInvites: true,
    features: [
      'Everything in Organisation',
      'Up to 50 team members',
      '15 AI generations/month per member',
      'Priority support'
    ]
  }
};

export type PlanName = keyof typeof PLAN_LIMITS;

export const getUsageStatus = (current: number, total: number) => {
  if (total === Infinity) return { percentage: 0, label: 'Unlimited' };
  const percentage = Math.min(Math.round((current / total) * 100), 100);
  return { percentage, label: `${current} / ${total}` };
};